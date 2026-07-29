import { getStockMovements } from "@/features/stock/stock.actions";
import { StockLedgerList } from "@/features/stock/stock-ledger-list";

export const dynamic = "force-dynamic";

export default async function StockLedgerPage() {
  const movements = await getStockMovements();

  return (
    <div className="w-full">
      <StockLedgerList movements={movements} />
    </div>
  );
}
