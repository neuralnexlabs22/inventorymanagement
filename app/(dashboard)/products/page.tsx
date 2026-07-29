import { getProducts } from "@/features/products/product.actions";
import { ProductList } from "@/features/products/product-list";

export const dynamic = "force-dynamic";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const resolvedParams = await searchParams;
  const products = await getProducts();

  return (
    <div className="w-full">
      <ProductList products={products} initialSearchTerm={resolvedParams.category} />
    </div>
  );
}
