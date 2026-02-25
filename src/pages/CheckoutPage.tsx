import { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import ShopNav from '../components/ShopNav'
import { useCart } from '../context/CartContext'
import { COUNTRIES } from '../data/countries'
import { createOrder } from '../lib/supabase'

const DEFAULT_COUNTRY = 'RS'

const SHIPPING_RATE = 20

function CheckoutHero() {
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
          <Link to="/" className="font-primary text-[13px] transition-colors hover:text-white" style={{ color: 'rgba(255,255,255,0.6)' }}>Home</Link>
          <ChevronRight className="w-3 h-3" style={{ color: 'rgba(255,255,255,0.4)' }} />
          <Link to="/shop/" className="font-primary text-[13px] transition-colors hover:text-white" style={{ color: 'rgba(255,255,255,0.6)' }}>Shop</Link>
          <ChevronRight className="w-3 h-3" style={{ color: 'rgba(255,255,255,0.4)' }} />
          <span className="font-primary text-[13px]" style={{ color: 'rgba(255,255,255,0.9)' }}>Checkout</span>
        </nav>

        <h1 className="font-primary font-bold" style={{ fontSize: 'clamp(36px, 5vw, 56px)', lineHeight: 1.1, color: '#fff', marginBottom: 16 }}>
          Checkout
        </h1>

        <p className="font-primary" style={{ fontSize: 16, color: 'rgba(255,255,255,0.65)', maxWidth: 500, lineHeight: 1.6 }}>
          Complete your order securely.
        </p>
      </div>
    </section>
  )
}

function FormField({ label, required, optional, children, className = '' }: { label: string; required?: boolean; optional?: boolean; children: React.ReactNode; className?: string }) {
  return (
    <p className={`form-row ${className}`}>
      <label className={required ? 'required_field' : ''}>
        {label}
        {required && <span className="required" aria-hidden="true"> *</span>}
        {optional && <span className="optional"> (optional)</span>}
      </label>
      <span className="woocommerce-input-wrapper">{children}</span>
    </p>
  )
}

