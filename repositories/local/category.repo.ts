import { Category, ICategoryRepository } from "../interfaces";
import { getDbData } from "./db-store";

export class LocalCategoryRepository implements ICategoryRepository {
  async getCategories(): Promise<Category[]> {
    const data = getDbData();
    return data.categories.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async createCategory(categoryData: Partial<Category>): Promise<void> {
    const data = getDbData();
    const newCategory: Category = {
      ...categoryData,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
      status: categoryData.status || "ACTIVE",
    } as Category;
    data.categories.push(newCategory);
    const { saveDbData } = await import("./db-store");
    saveDbData(data);
  }

  async updateCategory(id: string, categoryData: Partial<Category>): Promise<void> {
    const data = getDbData();
    const index = data.categories.findIndex(c => c.id === id);
    if (index !== -1) {
      data.categories[index] = {
        ...data.categories[index],
        ...categoryData,
        updatedAt: new Date(),
      };
      const { saveDbData } = await import("./db-store");
      saveDbData(data);
    }
  }

  async deleteCategory(id: string): Promise<void> {
    const data = getDbData();
    data.categories = data.categories.filter(c => c.id !== id);
    const { saveDbData } = await import("./db-store");
    saveDbData(data);
  }
}
