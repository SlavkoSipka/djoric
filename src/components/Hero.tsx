import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ArrowRight, User, ShoppingCart } from 'lucide-react';
import { useFeaturedProduct } from '../hooks/useProducts';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export default function Hero() {
  const { product: featuredProduct } = useFeaturedProduct();
  const { openCart, totalItems, addItem } = useCart();
  const { isInWishlist, toggleItem } = useWishlist();
  const [activeDosageIdx, setActiveDosageIdx] = useState(0);
  const [activeVialIdx, setActiveVialIdx] = useState(0);

  const variations = featuredProduct?.variations || [];
  const currentVariation = variations[activeDosageIdx];
  const currentVial = currentVariation?.vials?.[activeVialIdx];
  const price = currentVial?.price ?? featuredProduct?.price ?? 0;

  return (
    <section
      className="relative overflow-hidden min-h-screen flex flex-col items-center"
      style={{
        background: 'linear-gradient(150deg, #0a9edd 0%, #006ea8 35%, #004f82 65%, #004974 100%)',
        paddingTop: 'clamp(6px, 2vh, 20px)',
        paddingBottom: '48px',
        paddingLeft: 'clamp(16px, 2.5vw, 40px)',
        paddingRight: 'clamp(16px, 2.5vw, 40px)',
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
        <div
          className="absolute -bottom-[200px] -left-[100px] w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(ellipse, rgba(255,255,255,0.04) 0%, transparent 60%)' }}
        />
      </div>

      {/* Main glass card */}
      <div
        className="relative z-10 w-full max-w-[1440px] rounded-[24px] overflow-hidden flex flex-col"
        style={{
          background: 'rgba(255,255,255,0.07)',
          border: '1px solid rgba(255,255,255,0.18)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          boxShadow: '0 12px 60px rgba(0,0,0,0.18)',
        }}
      >
        {/* Navigation */}
        <header className="flex items-center justify-between px-8 lg:px-[60px] h-[62px] shrink-0 border-b border-white/10">
          <a href="#" className="flex items-center shrink-0">
            <img
              src="https://beyond-peptides.com/wp-content/uploads/2024/09/website-logo-1.svg"
              alt="Beyond Peptides"
              className="h-[30px]"
            />
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {[
              { label: 'Home', to: '/' },
              { label: 'Our Products', to: '/shop/' },
              { label: 'About', to: '/about-us/' },
              { label: 'FAQ', to: '/faq/' },
            ].map((item, i) => (
              <Link
                key={item.label}
                to={item.to}
                className={`font-primary font-medium text-[14px] relative text-white transition-colors duration-300 hover:text-white/70
                  after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:bg-white
                  after:transition-[width] after:duration-300 ${i === 0 ? 'after:w-full' : 'after:w-0 hover:after:w-full'}`}
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
              className="w-[38px] h-[38px] rounded-full border border-white/20 flex items-center justify-center cursor-pointer transition-all hover:border-white/40 hover:bg-white/10"
            >
              <Heart className="w-[18px] h-[18px] text-white" />
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

        {/* Separator line */}
        <div className="hidden md:block mx-8 lg:mx-[60px]">
          <div
            className="h-px w-full"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 20%, rgba(255,255,255,0.15) 80%, transparent 100%)',
            }}
          />
        </div>

        {/* Hero content */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 lg:gap-[48px] px-8 lg:px-[60px] pt-10 lg:pt-[64px] pb-10 lg:pb-[72px] items-center">
          {/* Left column */}
          <div className="lg:pl-[8%]">
            <div className="flex items-center gap-2.5 mb-7 animate-fade-in-up">
              <span className="font-primary font-medium text-[13px] text-[#7ee8ff]">For research purposes</span>
              <span className="flex items-center justify-center opacity-60">
                <img
                  src="https://beyond-peptides.com/wp-content/uploads/2024/09/Group-528.png"
                  width="15"
                  height="15"
                  alt=""
                />
              </span>
              <span className="font-primary font-medium text-[13px] text-white/55">For use by professionals</span>
            </div>

            <h1
              className="font-primary font-extrabold text-white leading-[1.08] mb-8 animate-fade-in-up"
              style={{ fontSize: 'clamp(34px, 4.5vw, 58px)' }}
            >
              Buy High-quality<br />research peptides
            </h1>

            <a
              href="#"
              className="inline-flex items-center gap-4 px-6 py-3.5 rounded-full border border-white/25 bg-white/[0.08] text-white font-primary font-semibold text-[14px] cursor-pointer transition-all duration-300 hover:bg-white/[0.14] hover:border-white/40 animate-fade-in-up-delay mb-10"
            >
              <div>
                <div className="text-[10px] font-medium text-white/45 uppercase tracking-[1.2px] mb-0.5">
                  HIGH-QUALITY TESTED PRODUCTS
                </div>
                <div className="text-[15px]">Explore our products</div>
              </div>
              <div className="w-9 h-9 rounded-full border border-white/20 bg-white/[0.06] flex items-center justify-center">
                <ArrowRight className="w-4 h-4 text-white" />
              </div>
            </a>

            <p className="font-body text-[13px] text-white/35 leading-[1.65] max-w-[460px] animate-fade-in-up-delay">
              For research purposes only. Not intended for human consumption. For use by professionals only.
            </p>
          </div>

          {/* Right column - Product card */}
          {featuredProduct && (
          <div className="hidden lg:block animate-fade-in-up-delay2">
            <div
              className="relative rounded-[20px] border border-white/[0.12] overflow-hidden"
              style={{
                background: 'rgba(255,255,255,0.06)',
                backdropFilter: 'blur(18px)',
                WebkitBackdropFilter: 'blur(18px)',
              }}
            >
              <div className="relative flex justify-center items-center px-6 pt-8 pb-4">
                <span className="absolute top-5 left-5 z-20 px-3 py-1.5 rounded-[6px] border border-white/[0.12] font-primary text-[11px] font-semibold text-white tracking-wider uppercase">
                  BESTSELLER
                </span>
                <button
                  onClick={() => featuredProduct && currentVariation && currentVial && toggleItem({
                    slug: featuredProduct.slug,
                    name: featuredProduct.name,
                    image: featuredProduct.image,
                    dosage: currentVariation.dosage,
                    vial: currentVial.label,
                    price: currentVial.price,
                    inStock: currentVial.in_stock,
                  })}
                  className={`absolute top-5 right-5 z-20 w-9 h-9 rounded-full border flex items-center justify-center cursor-pointer transition-all ${
                    featuredProduct && currentVariation && currentVial && isInWishlist(featuredProduct.slug, currentVariation.dosage, currentVial.label)
                      ? 'border-red-400/50 bg-red-500/20'
                      : 'border-white/25 bg-white/10 hover:bg-white/20'
                  }`}
                >
                  <Heart
                    className="w-4 h-4 text-white"
                    strokeWidth={2}
                    fill={featuredProduct && currentVariation && currentVial && isInWishlist(featuredProduct.slug, currentVariation.dosage, currentVial.label) ? 'currentColor' : 'none'}
                  />
                </button>
                <img
                  src={featuredProduct.image}
                  alt={featuredProduct.name}
                  className="w-[180px] transition-transform duration-500 hover:scale-[1.03] drop-shadow-[0_8px_24px_rgba(0,0,0,0.2)]"
                />
              </div>

              <div
                className="absolute left-0 right-0 bottom-0 h-[60%] pointer-events-none"
                style={{ background: 'linear-gradient(to top, rgba(255,255,255,0.06) 0%, transparent 100%)' }}
              />

              <div className="relative z-10 px-6 pt-3 pb-1">
                <div className="font-primary text-[13px] font-medium text-[#46D9FF] mb-0.5">{featuredProduct.dosage || ''}</div>
                <h3 className="font-primary text-[22px] font-semibold text-white mb-4">{featuredProduct.name}</h3>

                {variations.length > 0 && (
                <div className="mb-4">
                  <p className="font-primary text-[14px] font-semibold text-white mb-2">
                    Dosages<span className="text-white/45 font-normal"> : {currentVariation?.dosage}</span>
                  </p>
                  <div className="flex gap-2">
                    {variations.map((v, i) => (
                      <button
                        key={v.dosage}
                        onClick={() => { setActiveDosageIdx(i); setActiveVialIdx(0); }}
                        className={`px-3.5 py-[7px] rounded-[8px] border font-primary text-[13px] font-medium text-white cursor-pointer transition-all bg-transparent ${
                          activeDosageIdx === i
                            ? 'border-white shadow-[inset_0_0_0_1px_white]'
                            : 'border-white/[0.13] hover:border-white/50'
                        }`}
                      >
                        {v.dosage}
                      </button>
                    ))}
                  </div>
                </div>
                )}

                {currentVariation && currentVariation.vials.length > 0 && (
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-primary text-[14px] font-semibold text-white">
                      Vial<span className="text-white/45 font-normal"> : {currentVial?.label}</span>
                    </p>
                    <button
                      onClick={() => { setActiveVialIdx(0); setActiveDosageIdx(0); }}
                      className="text-[11px] text-white/35 font-primary font-medium hover:text-white/60 transition-colors tracking-wider uppercase cursor-pointer bg-transparent border-none"
                    >
                      CLEAR
                    </button>
                  </div>
                  <div className="flex gap-2">
                    {currentVariation.vials.map((v, i) => (
                      <button
                        key={v.label}
                        onClick={() => setActiveVialIdx(i)}
                        className={`px-3.5 py-[7px] rounded-[8px] border font-primary text-[13px] font-medium text-white cursor-pointer transition-all bg-transparent ${
                          activeVialIdx === i
                            ? 'border-white shadow-[inset_0_0_0_1px_white]'
                            : 'border-white/[0.13] hover:border-white/50'
                        }`}
                      >
                        {v.label}
                      </button>
                    ))}
                  </div>
                </div>
                )}

                <div className="py-3">
                  <span className="font-primary text-[18px] font-bold text-white">
                    ${price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </span>
                  <span className="text-[13px] font-normal text-white/50 ml-1.5">incl. VAT</span>
                </div>
              </div>

              <button
                onClick={() => {
                  if (featuredProduct && currentVariation && currentVial) {
                    addItem({
                      slug: featuredProduct.slug,
                      name: featuredProduct.name,
                      image: featuredProduct.image,
                      dosage: currentVariation.dosage,
                      vial: currentVial.label,
                      price: currentVial.price,
                    })
                  }
                }}
                className="relative z-10 block w-full py-4 text-white border-none font-primary text-[16px] font-semibold cursor-pointer transition-all hover:brightness-110 text-center"
                style={{ background: '#1BB5DD', borderRadius: '0 0 20px 20px' }}
              >
                Add to cart
              </button>
            </div>
          </div>
          )}
        </div>
      </div>

      {/* Bottom section - "Buy Unmatched Quality" */}
      <div className="relative z-10 w-full max-w-[1440px] mt-12 flex flex-col items-center text-center">
        <h2
          className="font-primary font-bold text-white leading-[1.2] mb-8"
          style={{ fontSize: 'clamp(24px, 3vw, 38px)' }}
        >
          Buy Unmatched Quality in Research<br />Peptides and Research Kits
        </h2>

        <a
          href="#"
          className="inline-flex items-center gap-4 px-8 py-3 rounded-full border border-white/20 bg-white/[0.06] text-white font-primary font-medium text-[14px] cursor-pointer transition-all duration-300 hover:bg-white/[0.12] hover:border-white/35"
        >
          <span>View All Peptides</span>
          <div className="w-8 h-8 rounded-full border border-white/20 bg-white/[0.04] flex items-center justify-center">
            <ArrowRight className="w-4 h-4 text-white" />
          </div>
        </a>
      </div>
    </section>
  );
}
