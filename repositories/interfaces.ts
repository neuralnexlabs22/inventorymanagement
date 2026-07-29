export interface Product {
  id: string;
  productCode: string;
  barcode: string | null;
  name: string;
  description: string | null;
  categoryId: string;
  brand: string | null;
  unit: string | null;
  costPrice: number;
  currentStock: number;
  minimumStock: number;
  rackLocation: string | null;
  status: "ACTIVE" | "INACTIVE";
  createdBy: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: string;
  name: string;
  description: string | null;
  status: "ACTIVE" | "INACTIVE";
  createdAt: Date;
  updatedAt: Date;
}

export interface InwardStock {
  id: string;
  productId: string;
  quantity: number;
  costPrice: number;
  supplierName: string | null;
  referenceNumber: string | null;
  remarks: string | null;
  date: Date;
}

export interface OutwardStock {
  id: string;
  productId: string;
  quantity: number;
  issuedTo: string | null;
  referenceNumber: string | null;
  remarks: string | null;
  date: Date;
}

export interface StockMovement {
  id: string;
  productId: string;
  movementType: "IN" | "OUT";
  quantity: number;
  balanceStock: number;
  referenceNumber: string | null;
  remarks: string | null;
  createdAt: Date;
}

// Data Transfer Objects (what the UI/actions expect)
export interface ProductListDTO extends Product {
  categoryName?: string;
}

export interface StockMovementDTO extends StockMovement {
  productName: string;
  productCode: string;
}

export interface InwardStockDTO extends InwardStock {
  productName: string;
  productCode: string;
}

export interface OutwardStockDTO extends OutwardStock {
  productName: string;
  productCode: string;
}

export interface DashboardStatsDTO {
  totalProducts: number;
  totalCategories: number;
  totalStockQuantity: number;
  inventoryValue: number;
  todayInwardQuantity: number;
  todayOutwardQuantity: number;
  lowStockCount: number;
  outOfStockCount: number;
}

export interface ICategoryRepository {
  getCategories(): Promise<Category[]>;
  createCategory(data: Partial<Category>): Promise<void>;
  updateCategory(id: string, data: Partial<Category>): Promise<void>;
  deleteCategory(id: string): Promise<void>;
}

export interface IProductRepository {
  getProducts(): Promise<ProductListDTO[]>;
  getProductById(id: string): Promise<Product | null>;
  createProduct(data: Partial<Product>): Promise<void>;
  updateProduct(id: string, data: Partial<Product>): Promise<void>;
  deleteProduct(id: string): Promise<void>;
}

export interface IStockRepository {
  addInwardStock(data: {
    productId: string;
    quantity: number;
    costPrice: number;
    supplierName?: string;
    referenceNumber?: string;
    remarks?: string;
  }): Promise<void>;
  
  addOutwardStock(data: {
    productId: string;
    quantity: number;
    issuedTo?: string;
    referenceNumber?: string;
    remarks?: string;
  }): Promise<void>;

  getInwardStock(): Promise<InwardStockDTO[]>;
  getOutwardStock(): Promise<OutwardStockDTO[]>;
  getStockMovements(): Promise<StockMovementDTO[]>;
}

export interface IDashboardRepository {
  getDashboardStats(): Promise<DashboardStatsDTO>;
}

export interface IRepositories {
  categories: ICategoryRepository;
  products: IProductRepository;
  stock: IStockRepository;
  dashboard: IDashboardRepository;
}
