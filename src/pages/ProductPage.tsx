import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ChevronRight, ChevronUp, ChevronDown, Heart, Minus, Plus, Star } from 'lucide-react'
import ShopNav from '../components/ShopNav'
import NewProducts from '../components/NewProducts'
import PeptideProducts from '../components/PeptideProducts'
import { useProduct, useProductDetails } from '../hooks/useProducts'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import type { ProductRow, ProductDetailRow } from '../lib/supabase'

const researchIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M6.80032 18.3334C3.31698 18.3334 2.61698 16.2251 3.75032 13.6584L7.29198 5.61675H7.04198C6.50032 5.61675 6.00032 5.40008 5.64198 5.04175C5.27532 4.68341 5.05865 4.18341 5.05865 3.64175C5.05865 2.55841 5.94198 1.66675 7.03365 1.66675H12.9586C13.5086 1.66675 14.0003 1.89175 14.3586 2.25008C14.8253 2.71675 15.0586 3.40008 14.8836 4.12508C14.6586 5.02508 13.792 5.61675 12.867 5.61675H12.7336L16.2503 13.6667C17.3753 16.2334 16.642 18.3334 13.192 18.3334H6.80032Z" stroke="#22282F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M4.94531 10.9334C4.94531 10.9334 7.49531 10.8334 9.99531 11.6667C12.4953 12.5 14.8536 10.925 14.8536 10.925" stroke="#22282F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const ingredientsIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M6.66406 1.66675V4.16675" stroke="#22282F" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M13.3359 1.66675V4.16675" stroke="#22282F" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M17.5 7.08341V14.1667C17.5 16.6667 16.25 18.3334 13.3333 18.3334H6.66667C3.75 18.3334 2.5 16.6667 2.5 14.1667V7.08341C2.5 4.58341 3.75 2.91675 6.66667 2.91675H13.3333C16.25 2.91675 17.5 4.58341 17.5 7.08341Z" stroke="#22282F" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M5.83594 9.16675H10.8359" stroke="#22282F" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M5.83594 13.3333H8.01927" stroke="#22282F" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const packagingIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M2.64062 6.2002L9.99895 10.4585L17.3073 6.22517" stroke="#22282F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10 18.0085V10.4502" stroke="#22282F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M18.0088 7.64175V12.3584C18.0088 12.4001 18.0088 12.4334 18.0005 12.4751C17.4172 11.9667 16.6672 11.6668 15.8338 11.6668C15.0505 11.6668 14.3255 11.9418 13.7505 12.4001C12.9838 13.0084 12.5005 13.9501 12.5005 15.0001C12.5005 15.6251 12.6755 16.2168 12.9838 16.7168L11.7255 17.9334C10.7755 18.4668 9.2255 18.4668 8.2755 17.9334L3.82551 15.4668C2.81717 14.9084 1.99219 13.5084 1.99219 12.3584V7.64175C1.99219 6.49175 2.81717 5.09177 3.82551 4.53343L8.2755 2.06675C9.2255 1.53341 10.7755 1.53341 11.7255 2.06675L16.1755 4.53343C17.1838 5.09177 18.0088 6.49175 18.0088 7.64175Z" stroke="#22282F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const molecularIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="10" r="3" stroke="#22282F" strokeWidth="1.5"/>
    <circle cx="3.5" cy="5" r="2" stroke="#22282F" strokeWidth="1.5"/>
    <circle cx="16.5" cy="5" r="2" stroke="#22282F" strokeWidth="1.5"/>
    <circle cx="3.5" cy="15" r="2" stroke="#22282F" strokeWidth="1.5"/>
    <circle cx="16.5" cy="15" r="2" stroke="#22282F" strokeWidth="1.5"/>
    <path d="M7.5 8.5L5 6.5M12.5 8.5L15 6.5M7.5 11.5L5 13.5M12.5 11.5L15 13.5" stroke="#22282F" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
)

const ACCORDION_SECTIONS = [
  { key: 'research_purpose' as const, title: 'Research Purpose', icon: researchIcon },
  { key: 'ingredients' as const, title: 'Ingredients', icon: ingredientsIcon },
  { key: 'packaging_contents' as const, title: 'Packaging Contents', icon: packagingIcon },
  { key: 'molecular_structure' as const, title: 'Molecular Structure', icon: molecularIcon },
]

