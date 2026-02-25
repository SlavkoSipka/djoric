import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, X, ShoppingCart, Check } from 'lucide-react'
import ShopNav from '../components/ShopNav'
import { useWishlist } from '../context/WishlistContext'
import { useCart } from '../context/CartContext'

function WishlistHero() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: 'linear-gradient(150deg, #0a9edd 0%, #006ea8 35%, #004f82 65%, #004974 100%)',
      }}
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[30%] -right-[20%] w-[70%] h-[120%] rounded-full bg-white/[0.04] -rotate-[15deg]" />
        <div className="absolute -bottom-[40%] -left-[15%] w-[65%] h-full rounded-full bg-black/[0.04] rotate-[10deg]" />
        <div
          className="absolute -top-[30%] -left-[10%] w-[800px] h-[800px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(255,255,255,0.07) 0%, transparent 70%)' }}
        />
      </div>

      <div className="relative z-10 hidden sm:block">
        <img
          src="https://beyond-peptides.com/wp-content/uploads/2024/09/Rectangle-1058.png"
          alt=""
          className="w-full"
          style={{ maxHeight: 1, opacity: 0.5 }}
          loading="eager"
        />
      </div>

      <div
        className="relative z-10 flex flex-col items-center text-center mx-auto px-5"
        style={{
          maxWidth: 1320,
          paddingTop: 50,
          paddingBottom: 70,
        }}
      >
        <nav className="flex items-center gap-1.5 mb-5">
          <Link
            to="/"
            className="font-primary text-[13px] transition-colors hover:text-white"
            style={{ color: 'rgba(255,255,255,0.6)' }}
          >
            Home
          </Link>
          <ChevronRight
            className="w-3 h-3"
            style={{ color: 'rgba(255,255,255,0.4)' }}
          />
          <span
            className="font-primary text-[13px]"
            style={{ color: 'rgba(255,255,255,0.9)' }}
          >
            Wishlist
          </span>
        </nav>

        <h1
          className="font-primary font-bold"
          style={{
            fontSize: 'clamp(36px, 5vw, 56px)',
            lineHeight: 1.1,
            color: '#fff',
            marginBottom: 16,
          }}
        >
          Wishlist
        </h1>

        <p
          className="font-primary"
          style={{
            fontSize: 16,
            color: 'rgba(255,255,255,0.65)',
            maxWidth: 500,
            lineHeight: 1.6,
          }}
        >
          Your saved products for later.
        </p>
      </div>
    </section>
  )
}

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  } catch {
    return ''
  }
}

