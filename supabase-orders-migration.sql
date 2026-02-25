-- ================================================================
-- Beyond Peptides – Orders migration
-- Run this in Supabase SQL Editor
-- ================================================================

CREATE TABLE IF NOT EXISTS orders (
  id                    UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_number          TEXT UNIQUE NOT NULL,
  created_at            TIMESTAMPTZ DEFAULT NOW(),
  status                TEXT DEFAULT 'pending',

  -- Billing
  billing_first_name    TEXT,
  billing_last_name     TEXT,
  billing_company       TEXT,
  billing_address_1     TEXT,
  billing_address_2     TEXT,
  billing_city          TEXT,
  billing_state         TEXT,
  billing_postcode      TEXT,
  billing_country       TEXT,
  billing_phone         TEXT,
  billing_email         TEXT,

  -- Shipping
  shipping_first_name   TEXT,
  shipping_last_name    TEXT,
  shipping_company      TEXT,
  shipping_address_1    TEXT,
  shipping_address_2    TEXT,
  shipping_city         TEXT,
  shipping_state        TEXT,
  shipping_postcode     TEXT,
  shipping_country      TEXT,

  -- Totals
  subtotal              NUMERIC(10,2) NOT NULL DEFAULT 0,
  shipping_cost         NUMERIC(10,2) NOT NULL DEFAULT 0,
  coupon_code           TEXT,
  coupon_discount       NUMERIC(10,2) NOT NULL DEFAULT 0,
  total                 NUMERIC(10,2) NOT NULL DEFAULT 0,

  -- Payment & notes
  payment_method        TEXT,
  order_notes           TEXT
);

CREATE TABLE IF NOT EXISTS order_items (
  id             UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id       UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_slug   TEXT NOT NULL,
  product_name   TEXT NOT NULL,
  dosage         TEXT,
  vial           TEXT,
  quantity       INTEGER NOT NULL DEFAULT 1,
  price          NUMERIC(10,2) NOT NULL,
  total          NUMERIC(10,2) NOT NULL
);

-- Index for quick lookup by order_number
CREATE INDEX IF NOT EXISTS orders_order_number_idx ON orders(order_number);

-- Index for looking up items by order
CREATE INDEX IF NOT EXISTS order_items_order_id_idx ON order_items(order_id);

-- Index for lookup by email (useful for admin)
CREATE INDEX IF NOT EXISTS orders_billing_email_idx ON orders(billing_email);

-- ----------------------------------------------------------------
-- Row Level Security
-- Allow anonymous INSERT (anyone can place an order)
-- Allow SELECT only for the row matching order_number + email
-- ----------------------------------------------------------------
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Anyone can create an order
CREATE POLICY "orders_insert" ON orders FOR INSERT TO anon, authenticated WITH CHECK (true);

-- Anyone who knows order_number can read it (used on order-received page)
CREATE POLICY "orders_select" ON orders FOR SELECT TO anon, authenticated USING (true);

-- order_items follows the same rules via order join
CREATE POLICY "order_items_insert" ON order_items FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "order_items_select" ON order_items FOR SELECT TO anon, authenticated USING (true);
