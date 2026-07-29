"use client";

import { useState } from "react";
import { format } from "date-fns";
import Link from "next/link";
import { MoreHorizontal, Plus, Pencil, Trash, Layers } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CategoryForm } from "./category-form";
import { deleteCategory } from "./category.actions";
import { useToast } from "@/hooks/use-toast";

type Category = {
  id: string;
  name: string;
  description: string | null;
  status: "ACTIVE" | "INACTIVE";
  createdAt: Date;
};

export function CategoryList({ categories }: { categories: Category[] }) {
  const { toast } = useToast();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  async function handleDelete(id: string) {
    if (confirm("Are you sure you want to delete this category?")) {
      await deleteCategory(id);
      toast({ title: "Category deleted successfully." });
    }
  }

  return (
    <div className="space-y-6">
      {/* Header & Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200/60 pb-5 dark:border-slate-800/60">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">Item Categories</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Organize products into functional catalog categories ({categories.length} total)
          </p>
        </div>
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger render={
            <Button className="bg-indigo-600 hover:bg-indigo-700 font-semibold shadow-md shadow-indigo-500/20">
              <Plus className="mr-2 h-4 w-4" /> Add Category
            </Button>
          } />
          <DialogContent className="sm:max-w-md rounded-2xl">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">Add New Category</DialogTitle>
            </DialogHeader>
            <CategoryForm onSuccess={() => setIsAddOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Edit Dialog */}
      <Dialog open={!!editingCategory} onOpenChange={(open) => !open && setEditingCategory(null)}>
        <DialogContent className="sm:max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Edit Category</DialogTitle>
          </DialogHeader>
          {editingCategory && (
            <CategoryForm
              initialData={editingCategory}
              onSuccess={() => setEditingCategory(null)}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Categories Table Card */}
      <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50/80 dark:bg-slate-800/50">
            <TableRow>
              <TableHead className="font-bold text-xs uppercase tracking-wider text-slate-500">Category Name</TableHead>
              <TableHead className="font-bold text-xs uppercase tracking-wider text-slate-500">Description</TableHead>
              <TableHead className="font-bold text-xs uppercase tracking-wider text-slate-500">Status</TableHead>
              <TableHead className="font-bold text-xs uppercase tracking-wider text-slate-500">Date Created</TableHead>
              <TableHead className="w-[80px] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-12 text-slate-400">
                  <Layers className="h-10 w-10 mx-auto mb-2 opacity-40" />
                  <p className="text-sm font-medium">No categories found. Click "Add Category" to create one.</p>
                </TableCell>
              </TableRow>
            ) : (
              categories.map((category) => (
                <TableRow key={category.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors">
                  <TableCell className="font-semibold text-slate-900 dark:text-white">
                    <Link 
                      href={`/products?category=${encodeURIComponent(category.name)}`}
                      className="hover:text-indigo-600 hover:underline transition-colors"
                      title="View all products in this category"
                    >
                      {category.name}
                    </Link>
                  </TableCell>
                  <TableCell className="text-xs text-slate-500 max-w-[250px] truncate">
                    {category.description || "-"}
                  </TableCell>
                  <TableCell>
                    <Badge variant={category.status === "ACTIVE" ? "default" : "outline"} className={category.status === "ACTIVE" ? "bg-indigo-600 hover:bg-indigo-700 text-xs" : "text-xs"}>
                      {category.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-xs text-slate-500">
                    {format(new Date(category.createdAt), "MMM d, yyyy")}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger render={<Button variant="ghost" className="h-8 w-8 p-0 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg" />}>
                        <MoreHorizontal className="h-4 w-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-40">
                        <div className="px-2 py-1.5 text-xs font-semibold text-slate-500">Actions</div>
                        <DropdownMenuItem onClick={() => setEditingCategory(category)}>
                          <Pencil className="mr-2 h-4 w-4 text-indigo-500" /> Edit Category
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDelete(category.id)}
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
