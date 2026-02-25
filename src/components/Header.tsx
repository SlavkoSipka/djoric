import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Our Products', href: '/shop/', hasMega: true },
  { label: 'About', href: '/about-us/' },
  { label: 'FAQ', href: '/faq/' },
];

const megaMenuColumns = [
  [
    { name: 'IGF-1 LR3', href: '/product/igf-1-lr3/' },
    { name: 'PEG-MGF', href: '/product/peg-mgf/' },
    { name: 'TB-500', href: '/product/tb-500/' },
    { name: 'BPC-157', href: '/product/bpc-157/' },
    { name: 'BPC-157 & TB-500 Mix', href: '/product/bpc-157-tb-500-mix/' },
    { name: 'HCG', href: '/product/hcg/' },
    { name: 'Beyond Gut Pro', href: '/product/gut-pro/' },
    { name: 'AOD 9604', href: '/product/aod-9604/' },
    { name: 'BeyondC', href: '/product/beyondc/' },
    { name: 'Tesamorelin', href: '/product/tesa/' },
  ],
  [
    { name: 'Selank', href: '/product/selank/' },
    { name: 'Semax', href: '/product/semax/' },
    { name: 'DSIP', href: '/product/dsip/' },
    { name: 'Oxytocin', href: '/product/oxytocin/' },
    { name: 'Epithalon', href: '/product/epithalon/' },
    { name: 'GHK-Cu', href: '/product/ghk-cu/' },
    { name: 'Beyond Hair', href: '/product/beyond-hair/' },
    { name: 'Bacteriostatic Water', href: '/product/bac/' },
    { name: 'KPV', href: '/product/kp/' },
  ],
  [
    { name: 'HGH Fragment 176-191', href: '/product/hgh-fragment-176-191/' },
    { name: 'BeyondG', href: '/product/beyondg/' },
    { name: 'MT2 (Melanotan II)', href: '/product/mt2-melanotan-ii/' },
    { name: 'Ipamorelin', href: '/product/ipamorelin/' },
    { name: 'Methylene Blue', href: '/product/mb/' },
    { name: 'L-Carnitine', href: '/product/l-carnitine/' },
    { name: 'Beyond Skin', href: '/product/beyond-skin/' },
    { name: 'NAD+', href: '/product/nad/' },
    { name: 'VIP', href: '/product/vi/' },
  ],
  [
    { name: 'PT-141', href: '/product/pt-141/' },
    { name: 'SS-31', href: '/product/ss-31/' },
    { name: 'MOTS-C', href: '/product/mots-c/' },
    { name: '5-Amino-1MQ', href: '/product/5-a1mq/' },
    { name: 'SLU-PP-332', href: '/product/slu-pp-332/' },
    { name: 'Beyond Sleep', href: '/product/beyond-sleep/' },
    { name: 'Thymosin Alpha 1', href: '/product/thymosin/' },
    { name: 'KLOW', href: '/product/klo/' },
    { name: 'GLOW', href: '/product/glow/' },
  ],
];

