import { IProductRepository, Product, ProductListDTO } from "../interfaces";
import { db } from "@/db";
import { products, categories } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

export class PgProductRepository implements IProductRepository {
  async getProducts(): Promise<ProductListDTO[]> {
    const data = await db
      .select({
        id: products.id,
        productCode: products.productCode,
        barcode: products.barcode,
        name: products.name,
        description: products.description,
        categoryId: products.categoryId,
        categoryName: categories.name,
        brand: products.brand,
        unit: products.unit,
        costPrice: products.costPrice,
        currentStock: products.currentStock,
        minimumStock: products.minimumStock,
        rackLocation: products.rackLocation,
        status: products.status,
        createdBy: products.createdBy,
        createdAt: products.createdAt,
        updatedAt: products.updatedAt,
      })
      .from(products)
      .leftJoin(categories, eq(products.categoryId, categories.id))
      .orderBy(desc(products.createdAt));
    
    // Ensure the return type strictly matches (specifically enum status casting)
    return data as ProductListDTO[];
  }

  async getProductById(id: string): Promise<Product | null> {
    const result = await db.select().from(products).where(eq(products.id, id)).limit(1);
    return (result[0] as Product) || null;
  }

  async createProduct(data: Partial<Product>): Promise<void> {
    await db.insert(products).values({
      productCode: data.productCode!,
      barcode: data.barcode,
      name: data.name!,
      description: data.description,
      categoryId: data.categoryId!,
      brand: data.brand,
      unit: data.unit,
      costPrice: data.costPrice || 0,
      currentStock: 0,
      minimumStock: data.minimumStock || 10,
      rackLocation: data.rackLocation,
      status: data.status || "ACTIVE",
    });
  }

  async updateProduct(id: string, data: Partial<Product>): Promise<void> {
    await db
      .update(products)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(eq(products.id, id));
  }

  async deleteProduct(id: string): Promise<void> {
    await db.delete(products).where(eq(products.id, id));
  }
}
