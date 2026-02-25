import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'

export interface WishlistItem {
  id: string
  slug: string
  name: string
  image: string
  dosage: string
  vial: string
  price: number
  addedAt: string
  inStock: boolean
}

interface WishlistContextType {
  items: WishlistItem[]
  addItem: (item: Omit<WishlistItem, 'id' | 'addedAt'>) => void
  removeItem: (id: string) => void
  isInWishlist: (slug: string, dosage: string, vial: string) => boolean
  toggleItem: (item: Omit<WishlistItem, 'id' | 'addedAt'>) => void
  totalItems: number
}

const WishlistContext = createContext<WishlistContextType | null>(null)

function itemKey(slug: string, dosage: string, vial: string) {
  return `${slug}|${dosage}|${vial}`
}

function loadWishlist(): WishlistItem[] {
  try {
    const raw = localStorage.getItem('bp_wishlist')
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>(loadWishlist)

  useEffect(() => {
    localStorage.setItem('bp_wishlist', JSON.stringify(items))
  }, [items])

  const addItem = useCallback((item: Omit<WishlistItem, 'id' | 'addedAt'>) => {
    const key = itemKey(item.slug, item.dosage, item.vial)
    setItems(prev => {
      if (prev.some(i => itemKey(i.slug, i.dosage, i.vial) === key)) return prev
      return [...prev, {
        ...item,
        id: crypto.randomUUID(),
        addedAt: new Date().toISOString(),
      }]
    })
  }, [])

  const removeItem = useCallback((id: string) => {
    setItems(prev => prev.filter(i => i.id !== id))
  }, [])

  const isInWishlist = useCallback((slug: string, dosage: string, vial: string) => {
    const key = itemKey(slug, dosage, vial)
    return items.some(i => itemKey(i.slug, i.dosage, i.vial) === key)
  }, [items])

  const toggleItem = useCallback((item: Omit<WishlistItem, 'id' | 'addedAt'>) => {
    const key = itemKey(item.slug, item.dosage, item.vial)
    const existing = items.find(i => itemKey(i.slug, i.dosage, i.vial) === key)
    if (existing) {
      removeItem(existing.id)
    } else {
      addItem(item)
    }
  }, [items, addItem, removeItem])

  return (
    <WishlistContext.Provider value={{
      items,
      addItem,
      removeItem,
      isInWishlist,
      toggleItem,
      totalItems: items.length,
    }}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const ctx = useContext(WishlistContext)
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider')
  return ctx
}
