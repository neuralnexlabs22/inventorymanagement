import { IRepositories } from "./interfaces";

import { PgCategoryRepository } from "./pg/category.repo";
import { PgProductRepository } from "./pg/product.repo";
import { PgStockRepository } from "./pg/stock.repo";
import { PgDashboardRepository } from "./pg/dashboard.repo";

import { LocalCategoryRepository } from "./local/category.repo";
import { LocalProductRepository } from "./local/product.repo";
import { LocalStockRepository } from "./local/stock.repo";
import { LocalDashboardRepository } from "./local/dashboard.repo";

let repositories: IRepositories | null = null;

export function getRepositories(): IRepositories {
  if (repositories) return repositories;

  if (process.env.DATABASE_URL) {
    console.log("🚀 Using PostgreSQL Repositories");
    repositories = {
      categories: new PgCategoryRepository(),
      products: new PgProductRepository(),
      stock: new PgStockRepository(),
      dashboard: new PgDashboardRepository(),
    };
  } else {
    console.warn("⚠️ DATABASE_URL not found. Falling back to Local Development Mode (JSON Storage).");
    repositories = {
      categories: new LocalCategoryRepository(),
      products: new LocalProductRepository(),
      stock: new LocalStockRepository(),
      dashboard: new LocalDashboardRepository(),
    };
  }

  return repositories;
}