function Accordion({ details }: { details: ProductDetailRow | null }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="border-t border-[#e5e7eb]">
      {ACCORDION_SECTIONS.map((section, idx) => {
        const content = details?.[section.key]
        return (
          <div key={section.key} className="border-b border-[#e5e7eb]">
            <button
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              className="w-full flex items-center gap-3 py-4 text-left"
            >
              <span className="shrink-0">{section.icon}</span>
              <span className="flex-1 font-primary font-semibold text-[15px] text-[#22282F]">{section.title}</span>
              {openIndex === idx
                ? <ChevronUp className="w-4 h-4 text-[#5B6775] shrink-0" />
                : <ChevronDown className="w-4 h-4 text-[#5B6775] shrink-0" />
              }
            </button>
            {openIndex === idx && content && (
              <div
                className="pb-5 pl-[32px] font-primary text-[14px] text-[#444B53] leading-relaxed [&_h4]:font-semibold [&_h4]:text-[#22282F] [&_h4]:mb-1 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_strong]:font-semibold [&_a]:text-[#16A1C5] [&_a:hover]:underline"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}

const faqItems = [
  {
    question: 'Are there customs duties within Europe?',
    answer: '<p class="font-primary text-[14px] text-[#444B53] leading-relaxed">No, there are generally <strong>no customs duties</strong> on goods shipped within the European Union due to the free movement of goods.</p>',
  },
  {
    question: 'How can I contact customer support?',
    answer: '<p class="font-primary text-[14px] text-[#444B53] leading-relaxed">You can reach our customer support team via our <strong>email address (<a href="mailto:contact@beyond-peptides.com" class="text-[#16A1C5] hover:underline">contact@beyond-peptides.com</a>)</strong>. We are also working on providing support through <strong>WhatsApp</strong> in the near future.</p>',
  },
  {
    question: 'What measures do you take to ensure product security and trust?',
    answer: '<ul class="font-primary text-[14px] text-[#444B53] leading-relaxed list-disc pl-5 space-y-2"><li><strong>Trust Badges and Certifications:</strong> We display relevant certifications to assure you of our commitment to quality.</li><li><strong>Data Security:</strong> We employ high IT security standards to protect your personal information.</li><li><strong>Legal Compliance:</strong> We ensure all products and practices comply with legal standards.</li></ul>',
  },
  {
    question: 'What responsibility do consumers have regarding legal compliance?',
    answer: '<p class="font-primary text-[14px] text-[#444B53] leading-relaxed">Consumers are responsible for ensuring compliance with local laws concerning the purchase, possession, and use of peptides. This includes understanding any prohibitions or restrictions on specific peptides within their country.</p>',
  },
]

function FaqAccordion() {
  const [openIdx, setOpenIdx] = useState<number | null>(0)

  return (
    <div className="border-t border-[#e5e7eb]">
      {faqItems.map((item, idx) => (
        <div key={idx} className="border-b border-[#e5e7eb]">
          <button
            onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
            className="w-full flex items-center justify-between py-5 text-left gap-4"
          >
            <span className="font-primary font-semibold text-[15px] text-[#22282F]">{item.question}</span>
            <span className="shrink-0 w-6 h-6 flex items-center justify-center">
              {openIdx === idx ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M5 11h14v2H5z" fill="#22282F"/></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z" fill="#22282F"/></svg>
              )}
            </span>
          </button>
          {openIdx === idx && (
            <div className="pb-5" dangerouslySetInnerHTML={{ __html: item.answer }} />
          )}
        </div>
      ))}
    </div>
  )
}

function StarRating({ rating, count }: { rating: number; count: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            className="w-[14px] h-[14px]"
            fill={i <= rating ? '#F59E0B' : 'none'}
            stroke={i <= rating ? '#F59E0B' : '#D1D5DB'}
          />
        ))}
      </div>
      {count > 0 && (
        <span className="font-primary text-[12px] text-[#8494A6]">
          ({count} {count === 1 ? 'review' : 'reviews'})
        </span>
      )}
    </div>
  )
}

function LoadingSkeleton() {
  return (
    <>
      <ShopNav />
      <section style={{ background: '#f8f9fb' }}>
        <div className="mx-auto" style={{ maxWidth: 1320, padding: '24px 20px 0' }}>
          <div className="h-4 w-48 bg-[#e5e7eb] rounded animate-pulse mb-6" />
        </div>
        <div className="mx-auto flex flex-col lg:flex-row gap-10" style={{ maxWidth: 1320, padding: '0 20px 60px' }}>
          <div className="lg:w-[55%]">
            <div className="rounded-2xl bg-[#e5e7eb] animate-pulse" style={{ height: 500 }} />
          </div>
          <div className="lg:w-[45%] flex flex-col gap-4">
            <div className="h-4 w-20 bg-[#e5e7eb] rounded animate-pulse" />
            <div className="h-10 w-64 bg-[#e5e7eb] rounded animate-pulse" />
            <div className="h-6 w-32 bg-[#e5e7eb] rounded animate-pulse" />
            <div className="h-10 w-40 bg-[#e5e7eb] rounded animate-pulse" />
            <div className="h-12 w-full bg-[#e5e7eb] rounded animate-pulse mt-4" />
            <div className="h-12 w-full bg-[#e5e7eb] rounded animate-pulse" />
          </div>
        </div>
      </section>
    </>
  )
}

function ProductDetail({ product }: { product: ProductRow }) {
  const { addItem } = useCart()
  const { details } = useProductDetails(product.id)
  const { isInWishlist, toggleItem } = useWishlist()
  const [selectedDosageIdx, setSelectedDosageIdx] = useState(0)
  const [selectedVialIdx, setSelectedVialIdx] = useState(0)
  const [quantity, setQuantity] = useState(1)

  const hasVariations = product.variations.length > 0
  const variation = hasVariations ? product.variations[selectedDosageIdx] : null
  const selectedVial = variation ? variation.vials[selectedVialIdx] : null
  const currentPrice = selectedVial ? selectedVial.price : product.price
  const currentInStock = selectedVial ? selectedVial.in_stock : product.in_stock

  const dosage = variation?.dosage || product.dosage || ''
  const vial = selectedVial?.label || '1 Vial'
  const wishlisted = isInWishlist(product.slug, dosage, vial)

  return (
    <>
      <ShopNav />

      <section style={{ background: '#f8f9fb' }}>
        <div className="mx-auto" style={{ maxWidth: 1320, padding: '24px 20px 0' }}>
          <nav className="flex items-center gap-1.5 mb-6">
            <Link to="/" className="font-primary text-[13px] text-[#8494A6] hover:text-[#22282F] transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 text-[#C4CDD5]" />
            <Link to="/shop/" className="font-primary text-[13px] text-[#8494A6] hover:text-[#22282F] transition-colors">{product.category}</Link>
            <ChevronRight className="w-3 h-3 text-[#C4CDD5]" />
            <span className="font-primary text-[13px] text-[#22282F] font-medium">{product.name}</span>
          </nav>
        </div>

        <div className="mx-auto flex flex-col lg:flex-row gap-10" style={{ maxWidth: 1320, padding: '0 20px 60px' }}>
          {/* Left Column */}
          <div className="lg:w-[55%] flex flex-col gap-8">
            <div className="rounded-2xl flex items-center justify-center p-8 lg:p-12" style={{ background: '#fff', border: '1px solid #eef0f3' }}>
              {product.image ? (
                <img src={product.image} alt={product.name} className="w-full object-contain" style={{ maxWidth: 450, maxHeight: 500 }} />
              ) : (
                <div className="w-full aspect-square flex items-center justify-center text-[#C4CDD5] font-primary">No image available</div>
              )}
            </div>
            <div className="hidden lg:block">
              <Accordion details={details} />
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:w-[45%] flex flex-col gap-0">
            <div className="flex items-center justify-between mb-2">
              {product.dosage && (
                <span className="font-primary text-[13px] text-[#8494A6] font-medium">{product.dosage}</span>
              )}
              <button
                onClick={() => toggleItem({
                  slug: product.slug,
                  name: product.name,
                  image: product.image,
                  dosage,
                  vial,
                  price: currentPrice,
                  inStock: currentInStock,
                })}
                className="w-[40px] h-[40px] rounded-full border flex items-center justify-center transition-all"
                style={{ borderColor: wishlisted ? '#ef4444' : '#e5e7eb', background: wishlisted ? '#fef2f2' : '#fff' }}
              >
                <Heart className="w-[18px] h-[18px] transition-colors" fill={wishlisted ? '#ef4444' : 'none'} stroke={wishlisted ? '#ef4444' : '#5B6775'} />
              </button>
            </div>

            <h1 className="font-primary font-bold text-[#22282F] mb-2" style={{ fontSize: 'clamp(28px, 3.5vw, 38px)', lineHeight: 1.15 }}>
              {product.name}
            </h1>

            <div className="mb-5">
              <StarRating rating={product.rating} count={product.review_count} />
            </div>

            <div className="mb-1">
              <span className="font-primary font-bold text-[#22282F]" style={{ fontSize: 'clamp(24px, 3vw, 32px)' }}>
                {currentPrice.toFixed(2)} €
              </span>
            </div>
            {product.price_per_unit && (
              <p className="font-primary text-[12px] text-[#8494A6] mb-6">
                {product.price_per_unit}, including VAT, plus shipping costs
              </p>
            )}

            {/* Dosage Selector */}
            {hasVariations && product.variations.length > 1 && (
              <div className="mb-5">
                <div className="flex items-center gap-2 mb-2">
                  <label className="font-primary font-semibold text-[13px] text-[#22282F]">Dosages</label>
                  <span className="font-primary text-[13px] text-[#8494A6]">: {variation!.dosage}</span>
                </div>
                <div className="flex gap-2">
                  {product.variations.map((v, i) => (
                    <button
                      key={v.dosage}
                      onClick={() => { setSelectedDosageIdx(i); setSelectedVialIdx(0); setQuantity(1) }}
                      className={`px-5 py-2.5 rounded-lg font-primary font-semibold text-[13px] border transition-all ${
                        i === selectedDosageIdx
                          ? 'bg-[#22282F] text-white border-[#22282F]'
                          : 'bg-white text-[#22282F] border-[#e5e7eb] hover:border-[#22282F]'
                      }`}
                    >
                      {v.dosage}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Single dosage display */}
            {hasVariations && product.variations.length === 1 && (
              <div className="mb-5">
                <div className="flex items-center gap-2 mb-2">
                  <label className="font-primary font-semibold text-[13px] text-[#22282F]">Dosages</label>
                  <span className="font-primary text-[13px] text-[#8494A6]">: {variation!.dosage}</span>
                </div>
                <div className="flex gap-2">
                  <button className="px-5 py-2.5 rounded-lg font-primary font-semibold text-[13px] border bg-[#22282F] text-white border-[#22282F]">
                    {variation!.dosage}
                  </button>
                </div>
              </div>
            )}

            {/* Vial Selector */}
            {variation && variation.vials.length > 0 && (
              <div className="mb-2">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <label className="font-primary font-semibold text-[13px] text-[#22282F]">Vial</label>
                    <span className="font-primary text-[13px] text-[#8494A6]">: {selectedVial?.label}</span>
                  </div>
                </div>
                {variation.vials.length > 1 && (
                  <p className="font-primary text-[12px] text-[#16A1C5] font-medium mb-2">Buy more vials and save!</p>
                )}
                <div className="flex gap-2">
                  {variation.vials.map((vial, i) => (
                    <button
                      key={vial.label}
                      onClick={() => { setSelectedVialIdx(i); setQuantity(1) }}
                      className={`relative px-5 py-2.5 rounded-lg font-primary font-semibold text-[13px] border transition-all ${
                        i === selectedVialIdx
                          ? 'bg-[#22282F] text-white border-[#22282F]'
                          : 'bg-white text-[#22282F] border-[#e5e7eb] hover:border-[#22282F]'
                      }`}
                    >
                      {vial.label}
                      {vial.discount && (
                        <span className="absolute -top-2 -right-2 text-[10px] font-bold px-1.5 py-0.5 rounded-full" style={{ background: '#E8453C', color: '#fff' }}>
                          {vial.discount}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center gap-2 mb-5 mt-2">
              <img src="https://beyond-peptides.com/wp-content/uploads/2024/09/Frame-2.png" alt="" className="w-4 h-4" />
              <span className="font-primary text-[12px] text-[#5B6775]">Free antibacterial water with each vial</span>
            </div>

            <div className="flex items-center gap-2 mb-5">
              {currentInStock ? (
                <>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                  <span className="font-primary text-[13px] text-green-600 font-semibold">In Stock</span>
                </>
              ) : (
                <>
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                  <span className="font-primary text-[13px] text-red-500 font-semibold">Out of Stock</span>
                </>
              )}
            </div>

            <div className="flex gap-3 mb-3">
              <div className="flex items-center border border-[#e5e7eb] rounded-lg overflow-hidden bg-white">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-[48px] flex items-center justify-center text-[#5B6775] hover:bg-[#f4f5f7] transition-colors">
                  <Minus className="w-4 h-4" />
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-12 h-[48px] text-center font-primary font-semibold text-[14px] text-[#22282F] outline-none border-x border-[#e5e7eb] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-[48px] flex items-center justify-center text-[#5B6775] hover:bg-[#f4f5f7] transition-colors">
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                disabled={!currentInStock}
                onClick={() => {
                  addItem({
                    slug: product.slug,
                    name: product.name,
                    image: product.image,
                    dosage: variation?.dosage || product.dosage || '',
                    vial: selectedVial?.label || '1 Vial',
                    price: currentPrice,
                  }, quantity)
                }}
                className={`flex-1 h-[48px] rounded-lg font-primary font-bold text-[14px] transition-all ${
                  currentInStock
                    ? 'bg-[#16A1C5] text-white hover:bg-[#1291b3] cursor-pointer'
                    : 'bg-[#e5e7eb] text-[#8494A6] cursor-not-allowed'
                }`}
              >
                Add to cart
              </button>
            </div>

            <button
              disabled={!currentInStock}
              className={`w-full h-[48px] rounded-lg font-primary font-bold text-[14px] mb-5 transition-all ${
                currentInStock
                  ? 'bg-[#22282F] text-white hover:bg-[#333a42] cursor-pointer'
                  : 'bg-[#f4f5f7] text-[#8494A6] border border-[#e5e7eb] cursor-not-allowed'
              }`}
            >
              Buy Now
            </button>

            <div className="mb-5">
              <p className="font-primary text-[12px] text-[#8494A6] font-semibold mb-2 text-center">Payment 100% Secure</p>
              <img src="https://beyond-peptides.com/wp-content/uploads/2025/06/Group-427320819.png" alt="Payment methods" className="w-full" style={{ maxWidth: 400, margin: '0 auto', display: 'block' }} />
            </div>

            <div className="flex flex-col gap-4 py-5 border-t border-[#e5e7eb]">
              {[
                { icon: 'https://beyond-peptides.com/wp-content/uploads/2024/09/99-High-Purity-Product.svg', title: '99% High Purity Product', desc: 'Guaranteed quality with rigorous testing and the highest effectiveness.' },
                { icon: 'https://beyond-peptides.com/wp-content/uploads/2024/09/Discreet-and-Secure-Shipping.svg', title: 'Discreet and Secure Shipping', desc: 'Secure, unbranded packaging with fast, hassle-free delivery.' },
                { icon: 'https://beyond-peptides.com/wp-content/uploads/2024/09/Certified-Products.svg', title: 'Certified Products', desc: 'All of our products are rigorously tested for authenticity and reliability.' },
              ].map((badge) => (
                <div key={badge.title} className="flex items-start gap-3">
                  <img src={badge.icon} alt="" className="w-[16px] h-[16px] mt-0.5 shrink-0" />
                  <div>
                    <h4 className="font-primary font-semibold text-[13px] text-[#22282F]">{badge.title}</h4>
                    <p className="font-primary text-[12px] text-[#8494A6] leading-relaxed">{badge.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="font-primary text-[11px] text-[#8494A6] text-center pt-3 border-t border-[#e5e7eb]">
              For research purposes only. Not intended for human consumption.
            </p>

            <div className="lg:hidden mt-8">
              <Accordion details={details} />
            </div>
          </div>
        </div>
      </section>

      {/* Free Antibacterial Water Banner */}
      <section className="overflow-hidden" style={{ background: '#f8f9fb' }}>
        <div className="mx-auto" style={{ maxWidth: 1320, padding: '0 20px 60px' }}>
          <div className="relative rounded-2xl overflow-hidden flex flex-col md:flex-row w-full" style={{ background: '#eef2f6' }}>
            <div className="absolute top-0 left-0 h-full pointer-events-none" style={{ width: '55%', background: '#e4e9ef', clipPath: 'polygon(0 0, 85% 0, 100% 100%, 0 100%)' }} />
            <div className="relative z-10 flex-1 flex flex-col justify-center px-8 py-10 md:px-12 md:py-14 lg:px-16">
              <h5 className="font-primary font-semibold text-[#22282F] mb-3" style={{ fontSize: 'clamp(11px, 1.1vw, 13px)', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                Ensure Safe Research Every Time
              </h5>
              <h2 className="font-primary font-bold text-[#22282F] mb-4" style={{ fontSize: 'clamp(22px, 2.8vw, 32px)', lineHeight: 1.25 }}>
                <span style={{ color: '#16A1C5' }}>Get Free Antibacterial Water</span><br />with Every Peptide Purchase!
              </h2>
              <p className="font-primary text-[#6B7785]" style={{ fontSize: 'clamp(13px, 1.2vw, 15px)', lineHeight: 1.7, maxWidth: 480 }}>
                This product, along with all of our products, includes free antibacterial water with each unit!
              </p>
            </div>
            <div className="relative z-10 md:w-[45%] shrink-0 flex items-center justify-center overflow-hidden">
              <img src="https://beyond-peptides.com/wp-content/uploads/2024/09/Mask-group-2.png" alt="Free antibacterial water" className="w-full h-full object-cover" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section style={{ background: '#fff', padding: '70px 0 80px' }}>
        <div className="mx-auto flex flex-col lg:flex-row gap-12" style={{ maxWidth: 1320, padding: '0 20px' }}>
          <div className="lg:w-[40%] shrink-0">
            <h5 className="font-primary font-semibold text-[#16A1C5] mb-3" style={{ fontSize: 'clamp(11px, 1.1vw, 13px)', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
              Research Peptide FAQs
            </h5>
            <h2 className="font-primary font-bold text-[#22282F] mb-4" style={{ fontSize: 'clamp(24px, 3vw, 36px)', lineHeight: 1.2 }}>
              Frequently Asked Questions
            </h2>
            <p className="font-primary text-[#6B7785] mb-6" style={{ fontSize: 'clamp(13px, 1.2vw, 15px)', lineHeight: 1.7, maxWidth: 400 }}>
              If you have questions regarding our peptides, research kits, or the ordering process, we've compiled some common inquiries here to assist you.
            </p>
            <Link to="/faq/" className="inline-flex items-center gap-2.5 px-6 py-3 rounded-lg font-primary font-semibold text-[13px] text-white transition-colors hover:brightness-110" style={{ background: '#22282F' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="14" viewBox="0 0 21 18" fill="none">
                <path d="M11.5 1.5L19 9M19 9L11.5 16.5M19 9H1" stroke="white" strokeWidth="1.5" strokeLinecap="square"/>
              </svg>
              Get In Touch
            </Link>
          </div>
          <div className="flex-1 min-w-0">
            <FaqAccordion />
          </div>
        </div>
      </section>

      <NewProducts title="You May Also Like" />
      <PeptideProducts title="Recently Viewed Products" />
    </>
  )
}

export default function ProductPage() {
  const { id } = useParams<{ id: string }>()
  const { product, loading } = useProduct(id)

  if (loading) return <LoadingSkeleton />

  if (!product) {
    return (
      <>
        <ShopNav />
        <section style={{ background: '#f8f9fb', padding: '80px 20px', textAlign: 'center' }}>
          <h1 className="font-primary font-bold text-[#22282F] text-2xl mb-4">Product Not Found</h1>
          <p className="font-primary text-[#6B7785] mb-6">The product you're looking for doesn't exist.</p>
          <Link to="/shop/" className="inline-block px-6 py-3 rounded-lg bg-[#16A1C5] text-white font-primary font-semibold text-sm hover:bg-[#1291b3] transition-colors">
            Back to Shop
          </Link>
        </section>
      </>
    )
  }

  return <ProductDetail product={product} />
}