export default function WishlistPage() {
  const { items, removeItem } = useWishlist()
  const { addItem: addToCart } = useCart()
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [bulkAction, setBulkAction] = useState('')

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const toggleSelectAll = () => {
    if (selectedIds.size === items.length) {
      setSelectedIds(new Set())
    } else {
      setSelectedIds(new Set(items.map(i => i.id)))
    }
  }

  const handleRemove = (id: string) => {
    removeItem(id)
  }

  const handleAddToCart = (item: typeof items[0]) => {
    addToCart({
      slug: item.slug,
      name: item.name,
      image: item.image,
      dosage: item.dosage,
      vial: item.vial,
      price: item.price,
    })
  }

  const handleAddSelectedToCart = () => {
    items
      .filter(i => selectedIds.has(i.id))
      .forEach(item => handleAddToCart(item))
    setSelectedIds(new Set())
  }

  const handleAddAllToCart = () => {
    items.forEach(item => handleAddToCart(item))
  }

  const handleBulkAction = () => {
    if (bulkAction === 'add_to_cart_selected') {
      handleAddSelectedToCart()
    } else if (bulkAction === 'remove_selected') {
      selectedIds.forEach(id => removeItem(id))
      setSelectedIds(new Set())
    }
    setBulkAction('')
  }

  return (
    <>
      <ShopNav />
      <WishlistHero />

      <section style={{ background: '#fff', padding: '50px 0 80px' }}>
        <div className="mx-auto" style={{ maxWidth: 1320, padding: '0 20px' }}>
          {items.length === 0 ? (
            <div className="text-center py-16">
              <p className="font-primary text-[#6B7785] text-[16px] mb-6">
                Your wishlist is empty.
              </p>
              <Link
                to="/shop/"
                className="inline-block px-8 py-3 rounded-lg bg-[#16A1C5] text-white font-primary font-semibold text-[14px] hover:bg-[#1291b3] transition-colors"
              >
                Browse Products
              </Link>
            </div>
          ) : (
            <div className="font-primary">
              <h2 className="text-[#22282F] font-semibold text-[22px] mb-6">Wishlist</h2>

              <div className="overflow-x-auto border border-[#e5e7eb] rounded-xl">
                <table className="w-full min-w-[700px]">
                  <thead>
                    <tr className="border-b border-[#e5e7eb] bg-[#f8f9fb]">
                      <th className="text-left py-4 px-4 w-10">
                        <input
                          type="checkbox"
                          checked={selectedIds.size === items.length && items.length > 0}
                          onChange={toggleSelectAll}
                          className="w-4 h-4 rounded border-[#DBDFE5]"
                        />
                      </th>
                      <th className="text-left py-4 px-4 w-10">
                        <span className="sr-only">Remove</span>
                      </th>
                      <th className="text-left py-4 px-4 w-10">
                        <span className="sr-only">Image</span>
                      </th>
                      <th className="text-left py-4 px-4 font-semibold text-[13px] text-[#22282F]">Product Name</th>
                      <th className="text-left py-4 px-4 font-semibold text-[13px] text-[#22282F]">Unit Price</th>
                      <th className="text-left py-4 px-4 font-semibold text-[13px] text-[#22282F] hidden md:table-cell">Date Added</th>
                      <th className="text-left py-4 px-4 font-semibold text-[13px] text-[#22282F] hidden md:table-cell">Stock Status</th>
                      <th className="text-left py-4 px-4 font-semibold text-[13px] text-[#22282F]">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item) => (
                      <tr key={item.id} className="border-b border-[#e5e7eb]">
                        <td className="py-4 px-4">
                          <input
                            type="checkbox"
                            checked={selectedIds.has(item.id)}
                            onChange={() => toggleSelect(item.id)}
                            className="w-4 h-4 rounded border-[#DBDFE5]"
                          />
                        </td>
                        <td className="py-4 px-4">
                          <button
                            onClick={() => handleRemove(item.id)}
                            className="w-8 h-8 flex items-center justify-center text-[#5B6775] hover:text-[#E8453C] transition-colors"
                            title="Remove"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </td>
                        <td className="py-4 px-4">
                          <Link to={`/product/${item.slug}/`} className="block w-16 h-16">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-16 h-16 object-contain rounded-lg bg-[#f8f9fb]"
                            />
                          </Link>
                        </td>
                        <td className="py-4 px-4">
                          <Link
                            to={`/product/${item.slug}/`}
                            className="font-medium text-[14px] text-[#22282F] hover:text-[#16A1C5] transition-colors"
                          >
                            {item.name} - {item.dosage}, {item.vial}
                          </Link>
                        </td>
                        <td className="py-4 px-4 text-[14px] font-semibold text-[#22282F]">
                          ${item.price.toFixed(2)} <small className="text-[#8494A6] font-normal">incl. VAT</small>
                        </td>
                        <td className="py-4 px-4 text-[13px] text-[#6B7785] hidden md:table-cell">
                          {formatDate(item.addedAt)}
                        </td>
                        <td className="py-4 px-4 hidden md:table-cell">
                          {item.inStock ? (
                            <span className="inline-flex items-center gap-1 text-[13px] text-green-600">
                              <Check className="w-4 h-4" />
                              In stock
                            </span>
                          ) : (
                            <span className="text-[13px] text-red-500">Out of stock</span>
                          )}
                        </td>
                        <td className="py-4 px-4">
                          <button
                            onClick={() => handleAddToCart(item)}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#16A1C5] text-white font-semibold text-[13px] hover:bg-[#1291b3] transition-colors"
                          >
                            <ShoppingCart className="w-4 h-4" />
                            Add to Cart
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan={8} className="py-4 px-4 border-t border-[#e5e7eb]">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                          <div className="flex flex-wrap items-center gap-2">
                            <select
                              value={bulkAction}
                              onChange={(e) => setBulkAction(e.target.value)}
                              className="h-9 px-3 rounded-lg border border-[#e5e7eb] font-primary text-[13px] text-[#22282F] outline-none"
                            >
                              <option value="">Actions</option>
                              <option value="add_to_cart_selected">Add to Cart</option>
                              <option value="remove_selected">Remove</option>
                            </select>
                            <button
                              onClick={handleBulkAction}
                              disabled={!bulkAction}
                              className="h-9 px-4 rounded-lg bg-[#22282F] text-white font-primary font-semibold text-[12px] hover:bg-[#333a42] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              Apply Action
                            </button>
                          </div>
                          <div className="flex flex-wrap items-center gap-2">
                            <button
                              onClick={handleAddSelectedToCart}
                              disabled={selectedIds.size === 0}
                              className="h-9 px-4 rounded-lg border border-[#DBDFE5] font-primary font-semibold text-[13px] text-[#22282F] hover:bg-[#f4f5f7] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              Add Selected to Cart
                            </button>
                            <button
                              onClick={handleAddAllToCart}
                              className="h-9 px-4 rounded-lg bg-[#16A1C5] text-white font-primary font-semibold text-[13px] hover:bg-[#1291b3] transition-colors"
                            >
                              Add All to Cart
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
