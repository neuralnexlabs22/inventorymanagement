"use server";

import { getRepositories } from "@/repositories";
import { revalidatePath } from "next/cache";
import { Product } from "@/repositories/interfaces";

export async function getProducts() {
  const { products } = getRepositories();
  return await products.getProducts();
}

export async function getProduct(id: string) {
  const { products } = getRepositories();
  return await products.getProductById(id);
}

export async function createProduct(data: Partial<Product>) {
  const { products } = getRepositories();
  await products.createProduct(data);
  revalidatePath("/products");
}

export async function updateProduct(id: string, data: Partial<Product>) {
  const { products } = getRepositories();
  await products.updateProduct(id, data);
  revalidatePath("/products");
}

export async function deleteProduct(id: string) {
  const { products } = getRepositories();
  await products.deleteProduct(id);
  revalidatePath("/products");
}
