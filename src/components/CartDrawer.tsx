import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4.1518 4.31359L4.22676 4.22676C4.50161 3.9519 4.93172 3.92691 5.2348 4.1518L5.32163 4.22676L12 10.9048L18.6784 4.22676C18.9807 3.92441 19.4709 3.92441 19.7732 4.22676C20.0756 4.5291 20.0756 5.01929 19.7732 5.32163L13.0952 12L19.7732 18.6784C20.0481 18.9532 20.0731 19.3833 19.8482 19.6864L19.7732 19.7732C19.4984 20.0481 19.0683 20.0731 18.7652 19.8482L18.6784 19.7732L12 13.0952L5.32163 19.7732C5.01929 20.0756 4.5291 20.0756 4.22676 19.7732C3.92441 19.4709 3.92441 18.9807 4.22676 18.6784L10.9048 12L4.22676 5.32163C3.9519 5.04678 3.92691 4.61667 4.1518 4.31359L4.22676 4.22676L4.1518 4.31359Z" fill="currentColor" />
    </svg>
  )
}

function SmallCloseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4.1518 4.31359L4.22676 4.22676C4.50161 3.9519 4.93172 3.92691 5.2348 4.1518L5.32163 4.22676L12 10.9048L18.6784 4.22676C18.9807 3.92441 19.4709 3.92441 19.7732 4.22676C20.0756 4.5291 20.0756 5.01929 19.7732 5.32163L13.0952 12L19.7732 18.6784C20.0481 18.9532 20.0731 19.3833 19.8482 19.6864L19.7732 19.7732C19.4984 20.0481 19.0683 20.0731 18.7652 19.8482L18.6784 19.7732L12 13.0952L5.32163 19.7732C5.01929 20.0756 4.5291 20.0756 4.22676 19.7732C3.92441 19.4709 3.92441 18.9807 4.22676 18.6784L10.9048 12L4.22676 5.32163C3.9519 5.04678 3.92691 4.61667 4.1518 4.31359L4.22676 4.22676L4.1518 4.31359Z" fill="currentColor" />
    </svg>
  )
}

function MinusIcon() {
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 20 20" width="14" height="14">
      <path fill="currentColor" d="M17.543 11.029H2.1A1.032 1.032 0 0 1 1.071 10c0-.566.463-1.029 1.029-1.029h15.443c.566 0 1.029.463 1.029 1.029 0 .566-.463 1.029-1.029 1.029z" />
    </svg>
  )
}

function PlusIcon() {
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 20 20" width="14" height="14">
      <path fill="currentColor" d="M17.409 8.929h-6.695V2.258c0-.566-.506-1.029-1.071-1.029s-1.071.463-1.071 1.029v6.671H1.967C1.401 8.929.938 9.435.938 10s.463 1.071 1.029 1.071h6.605V17.7c0 .566.506 1.029 1.071 1.029s1.071-.463 1.071-1.029v-6.629h6.695c.566 0 1.029-.506 1.029-1.071s-.463-1.071-1.029-1.071z" />
    </svg>
  )
}

