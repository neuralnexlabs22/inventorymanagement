"use client";

import { useState } from "react";
import { MoreHorizontal, Plus, Pencil, Trash, Search, Package, AlertCircle } from "lucide-react";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteProduct } from "./product.actions";
import { useToast } from "@/hooks/use-toast";

export function ProductList({ products, initialSearchTerm = "" }: { products: any[], initialSearchTerm?: string }) {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.productCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.categoryName && p.categoryName.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const totalValuation = filteredProducts.reduce(
    (sum, p) => sum + (Number(p.costPrice || 0) * Number(p.currentStock || 0)),
    0
  );

  async function handleDelete(id: string) {
    if (confirm("Are you sure you want to delete this product?")) {
      await deleteProduct(id);
      toast({ title: "Product deleted successfully." });
    }
  }

  return (
    <div className="space-y-6">
      {/* Header & Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200/60 pb-5 dark:border-slate-800/60">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">Products Master</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Manage your master item catalog and stock levels ({products.length} total items)
          </p>
        </div>
        <Link href="/products/new" className={buttonVariants({ variant: "default" }) + " bg-indigo-600 hover:bg-indigo-700 font-semibold shadow-md shadow-indigo-500/20"}>
          <Plus className="mr-2 h-4 w-4" /> Add New Product
        </Link>
      </div>

      {/* Filter / Search Bar & Valuation Summary */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search by name, SKU code, category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-10 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-xl"
          />
        </div>
        <div className="bg-indigo-50/50 dark:bg-indigo-900/20 text-indigo-800 dark:text-indigo-300 px-5 py-2.5 rounded-xl border border-indigo-100 dark:border-indigo-800/30 flex items-center gap-3 shadow-sm">
          <span className="text-sm font-medium">Pending Stock Value:</span>
          <span className="text-xl font-extrabold tracking-tight">${totalValuation.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
        </div>
      </div>

      {/* Products Table Card */}
      <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50/80 dark:bg-slate-800/50">
            <TableRow>
              <TableHead className="font-bold text-xs uppercase tracking-wider text-slate-500">SKU / Code</TableHead>
              <TableHead className="font-bold text-xs uppercase tracking-wider text-slate-500">Product Name</TableHead>
              <TableHead className="font-bold text-xs uppercase tracking-wider text-slate-500">Category / Brand</TableHead>
              <TableHead className="font-bold text-xs uppercase tracking-wider text-slate-500 text-right">Cost Price</TableHead>
              <TableHead className="font-bold text-xs uppercase tracking-wider text-slate-500 text-right">Stock Level</TableHead>
              <TableHead className="font-bold text-xs uppercase tracking-wider text-slate-500">Status</TableHead>
              <TableHead className="w-[80px] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-12 text-slate-400">
                  <Package className="h-10 w-10 mx-auto mb-2 opacity-40" />
                  <p className="text-sm font-medium">No products found matching your filter.</p>
                </TableCell>
              </TableRow>
            ) : (
              filteredProducts.map((product) => (
                <TableRow key={product.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors">
                  <TableCell className="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400">
                    {product.productCode}
                  </TableCell>
                  <TableCell className="font-semibold text-slate-900 dark:text-white">
                    {product.name}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        {product.categoryName || "Uncategorized"}
                      </span>
                      {product.brand && (
                        <span className="text-xs text-slate-400">({product.brand})</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-extrabold text-slate-900 dark:text-white">
                    ${Number(product.costPrice).toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${
                      product.currentStock <= 5
                        ? "bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-300"
                        : product.currentStock <= 15
                        ? "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300"
                        : "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300"
                    }`}>
                      {product.currentStock <= 5 && <AlertCircle className="h-3 w-3 mr-1" />}
                      {product.currentStock} {product.unit || "units"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge variant={product.status === "ACTIVE" ? "default" : "outline"} className={product.status === "ACTIVE" ? "bg-indigo-600 hover:bg-indigo-700 text-xs" : "text-xs"}>
                      {product.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger render={<Button variant="ghost" className="h-8 w-8 p-0 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg" />}>
                        <MoreHorizontal className="h-4 w-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-40">
                        <div className="px-2 py-1.5 text-xs font-semibold text-slate-500">Actions</div>
                        <DropdownMenuItem render={<Link href={`/products/${product.id}/edit`} />}>
                          <Pencil className="mr-2 h-4 w-4 text-indigo-500" /> Edit Product
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDelete(product.id)}
                          className="text-red-600 focus:text-red-600 cursor-pointer"
                        >
                          <Trash className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
