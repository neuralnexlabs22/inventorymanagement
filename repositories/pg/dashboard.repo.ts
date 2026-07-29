import { DashboardStatsDTO, IDashboardRepository } from "../interfaces";
import { db } from "@/db";
import { products, inwardStock, outwardStock, categories } from "@/db/schema";
import { count, sum, sql, eq } from "drizzle-orm";

export class PgDashboardRepository implements IDashboardRepository {
  async getDashboardStats(): Promise<DashboardStatsDTO> {
    const [totalProducts] = await db.select({ value: count() }).from(products);
    const [totalCategories] = await db.select({ value: count() }).from(categories);
    
    const [stockStats] = await db.select({
      totalQuantity: sum(products.currentStock),
      inventoryValue: sql<number>`sum(${products.currentStock} * ${products.costPrice})`,
    }).from(products);

    const [lowStock] = await db.select({ value: count() })
      .from(products)
      .where(sql`${products.currentStock} > 0 AND ${products.currentStock} <= ${products.minimumStock}`);
      
    const [outOfStock] = await db.select({ value: count() })
      .from(products)
      .where(eq(products.currentStock, 0));

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [todayInward] = await db.select({ value: sum(inwardStock.quantity) })
      .from(inwardStock)
      .where(sql`${inwardStock.date} >= ${today.toISOString()}`);
      
    const [todayOutward] = await db.select({ value: sum(outwardStock.quantity) })
      .from(outwardStock)
      .where(sql`${outwardStock.date} >= ${today.toISOString()}`);

    return {
      totalProducts: Number(totalProducts.value) || 0,
      totalCategories: Number(totalCategories.value) || 0,
      totalStockQuantity: Number(stockStats.totalQuantity) || 0,
      inventoryValue: Number(stockStats.inventoryValue) || 0,
      todayInwardQuantity: Number(todayInward.value) || 0,
      todayOutwardQuantity: Number(todayOutward.value) || 0,
      lowStockCount: Number(lowStock.value) || 0,
      outOfStockCount: Number(outOfStock.value) || 0,
    };
  }
}
