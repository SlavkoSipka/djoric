import { Link } from 'react-router-dom'
import { User, Heart, ShoppingCart } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Our Products', to: '/shop/' },
  { label: 'About', to: '/about-us/' },
  { label: 'FAQ', to: '/faq/' },
]

export default function ShopNav() {
  const { openCart, totalItems } = useCart()
  const { totalItems: wishlistCount } = useWishlist()

  return (
    <div
      style={{
        background: 'linear-gradient(150deg, #0a9edd 0%, #006ea8 35%, #004f82 65%, #004974 100%)',
      }}
    >
      <div
        className="relative z-10 mx-auto w-full flex flex-col items-center"
        style={{
          paddingTop: 'clamp(6px, 2vh, 20px)',
          paddingLeft: 'clamp(16px, 2.5vw, 40px)',
          paddingRight: 'clamp(16px, 2.5vw, 40px)',
        }}
      >
        <div
          className="w-full max-w-[1440px] rounded-t-[24px] overflow-hidden"
          style={{
            background: 'rgba(255,255,255,0.07)',
            border: '1px solid rgba(255,255,255,0.18)',
            borderBottom: 'none',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
          }}
        >
          <header className="flex items-center justify-between px-8 lg:px-[60px] h-[62px] shrink-0 border-b border-white/10">
            <Link to="/" className="flex items-center shrink-0">
              <img
                src="https://beyond-peptides.com/wp-content/uploads/2024/09/website-logo-1.svg"
                alt="Beyond Peptides"
                className="h-[30px]"
              />
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  className={`font-primary font-medium text-[14px] relative text-white transition-colors duration-300 hover:text-white/70
                    after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:bg-white
                    after:transition-[width] after:duration-300 ${item.label === 'Our Products' ? 'after:w-full' : 'after:w-0 hover:after:w-full'}`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2.5">
              <Link
                to="/my-account/"
                className="w-[38px] h-[38px] rounded-full border border-white/20 flex items-center justify-center cursor-pointer transition-all hover:border-white/40 hover:bg-white/10"
              >
                <User className="w-[18px] h-[18px] text-white" />
              </Link>
              <Link
                to="/wishlist/"
                className="relative w-[38px] h-[38px] rounded-full border border-white/20 flex items-center justify-center cursor-pointer transition-all hover:border-white/40 hover:bg-white/10"
              >
                <Heart className="w-[18px] h-[18px] text-white" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white w-[16px] h-[16px] rounded-full text-[10px] font-semibold flex items-center justify-center font-primary">
                    {wishlistCount}
                  </span>
                )}
              </Link>
              <button
                onClick={openCart}
                className="relative w-[38px] h-[38px] rounded-full border border-white/20 flex items-center justify-center cursor-pointer transition-all hover:border-white/40 hover:bg-white/10"
              >
                <ShoppingCart className="w-[18px] h-[18px] text-white" />
                <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white w-[16px] h-[16px] rounded-full text-[10px] font-semibold flex items-center justify-center font-primary">
                  {totalItems}
                </span>
              </button>
            </div>
          </header>
        </div>
      </div>
    </div>
  )
}