function AddressFields({ prefix }: { prefix: 'billing' | 'shipping' }) {
  const name = (s: string) => `${prefix}_${s}`
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label="First Name" required>
          <input type="text" name={name('first_name')} id={name('first_name')} placeholder="First Name" className="input-text w-full h-10 px-3 rounded-lg border border-[#e5e7eb] font-primary text-[14px] outline-none focus:border-[#16A1C5]" autoComplete={`section-${prefix} ${prefix} given-name`} />
        </FormField>
        <FormField label="Last Name" required>
          <input type="text" name={name('last_name')} id={name('last_name')} placeholder="Last Name" className="input-text w-full h-10 px-3 rounded-lg border border-[#e5e7eb] font-primary text-[14px] outline-none focus:border-[#16A1C5]" autoComplete={`section-${prefix} ${prefix} family-name`} />
        </FormField>
      </div>
      <FormField label="Company Name" optional>
        <input type="text" name={name('company')} id={name('company')} placeholder="Company Name" className="input-text w-full h-10 px-3 rounded-lg border border-[#e5e7eb] font-primary text-[14px] outline-none focus:border-[#16A1C5]" autoComplete={`section-${prefix} ${prefix} organization`} />
      </FormField>
      <FormField label="Country / Region" required>
        <select name={name('country')} id={name('country')} defaultValue={DEFAULT_COUNTRY} className="country_select w-full h-10 px-3 rounded-lg border border-[#e5e7eb] font-primary text-[14px] outline-none focus:border-[#16A1C5] bg-white" autoComplete={`section-${prefix} ${prefix} country`}>
          {COUNTRIES.map((c) => (
            <option key={c.value} value={c.value}>{c.label}</option>
          ))}
        </select>
      </FormField>
      <FormField label="Street address" required>
        <input type="text" name={name('address_1')} id={name('address_1')} placeholder="House number and street name" className="input-text w-full h-10 px-3 rounded-lg border border-[#e5e7eb] font-primary text-[14px] outline-none focus:border-[#16A1C5]" autoComplete={`section-${prefix} ${prefix} address-line1`} />
      </FormField>
      <FormField label="Apartment, suite, unit, etc." optional>
        <input type="text" name={name('address_2')} id={name('address_2')} placeholder="Apartment, suite, unit, etc. (optional)" className="input-text w-full h-10 px-3 rounded-lg border border-[#e5e7eb] font-primary text-[14px] outline-none focus:border-[#16A1C5]" autoComplete={`section-${prefix} ${prefix} address-line2`} />
      </FormField>
      <FormField label="Town / City" required>
        <input type="text" name={name('city')} id={name('city')} placeholder="" className="input-text w-full h-10 px-3 rounded-lg border border-[#e5e7eb] font-primary text-[14px] outline-none focus:border-[#16A1C5]" autoComplete={`section-${prefix} ${prefix} address-level2`} />
      </FormField>
      <FormField label="District" optional>
        <input type="text" name={name('state')} id={name('state')} className="input-text w-full h-10 px-3 rounded-lg border border-[#e5e7eb] font-primary text-[14px] outline-none focus:border-[#16A1C5]" autoComplete={`section-${prefix} ${prefix} address-level1`} />
      </FormField>
      <FormField label="Postcode / ZIP" required>
        <input type="text" name={name('postcode')} id={name('postcode')} placeholder="" className="input-text w-full h-10 px-3 rounded-lg border border-[#e5e7eb] font-primary text-[14px] outline-none focus:border-[#16A1C5]" autoComplete={`section-${prefix} ${prefix} postal-code`} />
      </FormField>
      {prefix === 'billing' && (
        <>
          <FormField label="Phone" required>
            <input type="tel" name="billing_phone" id="billing_phone" placeholder="Phone" className="input-text w-full h-10 px-3 rounded-lg border border-[#e5e7eb] font-primary text-[14px] outline-none focus:border-[#16A1C5]" autoComplete="section-billing billing tel" />
          </FormField>
          <FormField label="Email Address" required>
            <input type="email" name="billing_email" id="billing_email" placeholder="Email Address" className="input-text w-full h-10 px-3 rounded-lg border border-[#e5e7eb] font-primary text-[14px] outline-none focus:border-[#16A1C5]" autoComplete="section-billing billing email" />
          </FormField>
        </>
      )}
    </>
  )
}

export interface OrderData {
  orderNumber: string
  date: string
  billing: { first_name: string; last_name: string; company: string; address_1: string; address_2: string; city: string; state: string; postcode: string; country: string; phone: string; email: string }
  shipping: { first_name: string; last_name: string; company: string; address_1: string; address_2: string; city: string; state: string; postcode: string; country: string }
  paymentMethod: string
  items: { slug: string; name: string; dosage: string; vial: string; quantity: number; price: number }[]
  subtotal: number
  shippingCost: number
  total: number
}

