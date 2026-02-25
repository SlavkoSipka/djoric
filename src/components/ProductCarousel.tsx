import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import type { ProductRow } from '../lib/supabase';
import { useWishlist } from '../context/WishlistContext';
import 'swiper/css';
import 'swiper/css/navigation';

function ChevronLeftIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.5 15L7.5 10L12.5 5" stroke="#22282F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7.5 5L12.5 10L7.5 15" stroke="#22282F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ShoppingBagIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4.5 1.5L2.25 4.5V15C2.25 15.3978 2.40804 15.7794 2.68934 16.0607C2.97064 16.342 3.35218 16.5 3.75 16.5H14.25C14.6478 16.5 15.0294 16.342 15.3107 16.0607C15.592 15.7794 15.75 15.3978 15.75 15V4.5L13.5 1.5H4.5Z" stroke="#5B6775" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2.25 4.5H15.75" stroke="#5B6775" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 7.5C12 8.29565 11.6839 9.05871 11.1213 9.62132C10.5587 10.1839 9.79565 10.5 9 10.5C8.20435 10.5 7.44129 10.1839 6.87868 9.62132C6.31607 9.05871 6 8.29565 6 7.5" stroke="#5B6775" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CarouselProductCard({ product }: { product: ProductRow }) {
  const [hovered, setHovered] = useState(false);
  const { isInWishlist, toggleItem } = useWishlist();
  const link = `/product/${product.slug}/`;

  const v = product.variations?.[0];
  const vial = v?.vials?.[0];
  const dosage = v?.dosage || product.dosage || '';
  const vialLabel = vial?.label || '1 Vial';
  const price = vial?.price ?? product.price;
  const inStock = vial?.in_stock ?? product.in_stock;
  const wishlisted = isInWishlist(product.slug, dosage, vialLabel);

  return (
    <div
      className="group relative flex flex-col rounded-[12px] border border-[#F0F0F0] bg-white overflow-hidden transition-shadow duration-300"
      style={{ boxShadow: hovered ? '0 8px 30px rgba(0,0,0,0.10)' : '0 1px 4px rgba(0,0,0,0.04)' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link to={link} className="relative block bg-white p-4">
        <div className="flex items-center justify-center" style={{ minHeight: 220 }}>
          <img src={product.image} alt={product.name} className="max-w-[260px] w-full h-auto object-contain" loading="lazy" />
        </div>
        <button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleItem({ slug: product.slug, name: product.name, image: product.image, dosage, vial: vialLabel, price, inStock }); }}
          className={`absolute top-3 right-3 z-10 w-9 h-9 rounded-full border flex items-center justify-center transition-all ${
            wishlisted ? 'border-red-400 bg-red-50 text-red-500' : 'border-[#e5e7eb] bg-white hover:border-[#16A1C5]'
          }`}
        >
          <Heart className="w-4 h-4" fill={wishlisted ? 'currentColor' : 'none'} stroke="currentColor" />
        </button>
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.tag && (
            <span className="inline-block rounded-md bg-[#16A1C5] px-3 py-1 text-xs font-semibold text-white">{product.tag}</span>
          )}
          {product.sale_badge && (
            <span className="inline-block rounded-md bg-[#C85625] px-3 py-1 text-xs font-semibold text-white">{product.sale_badge}</span>
          )}
          {product.tested && (
            <span className="inline-block rounded-md bg-[#22282F] px-3 py-1 text-xs font-semibold text-white">Tested</span>
          )}
        </div>
      </Link>

      <div className="flex flex-col flex-1 px-5 pb-2 pt-1">
        {product.dosage && <span className="text-[12px] text-[#2D9B9D] mb-1">{product.dosage}</span>}
        <h3 className="text-[#22282F] text-[20px] font-semibold leading-snug font-primary">{product.name}</h3>
      </div>

      <div className="relative overflow-hidden">
        <div
          className="flex items-center justify-between px-5 py-3 border-t border-[#F0F0F0] transition-transform duration-300"
          style={{ transform: hovered ? 'translateY(-100%)' : 'translateY(0)' }}
        >
          <div className="flex items-center gap-2">
            <span className="text-[#22282F] text-[14px] font-semibold">${product.price.toFixed(2)}</span>
            {product.old_price && (
              <span className="text-[#8494A6] text-[13px] line-through">${product.old_price.toFixed(2)}</span>
            )}
          </div>
          <Link to={link} className="flex items-center justify-center w-10 h-10 rounded-full border border-[#DBDFE5] hover:border-[#22282F] transition-colors" aria-label="Add to bag">
            <ShoppingBagIcon />
          </Link>
        </div>
        <Link
          to={link}
          className="absolute inset-0 flex items-center justify-center bg-[#22282F] text-white text-sm font-semibold transition-transform duration-300"
          style={{ transform: hovered ? 'translateY(0)' : 'translateY(100%)' }}
        >
          Select options
        </Link>
      </div>
    </div>
  );
}

interface ProductCarouselProps {
  title: string;
  products: ProductRow[];
  loading?: boolean;
}

export default function ProductCarousel({ title, products, loading }: ProductCarouselProps) {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const [swiperReady, setSwiperReady] = useState(false);

  const handleSwiperInit = (swiper: SwiperType) => {
    const nav = swiper.params.navigation;
    if (nav && typeof nav !== 'boolean') {
      nav.prevEl = prevRef.current;
      nav.nextEl = nextRef.current;
    }
    swiper.navigation.init();
    swiper.navigation.update();
    setSwiperReady(true);
  };

  if (loading) {
    return (
      <section style={{ background: '#f8f9fa' }}>
        <div className="mx-auto max-w-[1320px] px-5 sm:px-10 py-20">
          <div className="h-8 w-48 bg-[#e5e7eb] rounded animate-pulse mb-10" />
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-[350px] bg-[#e5e7eb] rounded-xl animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!products.length) return null;

  return (
    <section style={{ background: '#f8f9fa' }}>
      <div className="mx-auto max-w-[1320px] px-5 sm:px-10 py-20">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <h2 className="text-[#22282F] font-primary font-semibold text-[24px] leading-tight">{title}</h2>
          </div>
          <div className="flex items-center justify-between flex-1 gap-4 sm:justify-end">
            <p className="text-[14px] font-semibold max-w-sm text-right hidden sm:block" style={{ color: '#5B67759C' }}>
              For research purposes only. Not intended for human consumption. For use by professionals only.
            </p>
            <div className="flex items-center gap-3 shrink-0">
              <button ref={prevRef} className="flex items-center justify-center w-11 h-11 rounded-full border-2 border-[#22282F] hover:bg-[#22282F] hover:text-white transition-colors group" aria-label="Previous slide">
                <ChevronLeftIcon />
              </button>
              <button ref={nextRef} className="flex items-center justify-center w-11 h-11 rounded-full border-2 border-[#22282F] hover:bg-[#22282F] hover:text-white transition-colors group" aria-label="Next slide">
                <ChevronRightIcon />
              </button>
            </div>
          </div>
        </div>

        <p className="text-[13px] mb-8 sm:hidden" style={{ color: '#5B67759C' }}>
          For research purposes only. Not intended for human consumption. For use by professionals only.
        </p>

        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={10}
          slidesPerView={1}
          loop
          autoplay={{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }}
          navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
          onSwiper={handleSwiperInit}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
          className={swiperReady ? 'opacity-100 transition-opacity duration-300' : 'opacity-0'}
        >
          {products.map((product) => (
            <SwiperSlide key={product.slug}>
              <CarouselProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
