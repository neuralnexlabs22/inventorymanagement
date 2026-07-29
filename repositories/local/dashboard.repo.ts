import { DashboardStatsDTO, IDashboardRepository } from "../interfaces";
import { getDbData } from "./db-store";

export class LocalDashboardRepository implements IDashboardRepository {
  async getDashboardStats(): Promise<DashboardStatsDTO> {
    const db = getDbData();
    
    let totalStockQuantity = 0;
    let inventoryValue = 0;
    let lowStockCount = 0;
    let outOfStockCount = 0;

    for (const p of db.products) {
      totalStockQuantity += p.currentStock;
      inventoryValue += p.currentStock * p.costPrice;
      if (p.currentStock === 0) {
        outOfStockCount++;
      } else if (p.currentStock <= p.minimumStock) {
        lowStockCount++;
      }
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayInwardQuantity = db.inwardStock
      .filter(i => new Date(i.date) >= today)
      .reduce((sum, i) => sum + i.quantity, 0);

    const todayOutwardQuantity = db.outwardStock
      .filter(o => new Date(o.date) >= today)
      .reduce((sum, o) => sum + o.quantity, 0);

    return {
      totalProducts: db.products.length,
      totalCategories: db.categories.length,
      totalStockQuantity,
      inventoryValue,
      todayInwardQuantity,
      todayOutwardQuantity,
      lowStockCount,
      outOfStockCount,
    };
  }
}