export default function CheckoutPage() {
  const navigate = useNavigate()
  const formRef = useRef<HTMLFormElement>(null)
  const { items, subtotal, total, couponDiscount, coupon, applyCoupon, clearCart } = useCart()
  const [showLogin, setShowLogin] = useState(false)
  const [showCoupon, setShowCoupon] = useState(false)
  const [shipToDifferent, setShipToDifferent] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('bacs')
  const [couponInput, setCouponInput] = useState('')
  const [placing, setPlacing] = useState(false)
  const [placeError, setPlaceError] = useState<string | null>(null)

  const totalWithShipping = total + SHIPPING_RATE

  async function handlePlaceOrder() {
    const form = formRef.current
    if (!form) return
    const fd = new FormData(form)
    const get = (name: string) => String(fd.get(name) ?? '')

    const billingEmail = get('billing_email')
    if (!get('billing_first_name') || !get('billing_last_name') || !billingEmail || !get('billing_address_1') || !get('billing_city') || !get('billing_postcode')) {
      setPlaceError('Please fill in all required billing fields.')
      return
    }

    const orderNumber = String(10000 + Math.floor(Math.random() * 90000))
    setPlacing(true)
    setPlaceError(null)

    const { error } = await createOrder({
      order_number: orderNumber,
      billing_first_name: get('billing_first_name'),
      billing_last_name: get('billing_last_name'),
      billing_company: get('billing_company'),
      billing_address_1: get('billing_address_1'),
      billing_address_2: get('billing_address_2'),
      billing_city: get('billing_city'),
      billing_state: get('billing_state'),
      billing_postcode: get('billing_postcode'),
      billing_country: get('billing_country') || 'RS',
      billing_phone: get('billing_phone'),
      billing_email: billingEmail,
      shipping_first_name: shipToDifferent ? get('shipping_first_name') : get('billing_first_name'),
      shipping_last_name: shipToDifferent ? get('shipping_last_name') : get('billing_last_name'),
      shipping_company: shipToDifferent ? get('shipping_company') : get('billing_company'),
      shipping_address_1: shipToDifferent ? get('shipping_address_1') : get('billing_address_1'),
      shipping_address_2: shipToDifferent ? get('shipping_address_2') : get('billing_address_2'),
      shipping_city: shipToDifferent ? get('shipping_city') : get('billing_city'),
      shipping_state: shipToDifferent ? get('shipping_state') : get('billing_state'),
      shipping_postcode: shipToDifferent ? get('shipping_postcode') : get('billing_postcode'),
      shipping_country: shipToDifferent ? (get('shipping_country') || 'RS') : (get('billing_country') || 'RS'),
      subtotal,
      shipping_cost: SHIPPING_RATE,
      coupon_code: coupon,
      coupon_discount: couponDiscount,
      total: totalWithShipping,
      payment_method: paymentMethod === 'bacs' ? 'Direct bank transfer' : 'Bitcoin',
      order_notes: get('order_comments'),
      items: items.map((i) => ({
        product_slug: i.slug,
        product_name: i.name,
        dosage: i.dosage,
        vial: i.vial,
        quantity: i.quantity,
        price: i.price,
        total: i.price * i.quantity,
      })),
    })

    setPlacing(false)

    if (error) {
      setPlaceError('Something went wrong. Please try again.')
      return
    }

    clearCart()
    navigate('/checkout/order-received', { state: { orderNumber } })
  }

  if (items.length === 0) {
    return (
      <>
        <ShopNav />
        <CheckoutHero />
        <section style={{ background: '#f8f9fb', padding: '50px 0 80px' }}>
          <div className="mx-auto text-center" style={{ maxWidth: 1320, padding: '0 20px' }}>
            <p className="font-primary text-[#6B7785] text-[16px] mb-6">Your cart is empty.</p>
            <Link to="/shop/" className="inline-block px-8 py-3 rounded-lg bg-[#16A1C5] text-white font-primary font-semibold text-[14px] hover:bg-[#1291b3] transition-colors">
              Continue Shopping
            </Link>
          </div>
        </section>
      </>
    )
  }

  return (
    <>
      <ShopNav />
      <CheckoutHero />

      <section style={{ background: '#f8f9fb', padding: '50px 0 80px' }}>
        <div className="mx-auto" style={{ maxWidth: 1320, padding: '0 20px' }}>
          <form ref={formRef} name="checkout" className="checkout font-primary" autoComplete="on">
            <div className="flex flex-col lg:flex-row gap-10">
              {/* Left column - Form */}
              <div className="flex-1">
                {/* Returning customer */}
                <div className="mb-8 p-6 rounded-xl bg-white border border-[#eef0f3]">
                  <p className="text-[#6B7785] text-[14px] mb-5">
                    Returning customer?{' '}
                    <button type="button" onClick={() => setShowLogin(!showLogin)} className="text-[#16A1C5] hover:underline">
                      Click here to login
                    </button>
                  </p>
                  {showLogin && (
                    <div className="space-y-4 pt-4 border-t border-[#e5e7eb]">
                      <p className="text-[#6B7785] text-[13px]">If you have shopped with us before, please enter your details below. If you are a new customer, please proceed to the Billing section.</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField label="Email" required>
                          <input type="text" name="username" id="username" autoComplete="username" className="input-text w-full h-10 px-3 rounded-lg border border-[#e5e7eb] font-primary text-[14px] outline-none focus:border-[#16A1C5]" />
                        </FormField>
                        <FormField label="Password" required>
                          <input type="password" name="password" id="password" autoComplete="current-password" className="input-text w-full h-10 px-3 rounded-lg border border-[#e5e7eb] font-primary text-[14px] outline-none focus:border-[#16A1C5]" />
                        </FormField>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="checkbox" name="rememberme" value="forever" className="w-4 h-4 rounded border-[#DBDFE5]" />
                          <span className="text-[14px] text-[#444B53]">Remember me</span>
                        </label>
                        <a href="#" className="text-[14px] text-[#16A1C5] hover:underline">Lost your password?</a>
                      </div>
                      <button type="button" className="h-10 px-6 rounded-lg bg-[#22282F] text-white font-primary font-semibold text-[14px] hover:bg-[#333a42] transition-colors">
                        Login
                      </button>
                    </div>
                  )}
                </div>

                {/* Billing Details */}
                <div className="mb-8 p-6 rounded-xl bg-white border border-[#eef0f3]">
                  <h3 className="font-semibold text-[18px] text-[#22282F] mb-1">Billing Details</h3>
                  <div className="space-y-4 mt-6">
                    <AddressFields prefix="billing" />
                  </div>
                </div>

                {/* Create account */}
                <div className="mb-8 p-6 rounded-xl bg-white border border-[#eef0f3]">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" name="createaccount" value="1" className="w-4 h-4 rounded border-[#DBDFE5]" />
                    <span className="text-[14px] text-[#444B53]">Create an account?</span>
                  </label>
                </div>

                {/* Ship to different address */}
                <div className="mb-8 p-6 rounded-xl bg-white border border-[#eef0f3]">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={shipToDifferent} onChange={(e) => setShipToDifferent(e.target.checked)} className="w-4 h-4 rounded border-[#DBDFE5]" />
                    <span className="text-[14px] text-[#444B53] font-medium">Ship to a different address?</span>
                  </label>
                  {shipToDifferent && (
                    <div className="mt-6 pt-6 border-t border-[#e5e7eb] space-y-4">
                      <AddressFields prefix="shipping" />
                    </div>
                  )}
                </div>

                {/* Order notes */}
                <div className="mb-8 p-6 rounded-xl bg-white border border-[#eef0f3]">
                  <FormField label="Order notes" optional>
                    <textarea name="order_comments" id="order_comments" placeholder="Notes about your order, e.g. special notes for delivery." rows={3} className="input-text w-full px-3 py-2 rounded-lg border border-[#e5e7eb] font-primary text-[14px] outline-none focus:border-[#16A1C5] resize-none" />
                  </FormField>
                </div>
              </div>

              {/* Right column - Order Summary */}
              <div className="lg:w-[400px] shrink-0">
                <div className="sticky top-24 p-6 rounded-xl bg-white border border-[#eef0f3]">
                  <h3 className="font-semibold text-[18px] text-[#22282F] mb-6">Your Order</h3>

                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-[#e5e7eb]">
                        <th className="text-left py-3 font-semibold text-[13px] text-[#22282F]">Product</th>
                        <th className="text-right py-3 font-semibold text-[13px] text-[#22282F]">Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item) => (
                        <tr key={`${item.slug}-${item.dosage}-${item.vial}`} className="border-b border-[#e5e7eb]">
                          <td className="py-3 text-[14px] text-[#444B53]">
                            {item.name} - {item.dosage}, {item.vial}
                            <strong className="text-[#22282F]"> × {item.quantity}</strong>
                          </td>
                          <td className="py-3 text-right font-semibold text-[14px] text-[#22282F]">
                            ${(item.price * item.quantity).toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="border-b border-[#e5e7eb]">
                        <th className="py-3 text-left font-semibold text-[14px] text-[#22282F]">Subtotal</th>
                        <td className="py-3 text-right font-semibold text-[14px] text-[#22282F]">${subtotal.toFixed(2)}</td>
                      </tr>
                      {coupon && couponDiscount > 0 && (
                        <tr className="border-b border-[#e5e7eb]">
                          <th className="py-3 text-left font-semibold text-[14px] text-[#22282F]">Coupon ({coupon})</th>
                          <td className="py-3 text-right text-[14px] text-[#16A1C5]">-${couponDiscount.toFixed(2)}</td>
                        </tr>
                      )}
                      <tr className="border-b border-[#e5e7eb]">
                        <th className="py-3 text-left font-semibold text-[14px] text-[#22282F]">Shipment 1</th>
                        <td className="py-3 text-right text-[14px] text-[#444B53]">
                          <label className="flex items-center justify-end gap-2 cursor-pointer">
                            <input type="radio" name="shipping_method" value="flat_rate" defaultChecked className="w-4 h-4" />
                            Flat rate: <span className="font-semibold text-[#22282F]">${SHIPPING_RATE.toFixed(2)}</span>
                          </label>
                        </td>
                      </tr>
                      <tr>
                        <th className="py-4 text-left font-semibold text-[16px] text-[#22282F]">Total</th>
                        <td className="py-4 text-right font-bold text-[16px] text-[#22282F]">${totalWithShipping.toFixed(2)}</td>
                      </tr>
                    </tfoot>
                  </table>

                  {/* Coupon */}
                  <div className="mt-6 pt-6 border-t border-[#e5e7eb]">
                    <p className="text-[#6B7785] text-[14px]">
                      Have a coupon?{' '}
                      <button type="button" onClick={() => setShowCoupon(!showCoupon)} className="text-[#16A1C5] hover:underline">
                        Click here to enter your code
                      </button>
                    </p>
                    {showCoupon && (
                      <div className="mt-4 flex gap-2">
                        <input
                          type="text"
                          placeholder="Coupon code"
                          value={couponInput}
                          onChange={(e) => setCouponInput(e.target.value)}
                          className="flex-1 h-10 px-3 rounded-lg border border-[#e5e7eb] font-primary text-[14px] outline-none focus:border-[#16A1C5]"
                        />
                        <button
                          type="button"
                          onClick={() => applyCoupon(couponInput)}
                          className="h-10 px-6 rounded-lg bg-[#22282F] text-white font-primary font-semibold text-[14px] hover:bg-[#333a42] transition-colors"
                        >
                          Apply
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Payment methods */}
                  <div className="mt-6 pt-6 border-t border-[#e5e7eb]">
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3">
                        <input type="radio" name="payment_method" id="payment_bacs" value="bacs" checked={paymentMethod === 'bacs'} onChange={() => setPaymentMethod('bacs')} className="mt-1 w-4 h-4" />
                        <label htmlFor="payment_bacs" className="flex-1 cursor-pointer">
                          <span className="font-semibold text-[14px] text-[#22282F]">Direct bank transfer</span>
                          <div className="mt-2 p-4 rounded-lg bg-[#f8f9fb] text-[13px] text-[#6B7785] leading-relaxed">
                            <p>Please use ONLY your Order Number as the payment reference.</p>
                            <p className="mt-2">⚠️ Sparkasse Customers: Transfers to Revolut are often blocked by automated security filters. If your payment is rejected, please simply instruct your bank to authorize the transaction.</p>
                          </div>
                        </label>
                      </li>
                      <li className="flex items-start gap-3">
                        <input type="radio" name="payment_method" id="payment_blockonomics" value="blockonomics" checked={paymentMethod === 'blockonomics'} onChange={() => setPaymentMethod('blockonomics')} className="mt-1 w-4 h-4" />
                        <label htmlFor="payment_blockonomics" className="flex items-center gap-2 cursor-pointer">
                          <span className="font-semibold text-[14px] text-[#22282F]">Bitcoin</span>
                          <img src="https://beyond-peptides.com/wp-content/plugins/blockonomics-bitcoin-payments/img/logo.png" alt="Bitcoin" className="h-9 w-auto" />
                        </label>
                      </li>
                    </ul>
                  </div>

                  {/* Privacy */}
                  <div className="mt-6 pt-6 border-t border-[#e5e7eb]">
                    <p className="text-[12px] text-[#6B7785] leading-relaxed mb-4">
                      Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our{' '}
                      <a href="#" className="text-[#16A1C5] hover:underline">privacy policy</a>.
                    </p>
                    {placeError && (
                      <p className="mb-4 text-[13px] text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3">{placeError}</p>
                    )}
                    <button
                      type="button"
                      onClick={handlePlaceOrder}
                      disabled={placing}
                      className="w-full h-12 rounded-lg bg-[#16A1C5] text-white font-primary font-bold text-[15px] hover:bg-[#1291b3] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {placing ? 'Placing order…' : 'Place order'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  )
}
