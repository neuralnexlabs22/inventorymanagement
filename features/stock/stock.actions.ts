"use server";

import { getRepositories } from "@/repositories";
import { revalidatePath } from "next/cache";

export async function addInwardStock(data: {
  productId: string;
  quantity: number;
  costPrice: number;
  supplierName?: string;
  referenceNumber?: string;
  remarks?: string;
}) {
  const { stock } = getRepositories();
  await stock.addInwardStock(data);

  revalidatePath("/inward-stock");
  revalidatePath("/products");
  revalidatePath("/stock-ledger");
  revalidatePath("/inventory");
}

export async function addOutwardStock(data: {
  productId: string;
  quantity: number;
  issuedTo?: string;
  referenceNumber?: string;
  remarks?: string;
}) {
  const { stock } = getRepositories();
  await stock.addOutwardStock(data);

  revalidatePath("/outward-stock");
  revalidatePath("/products");
  revalidatePath("/stock-ledger");
  revalidatePath("/inventory");
}

export async function getInwardStock() {
  const { stock } = getRepositories();
  return await stock.getInwardStock();
}

export async function getOutwardStock() {
  const { stock } = getRepositories();
  return await stock.getOutwardStock();
}

export async function getStockMovements() {
  const { stock } = getRepositories();
  return await stock.getStockMovements();
}
