import { IProductRepository, Product, ProductListDTO } from "../interfaces";
import { getDbData, saveDbData, generateId } from "./db-store";

export class LocalProductRepository implements IProductRepository {
  async getProducts(): Promise<ProductListDTO[]> {
    const data = getDbData();
    return data.products.map(p => {
      const category = data.categories.find(c => c.id === p.categoryId);
      return {
        ...p,
        categoryName: category?.name,
      };
    }).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getProductById(id: string): Promise<Product | null> {
    const data = getDbData();
    return data.products.find(p => p.id === id) || null;
  }

  async createProduct(productData: Partial<Product>): Promise<void> {
    const data = getDbData();
    const newProduct: Product = {
      ...productData,
      id: generateId(),
      currentStock: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as Product;
    
    data.products.push(newProduct);
    saveDbData(data);
  }

  async updateProduct(id: string, productData: Partial<Product>): Promise<void> {
    const data = getDbData();
    const index = data.products.findIndex(p => p.id === id);
    if (index !== -1) {
      data.products[index] = {
        ...data.products[index],
        ...productData,
        updatedAt: new Date(),
      };
      saveDbData(data);
    }
  }

  async deleteProduct(id: string): Promise<void> {
    const data = getDbData();
    data.products = data.products.filter(p => p.id !== id);
    saveDbData(data);
  }
}
