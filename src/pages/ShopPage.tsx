import { useState, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, ChevronUp, ChevronDown } from 'lucide-react'
import ShopNav from '../components/ShopNav'
import { useShopProducts } from '../hooks/useProducts'
import { useWishlist } from '../context/WishlistContext'
import type { ProductRow } from '../lib/supabase'
import { Heart } from 'lucide-react'

function ShopHero() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: 'linear-gradient(150deg, #0a9edd 0%, #006ea8 35%, #004f82 65%, #004974 100%)',
      }}
    >
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[30%] -right-[20%] w-[70%] h-[120%] rounded-full bg-white/[0.04] -rotate-[15deg]" />
        <div className="absolute -bottom-[40%] -left-[15%] w-[65%] h-full rounded-full bg-black/[0.04] rotate-[10deg]" />
        <div
          className="absolute -top-[30%] -left-[10%] w-[800px] h-[800px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(255,255,255,0.07) 0%, transparent 70%)' }}
        />
      </div>

      {/* Gradient line */}
      <div className="relative z-10 hidden sm:block">
        <img
          src="https://beyond-peptides.com/wp-content/uploads/2024/09/Rectangle-1058.png"
          alt=""
          className="w-full"
          style={{ maxHeight: 1, opacity: 0.5 }}
          loading="eager"
        />
      </div>

      {/* Content */}
      <div
        className="relative z-10 flex flex-col items-center text-center mx-auto px-5"
        style={{
          maxWidth: 1320,
          paddingTop: 50,
          paddingBottom: 70,
        }}
      >
        {/* Breadcrumbs */}
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
            Shop
          </span>
        </nav>

        {/* Title */}
        <h1
          className="font-primary font-bold"
          style={{
            fontSize: 'clamp(36px, 5vw, 56px)',
            lineHeight: 1.1,
            color: '#fff',
            marginBottom: 16,
          }}
        >
          Shop
        </h1>

        {/* Subtitle */}
        <p
          className="font-primary"
          style={{
            fontSize: 16,
            color: 'rgba(255,255,255,0.65)',
            maxWidth: 500,
            lineHeight: 1.6,
          }}
        >
          Explore our high-purity peptides with guaranteed 99%+ purity.
        </p>
      </div>
    </section>
  )
}

const categories = [
  'All Peptides', 'Bestseller', 'Cosmetics and Topicals',
  'New Products', 'Peptide Products', 'Tablets',
]

const cartIconSvg = (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M13.1234 8.75V5C13.1234 4.1712 12.7942 3.37634 12.2081 2.79029C11.6221 2.20424 10.8272 1.875 9.9984 1.875C9.1696 1.875 8.37474 2.20424 7.78869 2.79029C7.20264 3.37634 6.8734 4.1712 6.8734 5V8.75M16.3367 7.08917L17.3892 17.0892C17.4476 17.6433 17.0142 18.125 16.4567 18.125H3.54007C3.40857 18.1251 3.27852 18.0976 3.15836 18.0442C3.03819 17.9908 2.93061 17.9127 2.84259 17.8151C2.75457 17.7174 2.68808 17.6023 2.64745 17.4772C2.60681 17.3521 2.59294 17.2199 2.60673 17.0892L3.66007 7.08917C3.68436 6.8588 3.79309 6.64558 3.96528 6.49063C4.13746 6.33568 4.36092 6.24996 4.59257 6.25H15.4042C15.8842 6.25 16.2867 6.6125 16.3367 7.08917ZM7.1859 8.75C7.1859 8.83288 7.15298 8.91237 7.09437 8.97097C7.03577 9.02958 6.95628 9.0625 6.8734 9.0625C6.79052 9.0625 6.71103 9.02958 6.65243 8.97097C6.59382 8.91237 6.5609 8.83288 6.5609 8.75C6.5609 8.66712 6.59382 8.58763 6.65243 8.52903C6.71103 8.47042 6.79052 8.4375 6.8734 8.4375C6.95628 8.4375 7.03577 8.47042 7.09437 8.52903C7.15298 8.58763 7.1859 8.66712 7.1859 8.75ZM13.4359 8.75C13.4359 8.83288 13.403 8.91237 13.3444 8.97097C13.2858 9.02958 13.2063 9.0625 13.1234 9.0625C13.0405 9.0625 12.961 9.02958 12.9024 8.97097C12.8438 8.91237 12.8109 8.83288 12.8109 8.75C12.8109 8.66712 12.8438 8.58763 12.9024 8.52903C12.961 8.47042 13.0405 8.4375 13.1234 8.4375C13.2063 8.4375 13.2858 8.47042 13.3444 8.52903C13.403 8.58763 13.4359 8.66712 13.4359 8.75Z" stroke="#5B6775" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

function PriceSlider() {
  const [min, setMin] = useState(0)
  const [max, setMax] = useState(519)
  const trackRef = useRef<HTMLDivElement>(null)
  const left = (min / 519) * 100
  const right = 100 - (max / 519) * 100

  const handleMin = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const v = Math.min(Number(e.target.value), max)
    setMin(v)
  }, [max])

  const handleMax = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const v = Math.max(Number(e.target.value), min)
    setMax(v)
  }, [min])

  return (
    <div>
      <div ref={trackRef} className="relative h-[5px] rounded bg-[#e1e9f6]">
        <div className="absolute h-full rounded bg-[#16A1C5]" style={{ left: `${left}%`, right: `${right}%` }} />
      </div>
      <div className="relative h-5">
        <input type="range" min={0} max={519} value={min} onChange={handleMin} className="price-range-input" />
        <input type="range" min={0} max={519} value={max} onChange={handleMax} className="price-range-input" />
      </div>
      <div className="flex items-center gap-4 mt-2">
        <div className="flex items-center border border-[#DBDFE5] rounded-lg overflow-hidden">
          <input
            type="text"
            value={min}
            onChange={(e) => setMin(Math.min(Number(e.target.value) || 0, max))}
            className="w-16 px-2 py-1.5 text-sm font-medium text-[#22282F] outline-none font-primary"
          />
          <span className="pr-2 text-sm text-[#8494A6] font-primary">€</span>
        </div>
        <span className="text-sm text-[#8494A6] font-primary">to</span>
        <div className="flex items-center border border-[#DBDFE5] rounded-lg overflow-hidden">
          <input
            type="text"
            value={max}
            onChange={(e) => setMax(Math.max(Number(e.target.value) || 0, min))}
            className="w-16 px-2 py-1.5 text-sm font-medium text-[#22282F] outline-none font-primary"
          />
          <span className="pr-2 text-sm text-[#8494A6] font-primary">€</span>
        </div>
      </div>
    </div>
  )
}

