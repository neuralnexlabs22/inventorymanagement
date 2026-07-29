import { getInwardStock } from "@/features/stock/stock.actions";
import { InwardList } from "@/features/stock/inward-list";

export const dynamic = "force-dynamic";

export default async function InwardStockPage() {
  const records = await getInwardStock();

  return (
    <div className="w-full">
      <InwardList records={records} />
    </div>
  );
}
