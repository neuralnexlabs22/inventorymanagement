import { ProductForm } from "@/features/products/product-form";
import { getCategories } from "@/features/categories/category.actions";
import { getProduct } from "@/features/products/product.actions";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function EditProductPage({ params }: { params: { id: string } }) {
  const [product, categories] = await Promise.all([
    getProduct(params.id),
    getCategories(),
  ]);

  if (!product) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Edit Product</h2>
        <p className="text-muted-foreground">Update the details for this product.</p>
      </div>
      <ProductForm 
        initialData={product}
        categories={categories}
      />
    </div>
  );
}
