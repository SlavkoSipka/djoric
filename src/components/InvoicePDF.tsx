import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'
import type { OrderWithItems } from '../lib/supabase'
import { getCountryName } from '../data/countries'

// Uses built-in PDF fonts only – no external resources that can block rendering
const C = {
  blue: '#0a9edd',
  darkBlue: '#004974',
  dark: '#22282F',
  mid: '#444B53',
  muted: '#6B7785',
  border: '#e5e7eb',
  bg: '#f8f9fb',
  orange: '#f59e0b',
  orangeBg: '#fffbeb',
  orangeBorder: '#fde68a',
  infoBg: '#eff6ff',
  infoBorder: '#bfdbfe',
  white: '#ffffff',
  logoBlue: '#0a9edd',
}

const s = StyleSheet.create({
  page: { fontFamily: 'Helvetica', fontSize: 9, color: C.dark, paddingHorizontal: 44, paddingTop: 36, paddingBottom: 50 },

  // Logo / header
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 18 },
  logoWrap: { flexDirection: 'column' },
  logoBig: { fontFamily: 'Helvetica-Bold', fontSize: 20, color: C.logoBlue, letterSpacing: 0.5 },
  logoSub: { fontSize: 7, color: C.muted, marginTop: 1 },
  companyBox: { alignItems: 'flex-end', maxWidth: 230 },
  companyName: { fontFamily: 'Helvetica-Bold', fontSize: 9.5, color: C.dark, marginBottom: 2 },
  companyLine: { fontSize: 7.5, color: C.muted, textAlign: 'right', lineHeight: 1.55 },

  // Divider
  dividerThick: { borderBottomWidth: 2, borderBottomColor: C.blue, marginBottom: 14 },
  dividerThin: { borderBottomWidth: 0.5, borderBottomColor: C.border, marginVertical: 10 },

  // Invoice title
  invoiceTitle: { fontFamily: 'Helvetica-Bold', fontSize: 26, color: C.darkBlue, textAlign: 'center', marginBottom: 3 },
  invoiceMeta: { textAlign: 'center', fontSize: 8.5, color: C.muted, marginBottom: 14 },

  // Layout
  row: { flexDirection: 'row', gap: 16 },
  col: { flex: 1 },

  // Address
  sectionLabel: { fontFamily: 'Helvetica-Bold', fontSize: 7.5, color: C.blue, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 4 },
  addrName: { fontFamily: 'Helvetica-Bold', fontSize: 9, color: C.dark, lineHeight: 1.55 },
  addrLine: { fontSize: 8.5, color: C.mid, lineHeight: 1.55 },

  // Meta
  metaRow: { flexDirection: 'row', marginBottom: 4 },
  metaLabel: { fontSize: 8.5, color: C.muted, width: 100 },
  metaValue: { fontFamily: 'Helvetica-Bold', fontSize: 8.5, color: C.dark, flex: 1 },

  // Warning
  warningBox: { backgroundColor: C.orangeBg, borderWidth: 1, borderColor: C.orangeBorder, borderRadius: 4, padding: 10, marginTop: 14, flexDirection: 'row', alignItems: 'center', gap: 6 },
  warningText: { fontFamily: 'Helvetica-Bold', fontSize: 10, color: '#92400e' },

  // Bank details
  bankBox: { backgroundColor: C.infoBg, borderWidth: 1, borderColor: C.infoBorder, borderRadius: 4, padding: 12, marginTop: 10 },
  bankHighlight: { fontFamily: 'Helvetica-Bold', fontSize: 11, color: C.darkBlue, marginBottom: 9 },
  bankRow: { flexDirection: 'row', marginBottom: 4 },
  bankLabel: { fontSize: 8.5, color: C.muted, width: 105 },
  bankValue: { fontFamily: 'Helvetica-Bold', fontSize: 8.5, color: C.dark, flex: 1 },
  bankOrderNum: { fontFamily: 'Helvetica-Bold', fontSize: 9, color: C.darkBlue, flex: 1 },
  bankNote: { fontSize: 7.5, color: C.muted, marginTop: 6, lineHeight: 1.5 },
  sparkasseWrap: { borderLeftWidth: 2.5, borderLeftColor: C.blue, paddingLeft: 8, paddingVertical: 5, marginTop: 7, backgroundColor: '#f0f9ff' },
  sparkasseTitle: { fontFamily: 'Helvetica-Bold', fontSize: 7.5, color: C.mid, marginBottom: 2 },
  sparkasseText: { fontSize: 7.5, color: C.mid, lineHeight: 1.6 },

  // Table
  tableHeaderRow: { flexDirection: 'row', backgroundColor: C.darkBlue, paddingVertical: 7, paddingHorizontal: 8, borderRadius: 3 },
  tableHeaderText: { fontFamily: 'Helvetica-Bold', fontSize: 8.5, color: C.white },
  tableRowEven: { flexDirection: 'row', paddingVertical: 8, paddingHorizontal: 8, backgroundColor: C.white, borderBottomWidth: 0.5, borderBottomColor: C.border },
  tableRowOdd: { flexDirection: 'row', paddingVertical: 8, paddingHorizontal: 8, backgroundColor: '#fafafa', borderBottomWidth: 0.5, borderBottomColor: C.border },
  colProduct: { flex: 1 },
  colHs: { width: 72 },
  colQty: { width: 36, textAlign: 'center' },
  colPrice: { width: 74, textAlign: 'right' },
  productName: { fontFamily: 'Helvetica-Bold', fontSize: 9, color: C.dark, marginBottom: 2 },
  productDetail: { fontSize: 7.5, color: C.muted, lineHeight: 1.5 },
  productBadge: { fontSize: 7, color: C.blue },

  // Totals
  totalsBlock: { marginTop: 14, alignItems: 'flex-end' },
  totalsInner: { width: 250 },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 3 },
  totalLabelMuted: { fontSize: 8.5, color: C.muted },
  totalValueMuted: { fontSize: 8.5, color: C.mid },
  totalDivider: { borderTopWidth: 1, borderTopColor: C.border, marginVertical: 5 },
  totalLabelBold: { fontFamily: 'Helvetica-Bold', fontSize: 11, color: C.dark },
  totalValueBold: { fontFamily: 'Helvetica-Bold', fontSize: 11, color: C.darkBlue },

  // Footer
  footerLine: { position: 'absolute', bottom: 36, left: 44, right: 44, borderTopWidth: 0.5, borderTopColor: C.border },
  pageNum: { position: 'absolute', bottom: 18, left: 0, right: 0, textAlign: 'center', fontSize: 7.5, color: C.muted },
})

