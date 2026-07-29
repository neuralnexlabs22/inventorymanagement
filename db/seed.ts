import { db } from "./index";
import { users, categories, products, inwardStock } from "./schema";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";

async function main() {
  console.log("Seeding database...");

  // 1. Check or create Admin User
  const existingUsers = await db.select().from(users).where(eq(users.username, "admin"));
  let adminId: string;

  if (existingUsers.length === 0) {
    const hashedPassword = await bcrypt.hash("admin123", 10);
    const [insertedUser] = await db.insert(users).values({
      fullName: "System Admin",
      username: "admin",
      email: "admin@erp.com",
      phone: "+1234567890",
      passwordHash: hashedPassword,
      role: "ADMIN",
      status: "ACTIVE",
    }).returning({ id: users.id });
    adminId = insertedUser.id;
    console.log("Created Admin User (Username: admin, Password: admin123)");
  } else {
    adminId = existingUsers[0].id;
    console.log("Admin user already exists.");
  }

  // 2. Categories
  const existingCategories = await db.select().from(categories);
  let categoryId = existingCategories[0]?.id;
  if (existingCategories.length === 0) {
    const [c] = await db.insert(categories).values({
      name: "Electronics",
      description: "Electronic devices and accessories",
    }).returning({ id: categories.id });
    categoryId = c.id;
    await db.insert(categories).values([
      { name: "Hardware", description: "Tools and construction hardware" },
      { name: "Office Supplies", description: "Stationery, papers, and ink" },
    ]);
    console.log("Seeded sample categories.");
  }

  // 3. Products
  const existingProducts = await db.select().from(products);
  if (existingProducts.length === 0 && categoryId) {
    await db.insert(products).values([
      {
        productCode: "PRD-001",
        barcode: "8901234567890",
        name: "Wireless Ergonomic Mouse",
        description: "2.4GHz wireless mouse with DPI control",
        categoryId,
        brand: "Logitech",
        unit: "pcs",
        costPrice: 25.00,
        currentStock: 0,
        minimumStock: 15,
        rackLocation: "A1-02",
        createdBy: adminId,
      },
      {
        productCode: "PRD-002",
        barcode: "8901234567891",
        name: '27" 4K Monitor',
        description: "IPS panel with USB-C hub",
        categoryId,
        brand: "Dell",
        unit: "pcs",
        costPrice: 250.00,
        currentStock: 0,
        minimumStock: 5,
        rackLocation: "B2-10",
        createdBy: adminId,
      },
    ]);
    console.log("Seeded sample products.");
  }

  console.log("Seeding complete!");
  process.exit(0);
}

main().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