function CartBagIcon() {
  return (
    <svg width="56" height="56" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 2.71411C2 2.31972 2.31972 2 2.71411 2H3.34019C4.37842 2 4.97454 2.67566 5.31984 3.34917C5.55645 3.8107 5.72685 4.37375 5.86764 4.86133H20.5709C21.5186 4.86133 22.2035 5.7674 21.945 6.67914L19.809 14.2123C19.4606 15.4413 18.3384 16.2896 17.0609 16.2896H9.80665C8.51866 16.2896 7.39 15.4276 7.05095 14.185L6.13344 10.8225C6.12779 10.8073 6.12262 10.7917 6.11795 10.7758L4.64782 5.78023C4.59738 5.61449 4.55096 5.45386 4.50614 5.29878C4.36354 4.80529 4.23716 4.36794 4.04891 4.00075C3.82131 3.55681 3.61232 3.42822 3.34019 3.42822H2.71411C2.31972 3.42822 2 3.1085 2 2.71411ZM7.49529 10.3874L8.4288 13.8091C8.59832 14.4304 9.16266 14.8613 9.80665 14.8613H17.0609C17.6997 14.8613 18.2608 14.4372 18.435 13.8227L20.5709 6.28955H6.28975L7.49529 10.3874ZM12.0017 19.8577C12.0017 21.0408 11.0426 22 9.85941 22C8.67623 22 7.71708 21.0408 7.71708 19.8577C7.71708 18.6745 8.67623 17.7153 9.85941 17.7153C11.0426 17.7153 12.0017 18.6745 12.0017 19.8577ZM10.5735 19.8577C10.5735 19.4633 10.2538 19.1436 9.85941 19.1436C9.46502 19.1436 9.1453 19.4633 9.1453 19.8577C9.1453 20.2521 9.46502 20.5718 9.85941 20.5718C10.2538 20.5718 10.5735 20.2521 10.5735 19.8577ZM19.1429 19.8577C19.1429 21.0408 18.1837 22 17.0005 22C15.8173 22 14.8582 21.0408 14.8582 19.8577C14.8582 18.6745 15.8173 17.7153 17.0005 17.7153C18.1837 17.7153 19.1429 18.6745 19.1429 19.8577ZM17.7146 19.8577C17.7146 19.4633 17.3949 19.1436 17.0005 19.1436C16.6061 19.1436 16.2864 19.4633 16.2864 19.8577C16.2864 20.2521 16.6061 20.5718 17.0005 20.5718C17.3949 20.5718 17.7146 20.2521 17.7146 19.8577Z" fill="currentColor" />
    </svg>
  )
}

