import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// ─── Order types ──────────────────────────────────────────────────────────────

export interface OrderRow {
  id: string
  order_number: string
  created_at: string
  status: string
  billing_first_name: string | null
  billing_last_name: string | null
  billing_company: string | null
  billing_address_1: string | null
  billing_address_2: string | null
  billing_city: string | null
  billing_state: string | null
  billing_postcode: string | null
  billing_country: string | null
  billing_phone: string | null
  billing_email: string | null
  shipping_first_name: string | null
  shipping_last_name: string | null
  shipping_company: string | null
  shipping_address_1: string | null
  shipping_address_2: string | null
  shipping_city: string | null
  shipping_state: string | null
  shipping_postcode: string | null
  shipping_country: string | null
  subtotal: number
  shipping_cost: number
  coupon_code: string | null
  coupon_discount: number
  total: number
  payment_method: string | null
  order_notes: string | null
}

export interface OrderItemRow {
  id: string
  order_id: string
  product_slug: string
  product_name: string
  dosage: string | null
  vial: string | null
  quantity: number
  price: number
  total: number
}

export interface OrderWithItems extends OrderRow {
  order_items: OrderItemRow[]
}

// ─── Save order ───────────────────────────────────────────────────────────────

export interface CreateOrderPayload {
  order_number: string
  billing_first_name: string
  billing_last_name: string
  billing_company: string
  billing_address_1: string
  billing_address_2: string
  billing_city: string
  billing_state: string
  billing_postcode: string
  billing_country: string
  billing_phone: string
  billing_email: string
  shipping_first_name: string
  shipping_last_name: string
  shipping_company: string
  shipping_address_1: string
  shipping_address_2: string
  shipping_city: string
  shipping_state: string
  shipping_postcode: string
  shipping_country: string
  subtotal: number
  shipping_cost: number
  coupon_code: string | null
  coupon_discount: number
  total: number
  payment_method: string
  order_notes: string
  items: { product_slug: string; product_name: string; dosage: string; vial: string; quantity: number; price: number; total: number }[]
}

export async function createOrder(payload: CreateOrderPayload): Promise<{ order: OrderRow | null; error: string | null }> {
  const { items, ...orderFields } = payload

  const { data: order, error: orderErr } = await supabase
    .from('orders')
    .insert(orderFields)
    .select()
    .single()

  if (orderErr || !order) {
    return { order: null, error: orderErr?.message ?? 'Failed to create order' }
  }

  const itemRows = items.map((i) => ({ order_id: order.id, ...i }))
  const { error: itemsErr } = await supabase.from('order_items').insert(itemRows)

  if (itemsErr) {
    return { order: null, error: itemsErr.message }
  }

  return { order, error: null }
}

// ─── Fetch order ──────────────────────────────────────────────────────────────

export async function fetchOrderByNumber(orderNumber: string): Promise<{ order: OrderWithItems | null; error: string | null }> {
  const { data, error } = await supabase
    .from('orders')
    .select('*, order_items(*)')
    .eq('order_number', orderNumber)
    .single()

  if (error || !data) {
    return { order: null, error: error?.message ?? 'Order not found' }
  }

  return { order: data as OrderWithItems, error: null }
}

export interface ProductRow {
  id: string
  name: string
  slug: string
  dosage: string | null
  price: number
  old_price: number | null
  sale_badge: string | null
  tag: string | null
  tested: boolean
  image: string
  category: string
  rating: number
  review_count: number
  price_per_unit: string | null
  in_stock: boolean
  featured: boolean
  is_new: boolean
  is_bestseller: boolean
  show_in_shop: boolean
  sort_order: number
  variations: Variation[]
  created_at: string
}

export interface ProductDetailRow {
  id: string
  product_id: string
  research_purpose: string | null
  ingredients: string | null
  packaging_contents: string | null
  molecular_structure: string | null
}

export interface Variation {
  dosage: string
  vials: VialOption[]
}

export interface VialOption {
  label: string
  price: number
  discount: string | null
  in_stock: boolean
}
