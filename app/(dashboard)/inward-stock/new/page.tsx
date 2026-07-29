import { InwardForm } from "@/features/stock/inward-form";
import { getProducts } from "@/features/products/product.actions";

export const dynamic = "force-dynamic";

export default async function NewInwardStockPage() {
  const products = await getProducts();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Receive Inward Stock</h2>
        <p className="text-muted-foreground">Record new stock arriving into the inventory.</p>
      </div>
      <InwardForm products={products} />
    </div>
  );
}