export default function CartDrawer() {
  const {
    items, isOpen,
    removeItem, updateQuantity, closeCart,
    totalItems, subtotal, total,
  } = useCart()

  const [visible, setVisible] = useState(false)
  const [animating, setAnimating] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setVisible(true)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setAnimating(true))
      })
    } else {
      setAnimating(false)
      const t = setTimeout(() => setVisible(false), 400)
      return () => clearTimeout(t)
    }
  }, [isOpen])

  if (!visible) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[9998] transition-opacity duration-400"
        style={{
          background: 'rgba(0,0,0,0.5)',
          opacity: animating ? 1 : 0,
        }}
        onClick={closeCart}
      />

      {/* Drawer */}
      <div
        className="fixed top-0 right-0 bottom-0 z-[9999] flex flex-col bg-white shadow-2xl transition-transform duration-400"
        style={{
          width: 'min(420px, 100vw)',
          transform: animating ? 'translateX(0)' : 'translateX(100%)',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#eef0f3]">
          <div className="font-primary font-semibold text-[17px] text-[#22282F]">
            Cart<span className="text-[#8494A6] font-normal ml-1">({totalItems})</span>
          </div>
          <button
            onClick={closeCart}
            className="w-8 h-8 flex items-center justify-center text-[#5B6775] hover:text-[#22282F] transition-colors cursor-pointer"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            /* Empty state */
            <div className="flex flex-col items-center justify-center h-full px-8 text-center">
              <div className="text-[#C4CDD5] mb-4">
                <CartBagIcon />
              </div>
              <div className="font-primary font-semibold text-[16px] text-[#22282F] mb-2">
                Looks like you haven't added anything yet!
              </div>
              <div className="font-primary text-[14px] text-[#6B7785] mb-6 max-w-[280px]">
                Shop now for premium research peptides designed to meet the highest standards.
              </div>
              <Link
                to="/shop/"
                onClick={closeCart}
                className="inline-block px-8 py-3 rounded-lg bg-[#16A1C5] text-white font-primary font-semibold text-[14px] hover:bg-[#1291b3] transition-colors"
              >
                Shop Now
              </Link>
            </div>
          ) : (
            /* Cart items */
            <div className="px-4 pt-4">
              {items.map((item) => (
                <div
                  key={`${item.slug}-${item.dosage}-${item.vial}`}
                  className="flex gap-3 py-4 border-b border-[#f0f2f5] last:border-b-0"
                >
                  {/* Thumbnail */}
                  <div className="relative shrink-0">
                    <Link to={`/product/${item.slug}/`} onClick={closeCart} tabIndex={-1}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-[72px] h-[72px] object-contain rounded-lg bg-[#f8f9fb] p-1"
                      />
                    </Link>
                    <button
                      onClick={() => removeItem(item.slug, item.dosage, item.vial)}
                      className="absolute -top-1.5 -left-1.5 w-5 h-5 rounded-full bg-[#e5e7eb] flex items-center justify-center text-[#5B6775] hover:bg-[#d1d5db] transition-colors cursor-pointer"
                    >
                      <SmallCloseIcon />
                    </button>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <Link
                        to={`/product/${item.slug}/`}
                        onClick={closeCart}
                        className="font-primary font-semibold text-[13px] text-[#22282F] hover:text-[#16A1C5] transition-colors line-clamp-2 block"
                      >
                        {item.name} - Dosages: {item.dosage}, Vial: {item.vial}
                      </Link>
                      <div className="flex gap-3 mt-0.5">
                        <span className="font-primary text-[11px] text-[#8494A6]">
                          <span className="text-[#5B6775]">Dosages:</span> {item.dosage}
                        </span>
                        <span className="font-primary text-[11px] text-[#8494A6]">
                          <span className="text-[#5B6775]">Vial:</span> {item.vial}
                        </span>
                      </div>
                      <Link
                        to={`/product/${item.slug}/`}
                        onClick={closeCart}
                        className="font-primary text-[11px] text-[#16A1C5] hover:underline mt-0.5 inline-block"
                      >
                        Select options
                      </Link>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      {/* Quantity */}
                      <div className="flex items-center border border-[#e5e7eb] rounded-lg overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.slug, item.dosage, item.vial, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center text-[#5B6775] hover:bg-[#f4f5f7] transition-colors cursor-pointer"
                        >
                          <MinusIcon />
                        </button>
                        <input
                          type="text"
                          inputMode="numeric"
                          value={item.quantity}
                          onChange={(e) => {
                            const val = parseInt(e.target.value) || 1
                            updateQuantity(item.slug, item.dosage, item.vial, Math.max(1, val))
                          }}
                          className="w-8 h-8 text-center font-primary font-semibold text-[13px] text-[#22282F] outline-none border-x border-[#e5e7eb] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                        <button
                          onClick={() => updateQuantity(item.slug, item.dosage, item.vial, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center text-[#5B6775] hover:bg-[#f4f5f7] transition-colors cursor-pointer"
                        >
                          <PlusIcon />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="font-primary font-semibold text-[14px] text-[#22282F]">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-[#eef0f3] px-5 pb-4 pt-3">
            {/* Order summary */}
            <div className="flex items-center justify-between py-2">
              <span className="font-primary font-semibold text-[14px] text-[#22282F]">Subtotal</span>
              <span className="font-primary font-semibold text-[14px] text-[#22282F]">${subtotal.toFixed(2)}</span>
            </div>

            <div className="py-1.5">
              <span className="font-primary text-[11px] text-[#8494A6]">
                Shipping &amp; taxes may be re-calculated at checkout
              </span>
            </div>

            {/* Checkout button */}
            <Link
              to="/checkout/"
              onClick={closeCart}
              className="w-full h-[48px] rounded-lg flex items-center justify-between px-5 font-primary font-semibold text-[15px] text-white mt-2 transition-colors cursor-pointer"
              style={{ background: '#16A1C5' }}
            >
              <span>Proceed to Checkout</span>
              <span>${total.toFixed(2)}</span>
            </Link>

            {/* Payment icons */}
            <div className="mt-3 flex justify-center">
              <img
                src="https://beyond-peptides.com/wp-content/uploads/2025/06/Group-427320820.png"
                alt="Payment methods"
                className="w-full"
                style={{ maxWidth: 320 }}
              />
            </div>
          </div>
        )}
      </div>
    </>
  )
}
