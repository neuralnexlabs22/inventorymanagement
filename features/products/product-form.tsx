"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { createProduct, updateProduct } from "./product.actions";
import { Card, CardContent } from "@/components/ui/card";

const formSchema = z.object({
  productCode: z.string().min(2, "Product code is required"),
  barcode: z.string().optional(),
  name: z.string().min(2, "Product name is required"),
  description: z.string().optional(),
  categoryId: z.string().min(1, "Category is required"),
  brand: z.string().optional(),
  unit: z.string().optional(),
  costPrice: z.coerce.number().min(0),
  minimumStock: z.coerce.number().min(0),
  rackLocation: z.string().optional(),
  status: z.enum(["ACTIVE", "INACTIVE"]),
});

export function ProductForm({
  initialData,
  categories,
}: {
  initialData?: any;
  categories: any[];
}) {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productCode: initialData?.productCode || "",
      barcode: initialData?.barcode || "",
      name: initialData?.name || "",
      description: initialData?.description || "",
      categoryId: initialData?.categoryId || "",
      brand: initialData?.brand || "",
      unit: initialData?.unit || "pcs",
      costPrice: initialData ? Number(initialData.costPrice) : 0,
      minimumStock: initialData?.minimumStock || 10,
      rackLocation: initialData?.rackLocation || "",
      status: initialData?.status || "ACTIVE",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      if (initialData) {
        await updateProduct(initialData.id, values);
        toast({ title: "Product updated successfully." });
      } else {
        await createProduct(values);
        toast({ title: "Product created successfully." });
      }
      router.push("/products");
      router.refresh();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="pt-6 space-y-4">
              <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                     <FormLabel>Product Name</FormLabel>
                     <FormControl><Input placeholder="Product name" {...field} disabled={isLoading} /></FormControl>
                     <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="productCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Code</FormLabel>
                      <FormControl><Input placeholder="PRD-001" {...field} disabled={isLoading} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="barcode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Barcode</FormLabel>
                      <FormControl><Input placeholder="1234567890" {...field} disabled={isLoading} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="categoryId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value} disabled={isLoading}>
                        <FormControl><SelectTrigger><SelectValue placeholder="Select Category" /></SelectTrigger></FormControl>
                        <SelectContent>
                          {categories.map((c) => (
                            <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="brand"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Brand</FormLabel>
                      <FormControl><Input placeholder="Brand name" {...field} disabled={isLoading} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl><Textarea placeholder="Product description" {...field} disabled={isLoading} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 space-y-4">
              <h3 className="text-lg font-semibold mb-4">Stock & Pricing</h3>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="costPrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cost Price</FormLabel>
                      <FormControl><Input type="number" step="0.01" {...field} disabled={isLoading} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="unit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Unit of Measure</FormLabel>
                      <FormControl><Input placeholder="pcs, kg, box" {...field} disabled={isLoading} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="minimumStock"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Minimum Stock Alert</FormLabel>
                      <FormControl><Input type="number" {...field} disabled={isLoading} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="rackLocation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rack Location</FormLabel>
                      <FormControl><Input placeholder="e.g. A1-Shelf-2" {...field} disabled={isLoading} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value} disabled={isLoading}>
                      <FormControl><SelectTrigger><SelectValue placeholder="Select Status" /></SelectTrigger></FormControl>
                      <SelectContent>
                        <SelectItem value="ACTIVE">Active</SelectItem>
                        <SelectItem value="INACTIVE">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end gap-4">
          <Button variant="outline" type="button" onClick={() => router.back()} disabled={isLoading}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {initialData ? "Update Product" : "Save Product"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
