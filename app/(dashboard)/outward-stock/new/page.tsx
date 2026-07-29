import { OutwardForm } from "@/features/stock/outward-form";
import { getProducts } from "@/features/products/product.actions";

export const dynamic = "force-dynamic";

export default async function NewOutwardStockPage() {
  const products = await getProducts();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Issue Outward Stock</h2>
        <p className="text-muted-foreground">Record stock leaving the inventory.</p>
      </div>
      <OutwardForm products={products} />
    </div>
  );
}
