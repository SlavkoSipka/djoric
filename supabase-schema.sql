-- ============================================
-- Beyond Peptides - Supabase Schema
-- Run this in Supabase SQL Editor
-- ============================================

-- Products table
CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  dosage TEXT,
  price NUMERIC(10,2) NOT NULL,
  old_price NUMERIC(10,2),
  sale_badge TEXT,
  tag TEXT,
  tested BOOLEAN DEFAULT FALSE,
  image TEXT NOT NULL,
  category TEXT DEFAULT 'All Peptides',
  rating NUMERIC(2,1) DEFAULT 5.0,
  review_count INTEGER DEFAULT 0,
  price_per_unit TEXT,
  in_stock BOOLEAN DEFAULT TRUE,
  featured BOOLEAN DEFAULT FALSE,
  is_new BOOLEAN DEFAULT FALSE,
  is_bestseller BOOLEAN DEFAULT FALSE,
  show_in_shop BOOLEAN DEFAULT TRUE,
  sort_order INTEGER DEFAULT 0,
  variations JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Product details (accordion sections: Research Purpose, Ingredients, etc.)
CREATE TABLE product_details (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  icon_type TEXT NOT NULL DEFAULT 'research',
  content_html TEXT NOT NULL DEFAULT '',
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_details ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Products are publicly readable"
  ON products FOR SELECT
  USING (true);

CREATE POLICY "Product details are publicly readable"
  ON product_details FOR SELECT
  USING (true);

-- Indexes
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_is_new ON products(is_new);
CREATE INDEX idx_products_is_bestseller ON products(is_bestseller);
CREATE INDEX idx_products_featured ON products(featured);
CREATE INDEX idx_products_sort_order ON products(sort_order);
CREATE INDEX idx_product_details_product_id ON product_details(product_id);
CREATE INDEX idx_product_details_sort_order ON product_details(sort_order);

-- ============================================
-- INSERT ALL PRODUCTS
-- ============================================

INSERT INTO products (name, slug, dosage, price, old_price, sale_badge, tag, tested, image, category, rating, review_count, price_per_unit, in_stock, featured, is_new, is_bestseller, show_in_shop, sort_order, variations) VALUES

-- GLOW
('GLOW', 'glow', '70 mg', 141.55, NULL, NULL, NULL, FALSE,
 'https://beyond-peptides.com/wp-content/uploads/2026/01/BeyondPeptides-ProductVis-vA26-t-GLOW-70mg-FrontView-CPUPD2K-e1769169509242.png',
 'All Peptides', 5.0, 1, '2.46 €/1mg', FALSE, FALSE, FALSE, FALSE, TRUE, 1,
 '[{"dosage":"70 mg","vials":[{"label":"1 Vial","price":172.19,"discount":null,"in_stock":false},{"label":"4 Vial","price":654.31,"discount":"-5%","in_stock":false},{"label":"10 Vial","price":1549.69,"discount":"-10%","in_stock":false}]}]'::jsonb),

-- KPV
('KPV', 'kp', '10 mg', 50.55, 60.65, '17% OFF', 'New', FALSE,
 'https://beyond-peptides.com/wp-content/uploads/2026/01/BeyondPeptides-ProductVis-vA26-t-KPV-10mg-FrontView-CPUPD2K-e1769169688252.png',
 'All Peptides', 5.0, 0, '5.06 €/1mg', TRUE, FALSE, TRUE, FALSE, TRUE, 2,
 '[{"dosage":"10 mg","vials":[{"label":"1 Vial","price":50.55,"discount":null,"in_stock":true},{"label":"4 Vial","price":192.09,"discount":"-5%","in_stock":true},{"label":"10 Vial","price":454.95,"discount":"-10%","in_stock":true}]}]'::jsonb),

-- Tesamorelin
('Tesamorelin', 'tesa', '5 mg', 60.65, NULL, NULL, 'New', FALSE,
 'https://beyond-peptides.com/wp-content/uploads/2026/01/BeyondPeptides-ProductVis-vA26-t-Tesamorelin-5mg-FrontView-CPUPD2K-e1769169281545.png',
 'All Peptides', 5.0, 0, NULL, TRUE, FALSE, TRUE, FALSE, TRUE, 3,
 '[{"dosage":"5 mg","vials":[{"label":"1 Vial","price":60.65,"discount":null,"in_stock":true}]}]'::jsonb),

-- VIP
('VIP', 'vi', '10 mg', 85.93, NULL, NULL, NULL, FALSE,
 'https://beyond-peptides.com/wp-content/uploads/2026/01/BeyondPeptides-ProductVis-vA26-t-VIP-10ml-FrontView-CPUPD2K-e1769169867761.png',
 'All Peptides', 5.0, 0, NULL, TRUE, FALSE, FALSE, FALSE, TRUE, 4,
 '[{"dosage":"10 mg","vials":[{"label":"1 Vial","price":85.93,"discount":null,"in_stock":true}]}]'::jsonb),

-- NAD+
('NAD+', 'nad', '10 ml', 100.10, NULL, NULL, 'New', FALSE,
 'https://beyond-peptides.com/wp-content/uploads/2025/12/BeyondPeptides-ProductVis-vA26-t-Vial-10ml-NADplus-FrontView-CPUPD2K-e1769168305556.png',
 'All Peptides', 5.0, 0, NULL, TRUE, FALSE, TRUE, FALSE, TRUE, 5,
 '[{"dosage":"10 ml","vials":[{"label":"1 Vial","price":100.10,"discount":null,"in_stock":true}]}]'::jsonb),

-- KLOW
('KLOW', 'klo', '80 mg', 150.65, NULL, NULL, 'New', FALSE,
 'https://beyond-peptides.com/wp-content/uploads/2025/12/BeyondPeptides-ProductVis-vA26-t-KLOW-80ml-FrontView-CPUPD2K-e1769170070892.png',
 'All Peptides', 5.0, 0, NULL, TRUE, FALSE, TRUE, FALSE, TRUE, 6,
 '[{"dosage":"80 mg","vials":[{"label":"1 Vial","price":150.65,"discount":null,"in_stock":true}]}]'::jsonb),

-- BeyondC
('BeyondC', 'beyondc', '5 mg', 80.84, NULL, NULL, 'New', FALSE,
 'https://beyond-peptides.com/wp-content/uploads/2025/12/BeyondPeptides-ProductVis-vA26-t-BeyondC-5mg-FrontView-CPUPD2K-e1769620917968.png',
 'All Peptides', 5.0, 0, NULL, TRUE, FALSE, TRUE, FALSE, TRUE, 7,
 '[{"dosage":"5 mg","vials":[{"label":"1 Vial","price":80.84,"discount":null,"in_stock":true}]}]'::jsonb),

-- Beyond Skin
('Beyond Skin', 'beyond-skin', NULL, 111.22, NULL, NULL, 'New', FALSE,
 'https://beyond-peptides.com/wp-content/uploads/2025/12/combined_online-e1765802647173.webp',
 'Cosmetics and Topicals', 5.0, 0, NULL, TRUE, FALSE, TRUE, FALSE, TRUE, 8,
 '[]'::jsonb),

-- Beyond Hair
('Beyond Hair', 'beyond-hair', NULL, 70.77, NULL, NULL, 'New', FALSE,
 'https://beyond-peptides.com/wp-content/uploads/2025/12/BeyondPeptides-ProductVis-vA23-t-Beyond-Hair-Oil-30ml-FrontView-CPUPD2K-e1765460464189.webp',
 'Cosmetics and Topicals', 5.0, 0, NULL, TRUE, FALSE, TRUE, FALSE, TRUE, 9,
 '[]'::jsonb),

-- Thymosin Alpha 1
('Thymosin Alpha 1', 'thymosin', '5 mg', 45.49, NULL, NULL, 'New', FALSE,
 'https://beyond-peptides.com/wp-content/uploads/2025/11/BeyondPeptides-ProductVis-vA23-t-Thymosin_alpha_1-5mg-FrontView-CPUPD2K-e1769172851849.png',
 'All Peptides', 5.0, 0, NULL, TRUE, FALSE, TRUE, FALSE, TRUE, 10,
 '[{"dosage":"5 mg","vials":[{"label":"1 Vial","price":45.49,"discount":null,"in_stock":true}]}]'::jsonb),

-- AOD 9604
('AOD 9604', 'aod-9604', '5 mg', 50.55, NULL, NULL, 'New', FALSE,
 'https://beyond-peptides.com/wp-content/uploads/2025/11/BeyondPeptides-ProductVis-vA25-t-AOD-9604-5mg-FrontView-CPUPD2K-1-e1769173707446.png',
 'All Peptides', 5.0, 0, NULL, TRUE, FALSE, TRUE, FALSE, TRUE, 11,
 '[{"dosage":"5 mg","vials":[{"label":"1 Vial","price":50.55,"discount":null,"in_stock":true}]}]'::jsonb),

-- Bacteriostatic Water
('Bacteriostatic Water', 'bac', '10 ml', 9.09, NULL, NULL, NULL, FALSE,
 'https://beyond-peptides.com/wp-content/uploads/2025/11/BeyondPeptides-Under200-q80.webp',
 'All Peptides', 5.0, 0, NULL, TRUE, FALSE, FALSE, FALSE, TRUE, 12,
 '[]'::jsonb),

-- Beyond Gut Pro (Bestseller)
('Beyond Gut Pro', 'gut-pro', NULL, 135.00, 169.99, '21% OFF', 'New', FALSE,
 'https://beyond-peptides.com/wp-content/uploads/2025/09/BeyondPeptides-ProductVis-vA24-t-Beyond_Gut_Pro-FrontView-CPUPD2K-600x600.png',
 'All Peptides', 5.0, 0, NULL, TRUE, FALSE, TRUE, TRUE, TRUE, 13,
 '[]'::jsonb),

-- SLU-PP-332 (Bestseller)
('SLU-PP-332', 'slu-pp-332', NULL, 139.49, NULL, NULL, 'New', TRUE,
 'https://beyond-peptides.com/wp-content/uploads/2025/06/BeyondPeptides-ProductVis-vA20-t-SLU-PP-332-FrontView-CPUPD2K-e1767162317927-600x600.webp',
 'All Peptides', 5.0, 0, NULL, TRUE, FALSE, TRUE, TRUE, TRUE, 14,
 '[]'::jsonb),

-- 5-Amino-1MQ (Bestseller)
('5-Amino-1MQ', '5-a1mq', '50 mg per tablet', 134.99, NULL, NULL, 'New', FALSE,
 'https://beyond-peptides.com/wp-content/uploads/2025/06/5-Amino-1MQ-600x600.png',
 'Tablets', 5.0, 0, NULL, TRUE, FALSE, TRUE, TRUE, TRUE, 15,
 '[]'::jsonb),

-- BeyondG (Bestseller + Featured)
('BeyondG', 'beyondg', '20 mg', 129.99, NULL, NULL, 'New', FALSE,
 'https://beyond-peptides.com/wp-content/uploads/2026/02/BeyondG-10mg-FrontView-e1770136096260-600x658.png',
 'All Peptides', 5.0, 0, NULL, TRUE, TRUE, TRUE, TRUE, TRUE, 16,
 '[{"dosage":"10 mg","vials":[{"label":"1 Vial","price":129.99,"discount":null,"in_stock":true},{"label":"4 Vial","price":489.99,"discount":"-5%","in_stock":true},{"label":"10 Vial","price":1160.99,"discount":"-10%","in_stock":true}]},{"dosage":"20 mg","vials":[{"label":"1 Vial","price":199.99,"discount":null,"in_stock":true},{"label":"4 Vial","price":759.99,"discount":"-5%","in_stock":true},{"label":"10 Vial","price":1799.99,"discount":"-10%","in_stock":true}]}]'::jsonb),

-- BPC-157 (Bestseller)
('BPC-157', 'bpc-157', '10 mg', 64.99, NULL, NULL, NULL, TRUE,
 'https://beyond-peptides.com/wp-content/uploads/2024/10/BPC-157-600x600.png',
 'All Peptides', 5.0, 0, NULL, TRUE, FALSE, FALSE, TRUE, TRUE, 17,
 '[{"dosage":"10 mg","vials":[{"label":"1 Vial","price":64.99,"discount":null,"in_stock":true}]}]'::jsonb),

-- BPC-157 & TB-500 Mix (Bestseller)
('BPC-157 & TB-500 Mix', 'bpc-157-tb-500-mix', '5 mg', 74.99, NULL, NULL, NULL, TRUE,
 'https://beyond-peptides.com/wp-content/uploads/2024/10/BPC-157-TB-500-Mix-600x600.png',
 'All Peptides', 5.0, 0, NULL, TRUE, FALSE, FALSE, TRUE, TRUE, 18,
 '[{"dosage":"5 mg","vials":[{"label":"1 Vial","price":74.99,"discount":null,"in_stock":true}]}]'::jsonb),

-- MOTS-C
('MOTS-C', 'mots-c', '10 mg', 44.99, NULL, NULL, 'New', TRUE,
 'https://beyond-peptides.com/wp-content/uploads/2025/06/MOTS-C-600x600.png',
 'All Peptides', 5.0, 0, NULL, TRUE, FALSE, TRUE, FALSE, TRUE, 19,
 '[{"dosage":"10 mg","vials":[{"label":"1 Vial","price":44.99,"discount":null,"in_stock":true}]}]'::jsonb);

-- ============================================
-- INSERT PRODUCT DETAILS (accordion sections)
-- Only GLOW has details filled in as example
-- ============================================

INSERT INTO product_details (product_id, title, icon_type, content_html, sort_order)
SELECT p.id, d.title, d.icon_type, d.content_html, d.sort_order
FROM products p
CROSS JOIN (VALUES
  ('Research Purpose', 'research',
   '<div class="flex flex-col gap-4"><div class="flex gap-3"><div><h4>Tissue Repair Signaling Studies</h4><p>Investigate the combined effects of peptide-mediated pathways involved in cellular repair, extracellular matrix modulation, and regenerative signaling in controlled research models.</p></div></div><div class="flex gap-3"><div><h4>Peptide Synergy Analysis</h4><p>Examine interaction dynamics between multiple bioactive peptides to evaluate cooperative signaling effects in laboratory-based peptide research.</p></div></div><div class="flex gap-3"><div><h4>Inflammatory Pathway Modulation Research</h4><p>Study peptide influence on inflammatory signaling cascades and cellular stress response mechanisms under in-vitro and ex-vivo conditions.</p></div></div></div>',
   1),
  ('Ingredients', 'ingredients',
   '<p><strong>Active Ingredients:</strong></p><ul><li>TB-500 — 10 mg</li><li>BPC-157 — 10 mg</li><li>GHK-Cu — 50 mg</li></ul><p><strong>Inactive Ingredients:</strong><br/>Lyophilized peptide powder without preservatives</p>',
   2),
  ('Packaging Contents', 'packaging',
   '<div class="flex flex-col gap-4"><div class="flex gap-3"><div><h4>GLOW peptide blend vial</h4><p>70 mg total content (Vial Quantity based on selection)</p></div></div><div class="flex gap-3"><div><h4>Antibacterial water</h4><p>For research reconstitution purposes</p></div></div></div>',
   3),
  ('Molecular Structure', 'molecular',
   '<p><strong>Chemical Name and Description:</strong></p><p>This product contains a multi-peptide research blend composed of TB-500 (a synthetic thymosin beta-4 fragment), BPC-157 (a stable gastric pentadecapeptide), and GHK-Cu (a copper-binding tripeptide). Each peptide is structurally distinct and included to support advanced research into peptide signaling, cellular repair pathways, and molecular interaction studies.</p>',
   4)
) AS d(title, icon_type, content_html, sort_order)
WHERE p.slug = 'glow';
