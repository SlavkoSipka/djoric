import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { pdf } from '@react-pdf/renderer'
import ShopNav from '../components/ShopNav'
import { getCountryName } from '../data/countries'
import { fetchOrderByNumber, type OrderWithItems } from '../lib/supabase'
import { InvoicePDF } from '../components/InvoicePDF'

function OrderReceivedHero() {
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
        style={{ maxWidth: 1320, paddingTop: 50, paddingBottom: 70 }}
      >
        <nav className="flex items-center gap-1.5 mb-5">
          <Link to="/" className="font-primary text-[13px] transition-colors hover:text-white" style={{ color: 'rgba(255,255,255,0.6)' }}>Home</Link>
          <ChevronRight className="w-3 h-3" style={{ color: 'rgba(255,255,255,0.4)' }} />
          <Link to="/shop/" className="font-primary text-[13px] transition-colors hover:text-white" style={{ color: 'rgba(255,255,255,0.6)' }}>Shop</Link>
          <ChevronRight className="w-3 h-3" style={{ color: 'rgba(255,255,255,0.4)' }} />
          <Link to="/checkout/" className="font-primary text-[13px] transition-colors hover:text-white" style={{ color: 'rgba(255,255,255,0.6)' }}>Checkout</Link>
          <ChevronRight className="w-3 h-3" style={{ color: 'rgba(255,255,255,0.4)' }} />
          <span className="font-primary text-[13px]" style={{ color: 'rgba(255,255,255,0.9)' }}>Order Received</span>
        </nav>

        <h1 className="font-primary font-bold" style={{ fontSize: 'clamp(36px, 5vw, 56px)', lineHeight: 1.1, color: '#fff', marginBottom: 16 }}>
          Order Received
        </h1>

        <p className="font-primary" style={{ fontSize: 16, color: 'rgba(255,255,255,0.65)', maxWidth: 500, lineHeight: 1.6 }}>
          Thank you for your order.
        </p>
      </div>
    </section>
  )
}

function addressLines(o: OrderWithItems, prefix: 'billing' | 'shipping') {
  const g = (k: string) => ((o as unknown as Record<string, string | null>)[`${prefix}_${k}`]) ?? ''
  const lines: string[] = []
  lines.push(`${g('first_name')} ${g('last_name')}`.trim())
  if (g('company')) lines.push(g('company'))
  if (g('address_1')) lines.push(g('address_1'))
  if (g('address_2')) lines.push(g('address_2'))
  const cityLine = `${g('postcode')} ${g('city')}`.trim()
  if (cityLine) lines.push(cityLine)
  if (g('country')) lines.push(getCountryName(g('country')))
  return lines
}

