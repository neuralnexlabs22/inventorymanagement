import { ProductForm } from "@/features/products/product-form";
import { getCategories } from "@/features/categories/category.actions";

export const dynamic = "force-dynamic";

export default async function NewProductPage() {
  const [categories] = await Promise.all([
    getCategories(),
  ]);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Add New Product</h2>
        <p className="text-muted-foreground">Fill in the details to add a new product to inventory.</p>
      </div>
      <ProductForm 
        categories={categories}
      />
    </div>
  );
}
