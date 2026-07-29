import { getOutwardStock } from "@/features/stock/stock.actions";
import { OutwardList } from "@/features/stock/outward-list";

export const dynamic = "force-dynamic";

export default async function OutwardStockPage() {
  const records = await getOutwardStock();

  return (
    <div className="w-full">
      <OutwardList records={records} />
    </div>
  );
}
