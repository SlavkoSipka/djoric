import ProductCarousel from './ProductCarousel';
import { useProducts } from '../hooks/useProducts';

export default function PeptideProducts({ title = 'Peptide Products' }: { title?: string }) {
  const { products, loading } = useProducts();
  return <ProductCarousel title={title} products={products} loading={loading} />;
}
