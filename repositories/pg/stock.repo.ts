import { IStockRepository, InwardStockDTO, OutwardStockDTO, StockMovementDTO } from "../interfaces";
import { db } from "@/db";
import { products, inwardStock, outwardStock, stockMovements } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

export class PgStockRepository implements IStockRepository {
  async addInwardStock(data: { productId: string; quantity: number; costPrice: number; supplierName?: string; referenceNumber?: string; remarks?: string; }): Promise<void> {
    const productRes = await db.select().from(products).where(eq(products.id, data.productId)).limit(1);
    const product = productRes[0];
    if (!product) throw new Error("Product not found");

    const newBalance = product.currentStock + data.quantity;

    await db.insert(inwardStock).values({
      productId: data.productId,
      quantity: data.quantity,
      costPrice: data.costPrice,
      supplierName: data.supplierName,
      referenceNumber: data.referenceNumber,
      remarks: data.remarks,
    });

    await db.update(products).set({
      currentStock: newBalance,
      costPrice: data.costPrice,
    }).where(eq(products.id, data.productId));

    await db.insert(stockMovements).values({
      productId: data.productId,
      movementType: "IN",
      quantity: data.quantity,
      balanceStock: newBalance,
      referenceNumber: data.referenceNumber,
      remarks: data.remarks,
    });
  }

  async addOutwardStock(data: { productId: string; quantity: number; issuedTo?: string; referenceNumber?: string; remarks?: string; }): Promise<void> {
    const productRes = await db.select().from(products).where(eq(products.id, data.productId)).limit(1);
    const product = productRes[0];
    if (!product) throw new Error("Product not found");

    if (product.currentStock < data.quantity) {
      throw new Error("Insufficient stock available");
    }

    const newBalance = product.currentStock - data.quantity;

    await db.insert(outwardStock).values({
      productId: data.productId,
      quantity: data.quantity,
      issuedTo: data.issuedTo,
      referenceNumber: data.referenceNumber,
      remarks: data.remarks,
    });

    await db.update(products).set({
      currentStock: newBalance,
    }).where(eq(products.id, data.productId));

    await db.insert(stockMovements).values({
      productId: data.productId,
      movementType: "OUT",
      quantity: data.quantity,
      balanceStock: newBalance,
      referenceNumber: data.referenceNumber,
      remarks: data.remarks,
    });
  }

  async getInwardStock(): Promise<InwardStockDTO[]> {
    const res = await db
      .select({
        id: inwardStock.id,
        productId: inwardStock.productId,
        productName: products.name,
        productCode: products.productCode,
        quantity: inwardStock.quantity,
        costPrice: inwardStock.costPrice,
        supplierName: inwardStock.supplierName,
        referenceNumber: inwardStock.referenceNumber,
        remarks: inwardStock.remarks,
        date: inwardStock.date,
      })
      .from(inwardStock)
      .leftJoin(products, eq(inwardStock.productId, products.id))
      .orderBy(desc(inwardStock.date));
      
    return res as InwardStockDTO[];
  }

  async getOutwardStock(): Promise<OutwardStockDTO[]> {
    const res = await db
      .select({
        id: outwardStock.id,
        productId: outwardStock.productId,
        productName: products.name,
        productCode: products.productCode,
        quantity: outwardStock.quantity,
        issuedTo: outwardStock.issuedTo,
        referenceNumber: outwardStock.referenceNumber,
        remarks: outwardStock.remarks,
        date: outwardStock.date,
      })
      .from(outwardStock)
      .leftJoin(products, eq(outwardStock.productId, products.id))
      .orderBy(desc(outwardStock.date));
      
    return res as OutwardStockDTO[];
  }

  async getStockMovements(): Promise<StockMovementDTO[]> {
    const res = await db
      .select({
        id: stockMovements.id,
        productId: stockMovements.productId,
        productName: products.name,
        productCode: products.productCode,
        movementType: stockMovements.movementType,
        quantity: stockMovements.quantity,
        balanceStock: stockMovements.balanceStock,
        referenceNumber: stockMovements.referenceNumber,
        remarks: stockMovements.remarks,
        createdAt: stockMovements.createdAt,
      })
      .from(stockMovements)
      .leftJoin(products, eq(stockMovements.productId, products.id))
      .orderBy(desc(stockMovements.createdAt));
      
    return res as StockMovementDTO[];
  }
}
