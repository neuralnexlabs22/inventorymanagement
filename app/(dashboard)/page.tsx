import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, ArrowDownToLine, ArrowUpFromLine, DollarSign, AlertTriangle, Layers, ArrowUpRight, Plus, Activity } from "lucide-react";
import { getDashboardStats } from "@/features/dashboard/dashboard.actions";
import { getStockMovements } from "@/features/stock/stock.actions";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { format } from "date-fns";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const stats = await getDashboardStats();
  const recentMovements = (await getStockMovements()).slice(0, 5);
  const todayStr = format(new Date(), "EEEE, MMMM d, yyyy");

  return (
    <div className="flex flex-col gap-8">
      {/* Top Executive Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200/60 pb-6 dark:border-slate-800/60">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">Stock Dashboard</h1>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-800 dark:bg-indigo-950/60 dark:text-indigo-300">
              Live
            </span>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Real-time stock insights for {todayStr}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/inward-stock" className={buttonVariants({ variant: "outline", size: "sm" }) + " h-9 gap-1.5 font-medium border-emerald-200 text-emerald-700 hover:bg-emerald-50"}>
            <ArrowDownToLine className="h-4 w-4" /> Receive Inward
          </Link>
          <Link href="/outward-stock" className={buttonVariants({ variant: "default", size: "sm" }) + " h-9 gap-1.5 bg-indigo-600 hover:bg-indigo-700 font-semibold text-white shadow-md shadow-indigo-500/20"}>
            <ArrowUpFromLine className="h-4 w-4" /> Issue Outward
          </Link>
        </div>
      </div>

      {/* Primary KPI Cards */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {/* Card 1: Inventory Value */}
        <Card className="stat-card-hover border border-slate-200/80 dark:border-slate-800 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-bl-full pointer-events-none" />
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Total Inventory Value</CardTitle>
            <div className="h-9 w-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <DollarSign className="h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-extrabold text-slate-900 dark:text-white">
              ${stats.inventoryValue.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mt-2">
              <span>{stats.totalStockQuantity.toLocaleString()} total units in stock</span>
            </div>
          </CardContent>
        </Card>

        {/* Card 2: Total Products */}
        <Card className="stat-card-hover border border-slate-200/80 dark:border-slate-800 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 rounded-bl-full pointer-events-none" />
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Catalog Products</CardTitle>
            <div className="h-9 w-9 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center">
              <Package className="h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-extrabold text-slate-900 dark:text-white">
              {stats.totalProducts} <span className="text-sm font-normal text-slate-500">Items</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs mt-2 font-medium">
              <span className="text-slate-500 flex items-center gap-1">
                <Layers className="h-3.5 w-3.5" /> Across {stats.totalCategories} categories
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Card 3: Today Inward */}
        <Card className="stat-card-hover border border-slate-200/80 dark:border-slate-800 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-bl-full pointer-events-none" />
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Today's Inward</CardTitle>
            <div className="h-9 w-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <ArrowDownToLine className="h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-extrabold text-slate-900 dark:text-white">
              {stats.todayInwardQuantity} <span className="text-sm font-normal text-slate-500">Units</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-emerald-600 mt-2 font-medium">
              <span>Stock received today</span>
            </div>
          </CardContent>
        </Card>

        {/* Card 4: Low Stock Alert */}
        <Card className="stat-card-hover border border-slate-200/80 dark:border-slate-800 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/5 rounded-bl-full pointer-events-none" />
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Low Stock Alerts</CardTitle>
            <div className="h-9 w-9 rounded-xl bg-red-50 dark:bg-red-950/60 text-red-600 dark:text-red-400 flex items-center justify-center">
              <AlertTriangle className="h-5 w-5" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-extrabold text-slate-900 dark:text-white">
              {stats.lowStockCount + stats.outOfStockCount} <span className="text-sm font-normal text-slate-500">Items</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-red-500 mt-2 font-medium">
              <span>{stats.outOfStockCount} completely out of stock</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Analytics & Recent Feed Grid */}
      <div className="grid gap-6 lg:grid-cols-7">
        
        {/* Placeholder for future Chart (if needed, otherwise leave as empty area or remove DashboardCharts component which was tied to sales) */}
        <Card className="lg:col-span-4 border border-slate-200/80 dark:border-slate-800 shadow-sm flex items-center justify-center p-12 text-slate-400 text-sm">
          [Stock Value & Movement Chart Placeholder]
        </Card>

        {/* Recent Stock Movements Feed */}
        <Card className="lg:col-span-3 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg font-bold">Recent Movements</CardTitle>
              <p className="text-xs text-slate-500 dark:text-slate-400">Latest inward and outward actions</p>
            </div>
            <Link href="/stock-ledger" className={buttonVariants({ variant: "ghost", size: "sm" }) + " text-xs text-indigo-600 hover:text-indigo-700 font-medium"}>
              Ledger <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
            </Link>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {recentMovements.length === 0 ? (
                <div className="text-center py-10 text-slate-400">
                  <Activity className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No stock movements recorded yet.</p>
                </div>
              ) : (
                recentMovements.map((mov) => (
                  <div key={mov.id} className="py-3 flex items-center justify-between first:pt-0 last:pb-0 hover:bg-slate-50/80 dark:hover:bg-slate-800/40 p-2 rounded-lg transition-all">
                    <div className="flex items-center gap-3">
                      <div className={`h-9 w-9 rounded-full font-bold text-xs flex items-center justify-center border ${
                        mov.movementType === 'IN' 
                          ? 'bg-emerald-100 border-emerald-200 text-emerald-700 dark:bg-emerald-950/40 dark:border-emerald-800'
                          : 'bg-indigo-100 border-indigo-200 text-indigo-700 dark:bg-indigo-950/40 dark:border-indigo-800'
                      }`}>
                        {mov.movementType}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-slate-900 dark:text-white leading-snug">
                          {mov.productName}
                        </span>
                        <span className="text-xs text-slate-400 font-mono">
                          {mov.productCode}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-1">
                      <span className={`text-sm font-bold ${
                        mov.movementType === 'IN' ? 'text-emerald-600' : 'text-slate-900 dark:text-white'
                      }`}>
                        {mov.movementType === 'IN' ? '+' : '-'}{mov.quantity}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        Bal: {mov.balanceStock}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