function FilterAccordion({ title, defaultOpen, children }: { title: string; defaultOpen?: boolean; children: React.ReactNode }) {
  const [open, setOpen] = useState(!!defaultOpen)
  return (
    <div className="border-b border-[#e5e7eb]">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-4 font-primary font-semibold text-[15px] text-[#22282F]"
      >
        {title}
        {open ? <ChevronUp className="w-4 h-4 text-[#5B6775]" /> : <ChevronDown className="w-4 h-4 text-[#5B6775]" />}
      </button>
      {open && <div className="pb-4">{children}</div>}
    </div>
  )
}

function ProductCard({ product }: { product: ProductRow }) {
  const [hovered, setHovered] = useState(false)
  const { isInWishlist, toggleItem } = useWishlist()

  const v = product.variations?.[0]
  const vial = v?.vials?.[0]
  const dosage = v?.dosage || product.dosage || ''
  const vialLabel = vial?.label || '1 Vial'
  const price = vial?.price ?? product.price
  const inStock = vial?.in_stock ?? product.in_stock
  const wishlisted = isInWishlist(product.slug, dosage, vialLabel)

  return (
    <div
      className="group relative overflow-hidden rounded-2xl bg-white"
      style={{ border: '1px solid #f0f0f0' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="absolute top-3 right-3 z-10">
        <button
          onClick={(e) => { e.preventDefault(); toggleItem({ slug: product.slug, name: product.name, image: product.image, dosage, vial: vialLabel, price, inStock }) }}
          className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all ${
            wishlisted ? 'border-red-400 bg-red-50 text-red-500' : 'border-[#e5e7eb] bg-white hover:border-[#16A1C5] hover:bg-[#f0fafe]'
          }`}
        >
          <Heart className="w-4 h-4" fill={wishlisted ? 'currentColor' : 'none'} stroke="currentColor" />
        </button>
      </div>
      {(product.tag || product.sale_badge) && (
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
          {product.tag && (
            <span className="font-primary text-[11px] font-semibold px-3 py-1 rounded-full bg-[#16A1C5] text-white">
              {product.tag}
            </span>
          )}
          {product.sale_badge && (
            <span className="font-primary text-[11px] font-semibold px-3 py-1 rounded-full bg-[#E8453C] text-white">
              {product.sale_badge}
            </span>
          )}
        </div>
      )}

      <Link to={`/product/${product.slug}/`} className="block p-6 pb-2">
        <img
          src={product.image}
          alt={product.name}
          className="w-full aspect-square object-contain transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </Link>

      <div className="px-5 pb-2">
        {product.dosage && (
          <p className="font-primary text-[12px] text-[#8494A6] mb-0.5">{product.dosage}</p>
        )}
        <h3 className="font-primary font-semibold text-[15px] text-[#22282F] leading-snug">
          {product.name}
        </h3>
      </div>

      <div className="px-5 pb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {product.old_price && (
            <span className="font-primary text-[13px] text-[#8494A6] line-through">
              {product.old_price.toFixed(2)}€
            </span>
          )}
          <span className="font-primary font-semibold text-[15px] text-[#22282F]">
            {product.price.toFixed(2)}€
          </span>
          <span className="font-primary text-[11px] text-[#8494A6]">incl. VAT</span>
        </div>
        <Link
          to={`/product/${product.slug}/`}
          className="w-[36px] h-[36px] rounded-full border border-[#e5e7eb] flex items-center justify-center hover:border-[#16A1C5] hover:bg-[#f0fafe] transition-all"
        >
          {cartIconSvg}
        </Link>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 bg-white px-5 py-4 transition-transform duration-300 border-t border-[#f0f0f0]"
        style={{
          transform: hovered ? 'translateY(0)' : 'translateY(100%)',
        }}
      >
        <Link
          to={`/product/${product.slug}/`}
          className="block w-full text-center py-2.5 rounded-lg bg-[#16A1C5] text-white font-primary font-semibold text-[13px] hover:bg-[#1291b3] transition-colors"
        >
          Select options
        </Link>
      </div>
    </div>
  )
}

export default function ShopPage() {
  const { products, loading } = useShopProducts()
  const [selectedCats, setSelectedCats] = useState<string[]>([])

  const toggleCat = (cat: string) => {
    setSelectedCats((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    )
  }

  return (
    <>
      <ShopNav />
      <ShopHero />

      <section style={{ background: '#fff', padding: '50px 0 80px' }}>
        <div className="mx-auto flex gap-8" style={{ maxWidth: 1320, padding: '0 20px' }}>

          {/* Sidebar */}
          <aside className="hidden lg:block shrink-0" style={{ width: 260 }}>
            <FilterAccordion title="Categories" defaultOpen>
              <div className="flex flex-col gap-1">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => toggleCat(cat)}
                    className={`text-left font-primary text-[13px] px-3 py-2 rounded-lg transition-colors ${
                      selectedCats.includes(cat)
                        ? 'bg-[#16A1C5] text-white'
                        : 'text-[#444B53] hover:bg-[#f4f5f7]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </FilterAccordion>

            <FilterAccordion title="Price">
              <PriceSlider />
            </FilterAccordion>

            <FilterAccordion title="Tags">
              <button className="font-primary text-[13px] px-3 py-2 rounded-lg text-[#444B53] hover:bg-[#f4f5f7] transition-colors">
                New
              </button>
            </FilterAccordion>
          </aside>

          {/* Products */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-6">
              <p className="font-primary text-[14px] text-[#444B53] font-medium">
                {products.length} Products
              </p>
              <div className="hidden sm:flex items-center gap-3">
                <select defaultValue="" className="font-primary text-[13px] text-[#444B53] border border-[#DBDFE5] rounded-lg px-3 py-2 outline-none bg-white cursor-pointer">
                  <option value="" disabled>Sort By</option>
                  <option>Date</option>
                  <option>Name</option>
                  <option>Price</option>
                  <option>Top Seller</option>
                  <option>Top Rated</option>
                </select>
                <select defaultValue="" className="font-primary text-[13px] text-[#444B53] border border-[#DBDFE5] rounded-lg px-3 py-2 outline-none bg-white cursor-pointer">
                  <option value="" disabled>View</option>
                  <option>2 Products per Row</option>
                  <option>3 Products per Row</option>
                  <option>4 Products per Row</option>
                </select>
              </div>
            </div>

            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="h-[350px] bg-[#e5e7eb] rounded-2xl animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                {products.map((product) => (
                  <ProductCard key={product.slug} product={product} />
                ))}
              </div>
            )}

            <div className="flex justify-center mt-10">
              <button className="font-primary font-semibold text-[14px] text-[#16A1C5] border-2 border-[#16A1C5] rounded-lg px-8 py-3 hover:bg-[#16A1C5] hover:text-white transition-colors">
                Load More
              </button>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .price-range-input {
          position: absolute;
          width: 100%;
          height: 3px;
          top: -3px;
          margin: 0;
          background: none;
          pointer-events: none;
          -webkit-appearance: none;
          -moz-appearance: none;
        }
        .price-range-input::-webkit-slider-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #fff;
          border: 3.9px solid #16A1C5;
          cursor: pointer;
          pointer-events: auto;
          -webkit-appearance: none;
          margin-top: -5.7px;
          box-shadow: 0 1px 4px rgba(0,0,0,0.1);
        }
        .price-range-input::-webkit-slider-runnable-track {
          width: 100%;
          height: 5px;
          cursor: pointer;
          background: transparent;
          border-radius: 14px;
          border: 0;
        }
        .price-range-input::-moz-range-thumb {
          height: 17px;
          width: 17px;
          border: none;
          border-radius: 50%;
          background: #fff;
          border: 3px solid #16A1C5;
          pointer-events: auto;
          -moz-appearance: none;
          box-shadow: 0 1px 4px rgba(0,0,0,0.1);
        }
      `}</style>
    </>
  )
}
