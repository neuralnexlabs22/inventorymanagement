"use server";

import { getRepositories } from "@/repositories";

export async function getDashboardStats() {
  const { dashboard } = getRepositories();
  return await dashboard.getDashboardStats();
}
