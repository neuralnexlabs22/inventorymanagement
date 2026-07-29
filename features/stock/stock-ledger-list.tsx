"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Search, Activity } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export function StockLedgerList({ movements }: { movements: any[] }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMovements = movements.filter(
    (m) =>
      m.productName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.productCode?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.referenceNumber?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header & Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200/60 pb-5 dark:border-slate-800/60">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">Stock Ledger</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Complete timeline of all stock movements (Inwards and Outwards)
          </p>
        </div>
      </div>

      {/* Filter / Search Bar */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search product name, code, reference..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-10 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-xl"
          />
        </div>
      </div>

      {/* Table Card */}
      <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50/80 dark:bg-slate-800/50">
            <TableRow>
              <TableHead className="font-bold text-xs uppercase tracking-wider text-slate-500">Date</TableHead>
              <TableHead className="font-bold text-xs uppercase tracking-wider text-slate-500">Product</TableHead>
              <TableHead className="font-bold text-xs uppercase tracking-wider text-slate-500 text-center">Type</TableHead>
              <TableHead className="font-bold text-xs uppercase tracking-wider text-slate-500 text-right">Quantity</TableHead>
              <TableHead className="font-bold text-xs uppercase tracking-wider text-slate-500 text-right">Balance Stock</TableHead>
              <TableHead className="font-bold text-xs uppercase tracking-wider text-slate-500">Reference</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMovements.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-12 text-slate-400">
                  <Activity className="h-10 w-10 mx-auto mb-2 opacity-40" />
                  <p className="text-sm font-medium">No stock movements found.</p>
                </TableCell>
              </TableRow>
            ) : (
              filteredMovements.map((movement) => (
                <TableRow key={movement.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors">
                  <TableCell className="text-sm font-medium text-slate-900 dark:text-white">
                    {format(new Date(movement.createdAt), "MMM d, yyyy HH:mm")}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-semibold text-slate-900 dark:text-white">{movement.productName}</span>
                      <span className="text-xs font-mono text-slate-400">{movement.productCode}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant="outline" className={movement.movementType === 'IN' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-indigo-50 text-indigo-700 border-indigo-200'}>
                      {movement.movementType === 'IN' ? 'INWARD' : 'OUTWARD'}
                    </Badge>
                  </TableCell>
                  <TableCell className={`text-right font-bold ${movement.movementType === 'IN' ? 'text-emerald-600' : 'text-indigo-600'}`}>
                    {movement.movementType === 'IN' ? '+' : '-'}{movement.quantity}
                  </TableCell>
                  <TableCell className="text-right font-extrabold text-slate-900 dark:text-white">
                    {movement.balanceStock}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="text-sm text-slate-700 dark:text-slate-300">{movement.referenceNumber || "-"}</span>
                      {movement.remarks && <span className="text-xs text-slate-400 truncate max-w-[150px]">{movement.remarks}</span>}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