function AccountIcon({ scrolled }: { scrolled: boolean }) {
  const stroke = scrolled ? '#0F172A' : 'white';
  const borderStroke = scrolled ? 'rgba(15,23,42,0.15)' : 'rgba(255,255,255,0.2)';
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44" fill="none">
      <rect x="0.5" y="0.5" width="43" height="43" rx="21.5" stroke={borderStroke} />
      <path d="M26.4138 23.4289C25.5518 22.9146 24.6034 22.7432 23.3966 22.7432H19.5172C18.3103 22.7432 17.3621 23.0003 16.5 23.4289C15.6379 23.9432 15.0345 24.6288 14.6034 25.4003C14.1724 26.2574 14 27.2002 14 28.2288V29.0002H15.5517V28.2288C15.5517 27.3717 15.7241 26.686 16.069 26.086C16.4138 25.486 16.8448 25.0574 17.3621 24.7146C17.9655 24.3717 18.7414 24.2003 19.6034 24.2003H23.3966C24.2586 24.2003 25.0345 24.3717 25.6379 24.7146C26.2414 25.0574 26.6724 25.486 26.931 26.086C27.2758 26.686 27.4482 27.4574 27.4482 28.2288V29.0002H29V28.2288C29 27.2002 28.7414 26.1717 28.3966 25.4003C27.8793 24.5432 27.2758 23.8574 26.4138 23.4289Z" fill={stroke} />
      <path d="M19.689 20.8571C20.2062 21.1142 20.8096 21.2857 21.4131 21.2857C22.4476 21.2857 23.3096 20.9428 23.9131 20.3428C24.5166 19.6571 24.8614 18.8 24.8614 17.6857C24.8614 16.9142 24.689 16.3143 24.4304 15.8C24.1717 15.2857 23.7407 14.8571 23.1372 14.5143C22.7062 14.1714 22.1028 14 21.4993 14C20.4648 14 19.6028 14.3429 18.9131 14.9429C18.3097 15.6286 17.9648 16.4857 17.9648 17.6C17.9648 18.3714 18.1373 18.9714 18.3959 19.5714C18.7407 20.0857 19.1717 20.5999 19.689 20.8571ZM20.0338 16.0571C20.3786 15.7143 20.8959 15.5428 21.4993 15.5428C21.8441 15.5428 22.189 15.5428 22.5338 15.7143C22.7924 15.8857 23.0511 16.0571 23.2235 16.4C23.3096 16.7428 23.3959 17.1714 23.3959 17.6C23.3959 18.3714 23.2235 18.8857 22.8786 19.2285C22.5338 19.5714 22.0166 19.7428 21.4131 19.7428C20.9821 19.7428 20.7235 19.6571 20.3786 19.4856C20.1201 19.3999 19.9476 19.1428 19.7752 18.8857C19.6028 18.5428 19.5166 18.1142 19.5166 17.6C19.5166 16.9143 19.689 16.4 20.0338 16.0571Z" fill={stroke} />
    </svg>
  );
}

function WishlistIcon({ scrolled }: { scrolled: boolean }) {
  const stroke = scrolled ? '#0F172A' : 'white';
  const borderStroke = scrolled ? 'rgba(15,23,42,0.15)' : 'rgba(255,255,255,0.2)';
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44" fill="none">
      <rect x="0.5" y="0.5" width="43" height="43" rx="21.5" stroke={borderStroke} />
      <path d="M22.85 29.7583C22.5667 29.8583 22.1 29.8583 21.8167 29.7583C19.4 28.9333 14 25.4917 14 19.6583C14 17.0833 16.075 15 18.6333 15C20.15 15 21.4917 15.7333 22.3333 16.8667C23.175 15.7333 24.525 15 26.0333 15C28.5917 15 30.6667 17.0833 30.6667 19.6583C30.6667 25.4917 25.2667 28.9333 22.85 29.7583Z" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CartIcon({ scrolled }: { scrolled: boolean }) {
  const fill = scrolled ? '#22282F' : 'white';
  const borderStroke = scrolled ? 'rgba(15,23,42,0.15)' : 'rgba(255,255,255,0.2)';
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44" fill="none">
      <rect x="0.5" y="0.5" width="43" height="43" rx="21.5" stroke={borderStroke} />
      <path d="M16.543 24.319V16.137H15.18V14.773H17.225C17.406 14.773 17.579 14.845 17.707 14.973C17.835 15.101 17.907 15.274 17.907 15.455V23.637H26.387L27.751 18.183H19.271V16.819H28.625C28.729 16.819 28.831 16.843 28.924 16.888C29.017 16.933 29.099 17 29.163 17.081C29.226 17.163 29.271 17.258 29.292 17.36C29.314 17.461 29.312 17.566 29.287 17.666L27.582 24.485C27.545 24.632 27.46 24.763 27.34 24.856C27.22 24.95 27.073 25.001 26.921 25.001H17.225C17.044 25.001 16.871 24.929 16.743 24.801C16.615 24.673 16.543 24.5 16.543 24.319ZM17.907 29.092C17.545 29.092 17.198 28.948 16.943 28.692C16.687 28.437 16.543 28.09 16.543 27.728C16.543 27.366 16.687 27.019 16.943 26.764C17.198 26.508 17.545 26.364 17.907 26.364C18.269 26.364 18.615 26.508 18.871 26.764C19.127 27.019 19.271 27.366 19.271 27.728C19.271 28.09 19.127 28.437 18.871 28.692C18.615 28.948 18.269 29.092 17.907 29.092ZM26.089 29.092C25.727 29.092 25.38 28.948 25.125 28.692C24.869 28.437 24.725 28.09 24.725 27.728C24.725 27.366 24.869 27.019 25.125 26.764C25.38 26.508 25.727 26.364 26.089 26.364C26.45 26.364 26.797 26.508 27.053 26.764C27.309 27.019 27.452 27.366 27.452 27.728C27.452 28.09 27.309 28.437 27.053 28.692C26.797 28.948 26.45 29.092 26.089 29.092Z" fill={fill} />
    </svg>
  );
}

