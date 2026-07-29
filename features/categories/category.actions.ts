"use server";

import { getRepositories } from "@/repositories";
import { revalidatePath } from "next/cache";

export async function getCategories() {
  const { categories } = getRepositories();
  return await categories.getCategories();
}

export async function createCategory(data: any) {
  const { categories } = getRepositories();
  await categories.createCategory(data);
  revalidatePath("/categories");
}

export async function updateCategory(id: string, data: any) {
  const { categories } = getRepositories();
  await categories.updateCategory(id, data);
  revalidatePath("/categories");
}

export async function deleteCategory(id: string) {
  const { categories } = getRepositories();
  await categories.deleteCategory(id);
  revalidatePath("/categories");
}
