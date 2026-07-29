import { getDashboardStats } from "@/features/dashboard/dashboard.actions";
import { FileText, ArrowDownToLine, ArrowUpFromLine, Activity } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function ReportsPage() {
  const stats = await getDashboardStats();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Inventory Reports</h2>
        <p className="text-muted-foreground">Detailed summary of your inventory.</p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-100 text-indigo-600 rounded-lg dark:bg-indigo-900/30 dark:text-indigo-400">
              <FileText className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Valuation</p>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">${stats.inventoryValue.toFixed(2)}</h3>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-100 text-emerald-600 rounded-lg dark:bg-emerald-900/30 dark:text-emerald-400">
              <ArrowDownToLine className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Inward Qty (Today)</p>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{stats.todayInwardQuantity}</h3>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-amber-100 text-amber-600 rounded-lg dark:bg-amber-900/30 dark:text-amber-400">
              <ArrowUpFromLine className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Outward Qty (Today)</p>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{stats.todayOutwardQuantity}</h3>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-rose-100 text-rose-600 rounded-lg dark:bg-rose-900/30 dark:text-rose-400">
              <Activity className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Low Stock Items</p>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{stats.lowStockCount}</h3>
            </div>
          </div>
        </div>
      </div>
      
      <div className="rounded-xl border border-slate-200 bg-white p-12 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <FileText className="mx-auto h-12 w-12 text-slate-300 dark:text-slate-700" />
        <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">More Reports Coming Soon</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">Detailed PDF and Excel exports will be available here.</p>
      </div>
    </div>
  );
}
