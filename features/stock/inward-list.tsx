"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Plus, Search, ArrowDownToLine } from "lucide-react";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function InwardList({ records }: { records: any[] }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredRecords = records.filter(
    (r) =>
      r.productName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.productCode?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.referenceNumber?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header & Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200/60 pb-5 dark:border-slate-800/60">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">Inward Stock</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            History of all stock received into the inventory
          </p>
        </div>
        <Link href="/inward-stock/new" className={buttonVariants({ variant: "default" }) + " bg-emerald-600 hover:bg-emerald-700 font-semibold shadow-md shadow-emerald-500/20"}>
          <Plus className="mr-2 h-4 w-4" /> Receive Stock
        </Link>
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
              <TableHead className="font-bold text-xs uppercase tracking-wider text-slate-500 text-right">Quantity Received</TableHead>
              <TableHead className="font-bold text-xs uppercase tracking-wider text-slate-500 text-right">Cost Price</TableHead>
              <TableHead className="font-bold text-xs uppercase tracking-wider text-slate-500">Supplier & Ref</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRecords.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-12 text-slate-400">
                  <ArrowDownToLine className="h-10 w-10 mx-auto mb-2 opacity-40" />
                  <p className="text-sm font-medium">No inward stock records found.</p>
                </TableCell>
              </TableRow>
            ) : (
              filteredRecords.map((record) => (
                <TableRow key={record.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors">
                  <TableCell className="text-sm font-medium text-slate-900 dark:text-white">
                    {format(new Date(record.date), "MMM d, yyyy HH:mm")}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-semibold text-slate-900 dark:text-white">{record.productName}</span>
                      <span className="text-xs font-mono text-slate-400">{record.productCode}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                      +{record.quantity}
                    </span>
                  </TableCell>
                  <TableCell className="text-right font-extrabold text-slate-900 dark:text-white">
                    ${Number(record.costPrice).toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="text-sm text-slate-700 dark:text-slate-300">{record.supplierName || "-"}</span>
                      {record.referenceNumber && <span className="text-xs text-slate-400 font-mono">Ref: {record.referenceNumber}</span>}
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
