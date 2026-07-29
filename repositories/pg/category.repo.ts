import { Category, ICategoryRepository } from "../interfaces";
import { db } from "@/db";
import { categories } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

export class PgCategoryRepository implements ICategoryRepository {
  async getCategories(): Promise<Category[]> {
    const data = await db
      .select()
      .from(categories)
      .orderBy(desc(categories.createdAt));
      
    return data as Category[];
  }

  async createCategory(data: Partial<Category>): Promise<void> {
    await db.insert(categories).values({
      name: data.name!,
      description: data.description,
      status: data.status || "ACTIVE",
    });
  }

  async updateCategory(id: string, data: Partial<Category>): Promise<void> {
    await db
      .update(categories)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(eq(categories.id, id));
  }

  async deleteCategory(id: string): Promise<void> {
    await db.delete(categories).where(eq(categories.id, id));
  }
}