function formatDate(ts: string) {
  return new Date(ts).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default function OrderReceivedPage() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const orderNumber: string | undefined = state?.orderNumber

  const [order, setOrder] = useState<OrderWithItems | null>(null)
  const [loading, setLoading] = useState(true)
  const [fetchError, setFetchError] = useState<string | null>(null)
  const [pdfGenerating, setPdfGenerating] = useState(false)

  async function downloadInvoice(o: OrderWithItems) {
    setPdfGenerating(true)
    try {
      const blob = await pdf(<InvoicePDF order={o} />).toBlob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `invoice-${o.order_number}.pdf`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (e) {
      console.error('PDF generation failed:', e)
    } finally {
      setPdfGenerating(false)
    }
  }

  useEffect(() => {
    if (!orderNumber) {
      navigate('/checkout/', { replace: true })
      return
    }
    fetchOrderByNumber(orderNumber).then(({ order: o, error }) => {
      setLoading(false)
      if (error || !o) {
        setFetchError(error ?? 'Order not found')
      } else {
        setOrder(o)
      }
    })
  }, [orderNumber, navigate])

  const showBankDetails = order?.payment_method === 'Direct bank transfer'

  return (
    <>
      <ShopNav />
      <OrderReceivedHero />
      <section style={{ background: '#f8f9fb', padding: '50px 0 80px' }}>
        <div className="woocommerce font-primary mx-auto" style={{ maxWidth: 1320, padding: '0 20px' }}>
          {loading && (
            <div className="flex justify-center py-20">
              <div className="w-8 h-8 rounded-full border-4 border-[#16A1C5] border-t-transparent animate-spin" />
            </div>
          )}

          {fetchError && (
            <p className="text-red-600 text-center py-10">{fetchError}</p>
          )}

          {order && (
            <div className="woocommerce-order">
              <p className="woocommerce-notice woocommerce-notice--success text-[#16A1C5] font-semibold text-[16px] mb-6">
                Thank you. Your order has been received.
              </p>

              {/* Order overview */}
              <ul className="woocommerce-order-overview flex flex-wrap gap-x-8 gap-y-3 mb-8 p-6 rounded-xl bg-white border border-[#eef0f3] list-none text-[14px] text-[#444B53]">
                <li>Order number: <strong className="text-[#22282F]">{order.order_number}</strong></li>
                <li>Date: <strong className="text-[#22282F]">{formatDate(order.created_at)}</strong></li>
                <li>Email: <strong className="text-[#22282F]">{order.billing_email}</strong></li>
                <li>Total: <strong className="text-[#22282F]">USD ${Number(order.total).toFixed(2)}</strong></li>
                <li>Payment method: <strong className="text-[#22282F]">{order.payment_method}</strong></li>
              </ul>

              {/* Bank details */}
              {showBankDetails && (
                <>
                  <p className="text-[#444B53] text-[14px] mb-2">
                    Please pay now so we can send out your order soon, and use ONLY your Order ID as the payment reference – NOTHING ELSE!!!
                  </p>
                  <p className="text-[#444B53] text-[14px] mb-6">
                    ⚠️ Sparkasse Customers: Transfers to Revolut are often blocked by automated security filters. If your payment is rejected, please simply instruct your bank to authorize the transaction. Don't worry – this is a standard procedure and resolves the issue immediately without any further problems.
                  </p>
                  <section className="woocommerce-bacs-bank-details mb-8 p-6 rounded-xl bg-white border border-[#eef0f3]">
                    <h2 className="font-semibold text-[18px] text-[#22282F] mb-4">Our bank details</h2>
                    <h3 className="font-semibold text-[15px] text-[#444B53] mb-3">BP RESEARCH SP Z O O:</h3>
                    <ul className="list-none space-y-2 text-[14px] text-[#444B53]">
                      <li>Bank: <strong>Revolut Bank UAB</strong></li>
                      <li>IBAN: <strong>LT27 3250 0184 5865 4062</strong></li>
                      <li>BIC: <strong>REVOLT21</strong></li>
                    </ul>
                  </section>
                </>
              )}

              {/* Order details table */}
              <section className="woocommerce-order-details mb-8 p-6 rounded-xl bg-white border border-[#eef0f3]">
                <h2 className="font-semibold text-[18px] text-[#22282F] mb-6">Order details</h2>
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#e5e7eb]">
                      <th className="text-left py-3 font-semibold text-[14px] text-[#22282F]">Product</th>
                      <th className="text-right py-3 font-semibold text-[14px] text-[#22282F]">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.order_items.map((item) => (
                      <tr key={item.id} className="border-b border-[#e5e7eb]">
                        <td className="py-3 text-[14px] text-[#444B53]">
                          <Link to={`/product/${item.product_slug}`} className="text-[#16A1C5] hover:underline">
                            {item.product_name} - {item.dosage}, {item.vial}
                          </Link>{' '}
                          <strong className="text-[#22282F]">× {item.quantity}</strong>
                        </td>
                        <td className="py-3 text-right font-semibold text-[14px] text-[#22282F]">
                          USD ${Number(item.total).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="border-b border-[#e5e7eb]">
                      <th className="text-left py-3 font-semibold text-[14px] text-[#22282F]">Actions:</th>
                      <td className="py-3">
                        <button
                          type="button"
                          onClick={() => downloadInvoice(order)}
                          disabled={pdfGenerating}
                          className="inline-block px-4 py-2 rounded-lg bg-[#22282F] text-white font-primary font-semibold text-[13px] hover:bg-[#333a42] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                          {pdfGenerating ? 'Generating…' : 'Invoice'}
                        </button>
                      </td>
                    </tr>
                    <tr className="border-b border-[#e5e7eb]">
                      <th scope="row" className="text-left py-3 font-semibold text-[14px] text-[#22282F]">Subtotal:</th>
                      <td className="py-3 text-right text-[14px] text-[#444B53]">USD ${Number(order.subtotal).toFixed(2)}</td>
                    </tr>
                    {order.coupon_code && Number(order.coupon_discount) > 0 && (
                      <tr className="border-b border-[#e5e7eb]">
                        <th scope="row" className="text-left py-3 font-semibold text-[14px] text-[#22282F]">Coupon ({order.coupon_code}):</th>
                        <td className="py-3 text-right text-[14px] text-[#16A1C5]">-${Number(order.coupon_discount).toFixed(2)}</td>
                      </tr>
                    )}
                    <tr className="border-b border-[#e5e7eb]">
                      <th scope="row" className="text-left py-3 font-semibold text-[14px] text-[#22282F]">Shipping:</th>
                      <td className="py-3 text-right text-[14px] text-[#444B53]">
                        ${Number(order.shipping_cost).toFixed(2)} <small className="text-[#6B7785]">via Flat rate</small>
                      </td>
                    </tr>
                    <tr className="border-b border-[#e5e7eb]">
                      <th scope="row" className="text-left py-3 font-semibold text-[14px] text-[#22282F]">Payment method:</th>
                      <td className="py-3 text-right text-[14px] text-[#444B53]">{order.payment_method}</td>
                    </tr>
                    <tr>
                      <th scope="row" className="text-left py-4 font-semibold text-[16px] text-[#22282F]">Total:</th>
                      <td className="py-4 text-right font-bold text-[16px] text-[#22282F]">USD ${Number(order.total).toFixed(2)}</td>
                    </tr>
                  </tfoot>
                </table>
              </section>

              {/* Customer details */}
              <section className="woocommerce-customer-details mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 rounded-xl bg-white border border-[#eef0f3]">
                    <h2 className="font-semibold text-[18px] text-[#22282F] mb-4">Billing address</h2>
                    <address className="text-[14px] text-[#444B53] not-italic leading-relaxed">
                      {addressLines(order, 'billing').map((line, i, arr) => (
                        <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
                      ))}
                      {order.billing_phone && <p className="mt-2">{order.billing_phone}</p>}
                      {order.billing_email && <p>{order.billing_email}</p>}
                    </address>
                  </div>

                  <div className="p-6 rounded-xl bg-white border border-[#eef0f3]">
                    <h2 className="font-semibold text-[18px] text-[#22282F] mb-4">Shipping address</h2>
                    <address className="text-[14px] text-[#444B53] not-italic leading-relaxed">
                      {addressLines(order, 'shipping').map((line, i, arr) => (
                        <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
                      ))}
                    </address>
                  </div>
                </div>
              </section>

              {order.order_notes && (
                <div className="mb-8 p-6 rounded-xl bg-white border border-[#eef0f3]">
                  <h2 className="font-semibold text-[16px] text-[#22282F] mb-2">Order notes</h2>
                  <p className="text-[14px] text-[#444B53]">{order.order_notes}</p>
                </div>
              )}

              <div className="text-center">
                <Link to="/shop/" className="inline-block px-8 py-3 rounded-lg bg-[#16A1C5] text-white font-primary font-semibold text-[14px] hover:bg-[#1291b3] transition-colors">
                  Continue Shopping
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
