import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import type { ProductRow, ProductDetailRow } from '../lib/supabase'

// Cache for the product list (without details)
let cachedProducts: ProductRow[] | null = null
let fetchPromise: Promise<ProductRow[]> | null = null

// Cache for product details keyed by product id (one row per product)
const detailsCache: Record<string, ProductDetailRow | null> = {}

async function fetchAllProducts(): Promise<ProductRow[]> {
  if (cachedProducts) return cachedProducts
  if (fetchPromise) return fetchPromise

  fetchPromise = (async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('sort_order', { ascending: true })

    if (error) throw error
    cachedProducts = (data as ProductRow[]) ?? []
    return cachedProducts
  })()

  return fetchPromise
}

export function useProducts() {
  const [products, setProducts] = useState<ProductRow[]>(cachedProducts || [])
  const [loading, setLoading] = useState(!cachedProducts)

  useEffect(() => {
    fetchAllProducts()
      .then(setProducts)
      .finally(() => setLoading(false))
  }, [])

  return { products, loading }
}

export function useProduct(slug: string | undefined) {
  const { products, loading } = useProducts()
  const product = products.find((p) => p.slug === slug) || null
  return { product, loading }
}

export function useShopProducts() {
  const { products, loading } = useProducts()
  return { products: products.filter((p) => p.show_in_shop), loading }
}

export function useNewProducts() {
  const { products, loading } = useProducts()
  return { products: products.filter((p) => p.is_new), loading }
}

export function useBestSellers() {
  const { products, loading } = useProducts()
  return { products: products.filter((p) => p.is_bestseller), loading }
}

export function useFeaturedProduct() {
  const { products, loading } = useProducts()
  return { product: products.find((p) => p.featured) || null, loading }
}

// Fetches accordion details (4 columns) for a single product page
export function useProductDetails(productId: string | undefined) {
  const [details, setDetails] = useState<ProductDetailRow | null>(
    productId ? (detailsCache[productId] ?? null) : null
  )
  const [loading, setLoading] = useState<boolean>(
    !!productId && detailsCache[productId] === undefined
  )

  useEffect(() => {
    if (!productId) return
    if (detailsCache[productId] !== undefined) {
      setDetails(detailsCache[productId])
      setLoading(false)
      return
    }

    setLoading(true)
    supabase
      .from('product_details')
      .select('*')
      .eq('product_id', productId)
      .maybeSingle()
      .then(({ data, error }) => {
        if (!error) {
          detailsCache[productId] = data as ProductDetailRow | null
          setDetails(detailsCache[productId])
        }
        setLoading(false)
      })
  }, [productId])

  return { details, loading }
}