function addrLines(o: OrderWithItems, prefix: 'billing' | 'shipping'): string[] {
  const g = (k: string) => ((o as unknown as Record<string, string | null>)[`${prefix}_${k}`]) ?? ''
  const lines: string[] = []
  const name = `${g('first_name')} ${g('last_name')}`.trim()
  if (name) lines.push(name)
  if (g('company')) lines.push(g('company'))
  if (g('address_1')) lines.push(g('address_1'))
  if (g('address_2')) lines.push(g('address_2'))
  const cityLine = `${g('postcode')} ${g('city')}`.trim()
  if (cityLine) lines.push(cityLine)
  if (g('country')) lines.push(getCountryName(g('country')))
  return lines
}

function fmtDate(ts: string) {
  return new Date(ts).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

const HS_CODE = '2937.19.00'

export function InvoicePDF({ order }: { order: OrderWithItems }) {
  const billing = addrLines(order, 'billing')
  const shipping = addrLines(order, 'shipping')
  const isBacs = order.payment_method === 'Direct bank transfer'

  return (
    <Document title={`Invoice-${order.order_number}`} author="Beyond Peptides">

      {/* ═══════════════════ PAGE 1 ═══════════════════ */}
      <Page size="A4" style={s.page}>

        {/* Header */}
        <View style={s.headerRow}>
          <View style={s.logoWrap}>
            <Text style={s.logoBig}>Beyond Peptides</Text>
            <Text style={s.logoSub}>beyond-peptides.com</Text>
          </View>
          <View style={s.companyBox}>
            <Text style={s.companyName}>BP RESEARCH Sp. z o.o.</Text>
            <Text style={s.companyLine}>ul. Młyńska 16 (8th Floor), 61-730 Poznań, Poland</Text>
            <Text style={s.companyLine}>contact@beyond-peptides.com</Text>
            <Text style={s.companyLine}>NIP: 7831913422 | EU-VAT: PL7831913422 | KRS: 0001130178</Text>
          </View>
        </View>

        <View style={s.dividerThick} />

        <Text style={s.invoiceTitle}>Invoice</Text>
        <Text style={s.invoiceMeta}>Invoice: {order.order_number}    Order #: {order.order_number}</Text>

        <View style={s.dividerThin} />

        {/* Addresses + meta */}
        <View style={s.row}>
          <View style={[s.col, { paddingRight: 14 }]}>
            <Text style={s.sectionLabel}>Billing to:</Text>
            {billing.map((line, i) => (
              <Text key={i} style={i === 0 ? s.addrName : s.addrLine}>{line}</Text>
            ))}
            {!!order.billing_phone && <Text style={[s.addrLine, { marginTop: 3 }]}>{order.billing_phone}</Text>}

            <View style={{ marginTop: 14 }}>
              <Text style={s.sectionLabel}>Shipping to:</Text>
              {shipping.map((line, i) => (
                <Text key={i} style={i === 0 ? s.addrName : s.addrLine}>{line}</Text>
              ))}
            </View>
          </View>

          <View style={{ width: 200 }}>
            <View style={s.metaRow}><Text style={s.metaLabel}>Invoice Date:</Text><Text style={s.metaValue}>{fmtDate(order.created_at)}</Text></View>
            <View style={s.metaRow}><Text style={s.metaLabel}>Order Date:</Text><Text style={s.metaValue}>{fmtDate(order.created_at)}</Text></View>
            <View style={s.metaRow}><Text style={s.metaLabel}>Payment Method:</Text><Text style={s.metaValue}>{order.payment_method}</Text></View>
          </View>
        </View>

        {/* Warning */}
        <View style={s.warningBox}>
          <Text style={s.warningText}>⚠  PAYMENT REQUIRED WITHIN 3 DAYS</Text>
        </View>

        {/* Bank details */}
        {isBacs && (
          <View style={s.bankBox}>
            <Text style={s.bankHighlight}>Total to Pay: USD ${Number(order.total).toFixed(2)}</Text>
            <View style={s.bankRow}><Text style={s.bankLabel}>Beneficiary:</Text><Text style={s.bankValue}>BP RESEARCH SP Z O O</Text></View>
            <View style={s.bankRow}><Text style={s.bankLabel}>Bank:</Text><Text style={s.bankValue}>Revolut Bank UAB</Text></View>
            <View style={s.bankRow}><Text style={s.bankLabel}>IBAN:</Text><Text style={s.bankValue}>LT27 3250 0184 5865 4062</Text></View>
            <View style={s.bankRow}><Text style={s.bankLabel}>BIC / SWIFT:</Text><Text style={s.bankValue}>REVOLT21</Text></View>
            <View style={[s.bankRow, { marginTop: 4 }]}>
              <Text style={s.bankLabel}>Use Order # ONLY:</Text>
              <Text style={s.bankOrderNum}>{order.order_number}</Text>
            </View>
            <Text style={s.bankNote}>* Transfers from OUTSIDE EU/EEA must use Intermediary BIC: CHASDEFX</Text>
            <View style={s.sparkasseWrap}>
              <Text style={s.sparkasseTitle}>Important for Sparkasse Customers:</Text>
              <Text style={s.sparkasseText}>Transfers to Revolut are sometimes blocked by automated security filters. If your payment is rejected, please instruct your bank to release the transaction manually.</Text>
              <Text style={[s.sparkasseText, { marginTop: 3 }]}>Problems with payment? Email us: contact@beyond-peptides.com</Text>
            </View>
          </View>
        )}

        <View style={s.footerLine} fixed />
        <Text style={s.pageNum} render={({ pageNumber, totalPages }) => `– ${pageNumber} of ${totalPages} –`} fixed />
      </Page>

      {/* ═══════════════════ PAGE 2 ═══════════════════ */}
      <Page size="A4" style={s.page}>

        {/* Table header */}
        <View style={s.tableHeaderRow}>
          <Text style={[s.tableHeaderText, s.colProduct]}>Product</Text>
          <Text style={[s.tableHeaderText, s.colHs]}>HS Code</Text>
          <Text style={[s.tableHeaderText, s.colQty]}>Quantity</Text>
          <Text style={[s.tableHeaderText, s.colPrice]}>Price</Text>
        </View>

        {/* Items */}
        {order.order_items.map((item, idx) => (
          <View key={item.id} style={idx % 2 === 0 ? s.tableRowEven : s.tableRowOdd}>
            <View style={s.colProduct}>
              <Text style={s.productName}>{item.product_name} - {item.dosage}, {item.vial}</Text>
              <Text style={s.productDetail}>Origin: Poland</Text>
              {!!item.dosage && <Text style={s.productDetail}>Dosages: {item.dosage}</Text>}
              {!!item.vial && <Text style={s.productDetail}>Vial: {item.vial}</Text>}
              <Text style={s.productBadge}>Research use only</Text>
            </View>
            <Text style={[s.colHs, { fontSize: 8.5, color: C.muted, paddingTop: 1 }]}>{HS_CODE}</Text>
            <Text style={[s.colQty, { fontSize: 8.5, paddingTop: 1 }]}>{item.quantity}</Text>
            <Text style={[s.colPrice, { fontSize: 8.5, paddingTop: 1 }]}>USD ${Number(item.price).toFixed(2)}</Text>
          </View>
        ))}

        {/* Totals */}
        <View style={s.totalsBlock}>
          <View style={s.totalsInner}>
            <View style={s.totalRow}>
              <Text style={s.totalLabelMuted}>Subtotal</Text>
              <Text style={s.totalValueMuted}>USD ${Number(order.subtotal).toFixed(2)}</Text>
            </View>
            {Number(order.coupon_discount) > 0 && (
              <View style={s.totalRow}>
                <Text style={s.totalLabelMuted}>Coupon{order.coupon_code ? ` (${order.coupon_code})` : ''}</Text>
                <Text style={[s.totalValueMuted, { color: C.blue }]}>-${Number(order.coupon_discount).toFixed(2)}</Text>
              </View>
            )}
            <View style={s.totalRow}>
              <Text style={s.totalLabelMuted}>Shipping</Text>
              <Text style={s.totalValueMuted}>${Number(order.shipping_cost).toFixed(2)} via Flat rate</Text>
            </View>
            <View style={s.totalDivider} />
            <View style={s.totalRow}>
              <Text style={s.totalLabelBold}>Total</Text>
              <Text style={s.totalValueBold}>USD ${Number(order.total).toFixed(2)}</Text>
            </View>
          </View>
        </View>

        <View style={s.footerLine} fixed />
        <Text style={s.pageNum} render={({ pageNumber, totalPages }) => `– ${pageNumber} of ${totalPages} –`} fixed />
      </Page>
    </Document>
  )
}
