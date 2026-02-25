import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'

export interface CartItem {
  slug: string
  name: string
  image: string
  dosage: string
  vial: string
  price: number
  quantity: number
}

interface CartContextType {
  items: CartItem[]
  isOpen: boolean
  coupon: string | null
  couponDiscount: number
  addItem: (item: Omit<CartItem, 'quantity'>, qty?: number) => void
  removeItem: (slug: string, dosage: string, vial: string) => void
  updateQuantity: (slug: string, dosage: string, vial: string, qty: number) => void
  clearCart: () => void
  openCart: () => void
  closeCart: () => void
  applyCoupon: (code: string) => void
  removeCoupon: () => void
  totalItems: number
  subtotal: number
  total: number
}

const CartContext = createContext<CartContextType | null>(null)

function itemKey(slug: string, dosage: string, vial: string) {
  return `${slug}|${dosage}|${vial}`
}

const COUPON_CODES: Record<string, number> = {
  newyear10: 10,
  germanbull: 10,
}

function loadCart(): CartItem[] {
  try {
    const raw = localStorage.getItem('bp_cart')
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function loadCoupon(): string | null {
  try {
    return localStorage.getItem('bp_coupon') || null
  } catch {
    return null
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(loadCart)
  const [isOpen, setIsOpen] = useState(false)
  const [coupon, setCoupon] = useState<string | null>(loadCoupon)

  useEffect(() => {
    localStorage.setItem('bp_cart', JSON.stringify(items))
  }, [items])

  useEffect(() => {
    if (coupon) localStorage.setItem('bp_coupon', coupon)
    else localStorage.removeItem('bp_coupon')
  }, [coupon])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const addItem = useCallback((item: Omit<CartItem, 'quantity'>, qty = 1) => {
    setItems(prev => {
      const key = itemKey(item.slug, item.dosage, item.vial)
      const existing = prev.find(i => itemKey(i.slug, i.dosage, i.vial) === key)
      if (existing) {
        return prev.map(i =>
          itemKey(i.slug, i.dosage, i.vial) === key
            ? { ...i, quantity: i.quantity + qty }
            : i
        )
      }
      return [...prev, { ...item, quantity: qty }]
    })
    setIsOpen(true)
  }, [])

  const removeItem = useCallback((slug: string, dosage: string, vial: string) => {
    const key = itemKey(slug, dosage, vial)
    setItems(prev => prev.filter(i => itemKey(i.slug, i.dosage, i.vial) !== key))
  }, [])

  const updateQuantity = useCallback((slug: string, dosage: string, vial: string, qty: number) => {
    if (qty < 1) return
    const key = itemKey(slug, dosage, vial)
    setItems(prev => prev.map(i =>
      itemKey(i.slug, i.dosage, i.vial) === key ? { ...i, quantity: qty } : i
    ))
  }, [])

  const clearCart = useCallback(() => setItems([]), [])
  const openCart = useCallback(() => setIsOpen(true), [])
  const closeCart = useCallback(() => setIsOpen(false), [])

  const applyCoupon = useCallback((code: string) => {
    const normalized = code.toLowerCase().trim()
    if (COUPON_CODES[normalized] !== undefined) {
      setCoupon(normalized)
    }
  }, [])

  const removeCoupon = useCallback(() => setCoupon(null), [])

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0)
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0)
  const couponDiscount = coupon && COUPON_CODES[coupon]
    ? Math.round((subtotal * COUPON_CODES[coupon] / 100) * 100) / 100
    : 0
  const total = subtotal - couponDiscount

  return (
    <CartContext.Provider value={{
      items, isOpen, coupon, couponDiscount,
      addItem, removeItem, updateQuantity, clearCart,
      openCart, closeCart, applyCoupon, removeCoupon,
      totalItems, subtotal, total,
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
