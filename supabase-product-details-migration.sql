-- ============================================
-- product_details - 4 kolone za accordion
-- Pokreni u Supabase SQL Editor
-- ============================================

-- Obrisi staru tabelu ako postoji (stara struktura sa title/icon_type/content_html)
DROP TABLE IF EXISTS product_details;

-- Nova tabela sa 4 kolone - jedna kolona po sekciji
CREATE TABLE product_details (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID NOT NULL UNIQUE REFERENCES products(id) ON DELETE CASCADE,
  research_purpose TEXT,
  ingredients TEXT,
  packaging_contents TEXT,
  molecular_structure TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE product_details ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Product details are publicly readable"
  ON product_details FOR SELECT
  USING (true);

CREATE INDEX idx_product_details_product_id ON product_details(product_id);

-- Kreiraj prazan red za svaki proizvod (da mozes da popunjavas u Table Editor)
INSERT INTO product_details (product_id)
SELECT id FROM products
ON CONFLICT (product_id) DO NOTHING;