function ChevronDown({ scrolled }: { scrolled: boolean }) {
  return (
    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 1L5 5L9 1" stroke={scrolled ? '#0F172A' : 'white'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const megaTimeout = useRef<ReturnType<typeof setTimeout>>(null);
  const { openCart, totalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openMega = () => {
    if (megaTimeout.current) clearTimeout(megaTimeout.current);
    setMegaOpen(true);
  };

  const closeMega = () => {
    megaTimeout.current = setTimeout(() => setMegaOpen(false), 200);
  };

  return (
    <div
      className="fixed left-0 right-0 z-[1000] transition-all duration-300"
      style={{
        top: scrolled ? 0 : 0,
        background: scrolled
          ? 'rgba(255,255,255,0.97)'
          : 'transparent',
        boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.08)' : 'none',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
      }}
    >
      <div
        className="mx-auto flex items-center justify-between"
        style={{
          maxWidth: 1519,
          height: 70,
          padding: '0 32px',
        }}
      >
        {/* Logo */}
        <Link to="/" className="flex items-center shrink-0">
          <img
            src={
              scrolled
                ? 'https://beyond-peptides.com/wp-content/uploads/2024/09/color-logo-1.svg'
                : 'https://beyond-peptides.com/wp-content/uploads/2024/09/website-logo-1.svg'
            }
            alt="Beyond Peptides"
            className="transition-opacity duration-300"
            style={{ height: 30 }}
          />
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) =>
            link.hasMega ? (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={openMega}
                onMouseLeave={closeMega}
              >
                <Link
                  to={link.href}
                  className="font-primary font-medium text-[14px] flex items-center gap-1.5 transition-colors duration-300"
                  style={{ color: scrolled ? '#0F172A' : 'rgba(255,255,255,0.90)' }}
                >
                  {link.label}
                  <ChevronDown scrolled={scrolled} />
                </Link>

                {/* Mega menu — full-width dropdown */}
                <div
                  className="fixed left-0 right-0 transition-all duration-200"
                  style={{
                    top: 70,
                    opacity: megaOpen ? 1 : 0,
                    pointerEvents: megaOpen ? 'auto' : 'none',
                    zIndex: 999,
                  }}
                  onMouseEnter={openMega}
                  onMouseLeave={closeMega}
                >
                  <div
                    style={{
                      background: '#fff',
                      boxShadow: '0 20px 60px rgba(0,0,0,0.12)',
                      borderTop: '1px solid #e5e7eb',
                    }}
                  >
                    <div
                      className="mx-auto flex"
                      style={{ maxWidth: 1519, padding: '0 32px' }}
                    >
                      {/* Left panel — tab sidebar + product grid */}
                      <div className="flex flex-1" style={{ borderRight: '1px solid #f0f0f0' }}>
                        {/* Tab sidebar */}
                        <div
                          className="shrink-0 flex items-start gap-3 py-7 pr-6"
                          style={{ borderRight: '1px solid #f0f0f0', width: 220 }}
                        >
                          <img
                            src="https://beyond-peptides.com/wp-content/uploads/2024/09/pr1.png"
                            alt=""
                            style={{ width: 44, height: 44, borderRadius: 8 }}
                          />
                          <div>
                            <h4 className="font-primary font-semibold text-[14px] text-[#0F172A] leading-tight">
                              All Peptides
                            </h4>
                            <p className="text-[11px] text-[#8494A6] mt-1 leading-snug">
                              A comprehensive list of all peptides, categorized into four columns based on their primary research effects.
                            </p>
                          </div>
                        </div>

                        {/* Product grid */}
                        <div className="flex-1 py-7 pl-6">
                          <div className="grid grid-cols-4 gap-x-8 gap-y-0">
                            {megaMenuColumns.map((col, ci) => (
                              <div key={ci}>
                                {col.map((item) => (
                                  <a
                                    key={item.name}
                                    href={item.href}
                                    className="block py-[5px] text-[13px] text-[#5B6775] hover:text-[#16a1c5] transition-colors font-primary"
                                  >
                                    {item.name}
                                  </a>
                                ))}
                              </div>
                            ))}
                          </div>

                          {/* Bottom bar */}
                          <div
                            className="flex items-center justify-between mt-4 pt-4"
                            style={{ borderTop: '1px solid #f0f0f0' }}
                          >
                            <Link
                              to="/shop/"
                              className="font-primary font-semibold text-[14px] text-[#16a1c5] hover:underline flex items-center gap-1.5"
                            >
                              View All Peptides
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16a1c5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                              </svg>
                            </Link>
                            <span className="text-[11px] text-[#8494A6] font-primary">
                              For research purposes only. Not intended for human consumption. For professionals only.
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Right panel — Featured product */}
                      <div className="shrink-0 py-7 pl-6" style={{ width: 280 }}>
                        <h3 className="font-primary font-semibold text-[16px] text-[#0F172A] mb-3">
                          Featured
                        </h3>
                        <a
                          href="/product/glow/"
                          className="group block rounded-xl overflow-hidden"
                          style={{
                            border: '1px solid #f0f0f0',
                            background: 'rgba(255,255,255,0.75)',
                          }}
                        >
                          <div className="flex items-center justify-center p-4" style={{ background: '#fafafa' }}>
                            <img
                              src="https://beyond-peptides.com/wp-content/uploads/2026/01/BeyondPeptides-ProductVis-vA26-t-GLOW-70mg-FrontView-CPUPD2K-e1769169509242-600x658.png"
                              alt="GLOW"
                              className="w-full object-contain"
                              style={{ maxWidth: 160, maxHeight: 175 }}
                              loading="lazy"
                            />
                          </div>
                          <div className="px-4 pt-2 pb-3">
                            <h4 className="font-primary font-semibold text-[18px] text-[#22282F]">
                              GLOW
                            </h4>
                          </div>
                          <div
                            className="flex items-center justify-between px-4 py-3"
                            style={{ background: '#22282F' }}
                          >
                            <span className="font-primary font-semibold text-[13px] text-white">
                              USD $139.99
                            </span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 20 20" fill="none">
                              <path d="M13.1234 8.75V5C13.1234 4.1712 12.7942 3.37634 12.2081 2.79029C11.6221 2.20424 10.8272 1.875 9.9984 1.875C9.1696 1.875 8.37474 2.20424 7.78869 2.79029C7.20264 3.37634 6.8734 4.1712 6.8734 5V8.75M16.3367 7.08917L17.3892 17.0892C17.4476 17.6433 17.0142 18.125 16.4567 18.125H3.54007C3.40857 18.1251 3.27852 18.0976 3.15836 18.0442C3.03819 17.9908 2.93061 17.9127 2.84259 17.8151C2.75457 17.7174 2.68808 17.6023 2.64745 17.4772C2.60681 17.3521 2.59294 17.2199 2.60673 17.0892L3.66007 7.08917C3.68436 6.8588 3.79309 6.64558 3.96528 6.49063C4.13746 6.33568 4.36092 6.24996 4.59257 6.25H15.4042C15.8842 6.25 16.2867 6.6125 16.3367 7.08917Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={link.label}
                to={link.href}
                className="font-primary font-medium text-[14px] transition-colors duration-300 hover:opacity-70"
                style={{ color: scrolled ? '#0F172A' : 'rgba(255,255,255,0.90)' }}
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        {/* Right icons */}
        <div className="flex items-center gap-2">
          <a href="/my-account/" className="cursor-pointer transition-transform hover:scale-105">
            <AccountIcon scrolled={scrolled} />
          </a>
          <a href="/wishlist/" className="cursor-pointer transition-transform hover:scale-105">
            <WishlistIcon scrolled={scrolled} />
          </a>
          <button onClick={openCart} className="relative cursor-pointer transition-transform hover:scale-105">
            <CartIcon scrolled={scrolled} />
            <span
              className="absolute flex items-center justify-center font-primary font-semibold"
              style={{
                top: 2,
                right: 2,
                width: 16,
                height: 16,
                borderRadius: '50%',
                background: '#ef4444',
                color: '#fff',
                fontSize: 10,
              }}
            >
              {totalItems}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
