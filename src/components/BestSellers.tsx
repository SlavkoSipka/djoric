import ProductCarousel from './ProductCarousel';
import { useBestSellers } from '../hooks/useProducts';

export default function BestSellers() {
  const { products, loading } = useBestSellers();
  return <ProductCarousel title="Bestsellers" products={products} loading={loading} />;
}
