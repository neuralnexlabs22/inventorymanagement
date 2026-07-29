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
import { addOutwardStock } from "./stock.actions";
import { Card, CardContent } from "@/components/ui/card";

const formSchema = z.object({
  productId: z.string().min(1, "Product is required"),
  quantity: z.coerce.number().positive("Quantity must be greater than 0"),
  issuedTo: z.string().optional(),
  referenceNumber: z.string().optional(),
  remarks: z.string().optional(),
});

export function OutwardForm({ products }: { products: any[] }) {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProductStock, setSelectedProductStock] = useState<number | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productId: "",
      quantity: 1,
      issuedTo: "",
      referenceNumber: "",
      remarks: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      await addOutwardStock(values);
      toast({ title: "Outward stock recorded successfully." });
      router.push("/outward-stock");
      router.refresh();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Something went wrong.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  const handleProductChange = (val: string | null) => {
    if (!val) return;
    form.setValue("productId", val);
    const prod = products.find(p => p.id === val);
    if (prod) {
      setSelectedProductStock(prod.currentStock);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardContent className="pt-6 space-y-4">
            <h3 className="text-lg font-semibold mb-4">Stock Issuance Details</h3>
            
            <FormField
              control={form.control}
              name="productId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product</FormLabel>
                  <Select onValueChange={handleProductChange} value={field.value} disabled={isLoading}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Select Product" /></SelectTrigger></FormControl>
                    <SelectContent>
                      {products.map((p) => (
                        <SelectItem key={p.id} value={p.id} disabled={p.currentStock <= 0}>
                          {p.productCode} - {p.name} (Available: {p.currentStock})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity to Issue</FormLabel>
                    <FormControl><Input type="number" {...field} disabled={isLoading} /></FormControl>
                    {selectedProductStock !== null && (
                      <p className="text-xs text-slate-500 mt-1">Maximum available: {selectedProductStock}</p>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="issuedTo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Issued To (Person/Dept)</FormLabel>
                    <FormControl><Input placeholder="John Doe / Dept A" {...field} disabled={isLoading} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="referenceNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reference Number (Optional)</FormLabel>
                  <FormControl><Input placeholder="REQ-001" {...field} disabled={isLoading} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="remarks"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Remarks</FormLabel>
                  <FormControl><Textarea placeholder="Any notes regarding this stock issuance" {...field} disabled={isLoading} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button variant="outline" type="button" onClick={() => router.back()} disabled={isLoading}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading} className="bg-indigo-600 hover:bg-indigo-700">
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Confirm Outward Stock
          </Button>
        </div>
      </form>
    </Form>
  );
}
