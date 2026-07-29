import { IStockRepository, InwardStockDTO, OutwardStockDTO, StockMovementDTO } from "../interfaces";
import { getDbData, saveDbData, generateId } from "./db-store";

export class LocalStockRepository implements IStockRepository {
  async addInwardStock(data: { productId: string; quantity: number; costPrice: number; supplierName?: string; referenceNumber?: string; remarks?: string; }): Promise<void> {
    const db = getDbData();
    const product = db.products.find(p => p.id === data.productId);
    if (!product) throw new Error("Product not found");

    const newBalance = product.currentStock + data.quantity;

    // Update product
    product.currentStock = newBalance;
    product.costPrice = data.costPrice;

    // Add Inward Record
    db.inwardStock.push({
      id: generateId(),
      productId: data.productId,
      quantity: data.quantity,
      costPrice: data.costPrice,
      supplierName: data.supplierName || null,
      referenceNumber: data.referenceNumber || null,
      remarks: data.remarks || null,
      date: new Date(),
    });

    // Add Stock Movement
    db.stockMovements.push({
      id: generateId(),
      productId: data.productId,
      movementType: "IN",
      quantity: data.quantity,
      balanceStock: newBalance,
      referenceNumber: data.referenceNumber || null,
      remarks: data.remarks || null,
      createdAt: new Date(),
    });

    saveDbData(db);
  }

  async addOutwardStock(data: { productId: string; quantity: number; issuedTo?: string; referenceNumber?: string; remarks?: string; }): Promise<void> {
    const db = getDbData();
    const product = db.products.find(p => p.id === data.productId);
    if (!product) throw new Error("Product not found");

    if (product.currentStock < data.quantity) {
      throw new Error("Insufficient stock available");
    }

    const newBalance = product.currentStock - data.quantity;

    // Update product
    product.currentStock = newBalance;

    // Add Outward Record
    db.outwardStock.push({
      id: generateId(),
      productId: data.productId,
      quantity: data.quantity,
      issuedTo: data.issuedTo || null,
      referenceNumber: data.referenceNumber || null,
      remarks: data.remarks || null,
      date: new Date(),
    });

    // Add Stock Movement
    db.stockMovements.push({
      id: generateId(),
      productId: data.productId,
      movementType: "OUT",
      quantity: data.quantity,
      balanceStock: newBalance,
      referenceNumber: data.referenceNumber || null,
      remarks: data.remarks || null,
      createdAt: new Date(),
    });

    saveDbData(db);
  }

  async getInwardStock(): Promise<InwardStockDTO[]> {
    const db = getDbData();
    return db.inwardStock.map(i => {
      const product = db.products.find(p => p.id === i.productId);
      return {
        ...i,
        productName: product?.name || "Unknown",
        productCode: product?.productCode || "Unknown",
      };
    }).sort((a, b) => b.date.getTime() - a.date.getTime());
  }

  async getOutwardStock(): Promise<OutwardStockDTO[]> {
    const db = getDbData();
    return db.outwardStock.map(o => {
      const product = db.products.find(p => p.id === o.productId);
      return {
        ...o,
        productName: product?.name || "Unknown",
        productCode: product?.productCode || "Unknown",
      };
    }).sort((a, b) => b.date.getTime() - a.date.getTime());
  }

  async getStockMovements(): Promise<StockMovementDTO[]> {
    const db = getDbData();
    return db.stockMovements.map(m => {
      const product = db.products.find(p => p.id === m.productId);
      return {
        ...m,
        productName: product?.name || "Unknown",
        productCode: product?.productCode || "Unknown",
      };
    }).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }
}
