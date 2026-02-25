import ProductCarousel from './ProductCarousel';
import { useNewProducts } from '../hooks/useProducts';

export default function NewProducts({ title = 'New Products' }: { title?: string }) {
  const { products, loading } = useNewProducts();
  return <ProductCarousel title={title} products={products} loading={loading} />;
}
