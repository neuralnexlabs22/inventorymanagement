import fs from "fs";
import path from "path";
import crypto from "crypto";
import { Category, InwardStock, OutwardStock, Product, StockMovement } from "../interfaces";

const DB_FILE = path.join(process.cwd(), "data", "local-db.json");

interface LocalDbSchema {
  categories: Category[];
  products: Product[];
  inwardStock: InwardStock[];
  outwardStock: OutwardStock[];
  stockMovements: StockMovement[];
}

const defaultData: LocalDbSchema = {
  categories: [
    {
      id: "cat-1",
      name: "Electronics",
      description: "Electronic devices and accessories",
      status: "ACTIVE",
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ],
  products: [
    {
      id: "prod-1",
      productCode: "PRD-001",
      barcode: "8901234567890",
      name: "Wireless Ergonomic Mouse",
      description: "2.4GHz wireless mouse with DPI control",
      categoryId: "cat-1",
      brand: "Logitech",
      unit: "pcs",
      costPrice: 25.00,
      currentStock: 0,
      minimumStock: 15,
      rackLocation: "A1-02",
      status: "ACTIVE",
      createdBy: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ],
  inwardStock: [],
  outwardStock: [],
  stockMovements: []
};

// Ensure directory and file exists
function ensureDb() {
  const dir = path.dirname(DB_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify(defaultData, null, 2), "utf8");
  }
}

export function getDbData(): LocalDbSchema {
  ensureDb();
  try {
    const raw = fs.readFileSync(DB_FILE, "utf8");
    const data = JSON.parse(raw);
    
    // Revive dates
    const reviver = (key: string, value: any) => {
      if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(value)) {
        return new Date(value);
      }
      return value;
    };
    
    return JSON.parse(raw, reviver) as LocalDbSchema;
  } catch (error) {
    console.error("Failed to read local DB, returning default.", error);
    return defaultData;
  }
}

export function saveDbData(data: LocalDbSchema) {
  ensureDb();
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), "utf8");
}

export function generateId(): string {
  return crypto.randomUUID();
}
