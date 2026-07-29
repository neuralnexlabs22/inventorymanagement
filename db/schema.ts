import {
  pgTable,
  text,
  integer,
  doublePrecision,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Users
export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  fullName: varchar('full_name', { length: 255 }).notNull(),
  username: varchar('username', { length: 100 }).unique().notNull(),
  email: varchar('email', { length: 255 }).unique().notNull(),
  phone: varchar('phone', { length: 50 }),
  passwordHash: text('password_hash').notNull(),
  role: varchar('role', { length: 50 }).$type<'ADMIN' | 'MANAGER' | 'STAFF'>().default('STAFF').notNull(),
  status: varchar('status', { length: 50 }).$type<'ACTIVE' | 'INACTIVE'>().default('ACTIVE').notNull(),
  profilePicture: text('profile_picture'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Categories
export const categories = pgTable('categories', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  status: varchar('status', { length: 50 }).$type<'ACTIVE' | 'INACTIVE'>().default('ACTIVE').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Products
export const products = pgTable('products', {
  id: uuid('id').primaryKey().defaultRandom(),
  productCode: varchar('product_code', { length: 100 }).unique().notNull(),
  barcode: varchar('barcode', { length: 255 }),
  name: varchar('product_name', { length: 255 }).notNull(),
  categoryId: uuid('category_id').references(() => categories.id).notNull(),
  brand: varchar('brand', { length: 255 }),
  unit: varchar('unit', { length: 50 }),
  costPrice: doublePrecision('cost_price').notNull(),
  currentStock: integer('current_stock').default(0).notNull(),
  minimumStock: integer('minimum_stock').default(0).notNull(),
  rackLocation: varchar('rack_location', { length: 100 }),
  description: text('description'),
  image: text('image'),
  status: varchar('status', { length: 50 }).$type<'ACTIVE' | 'INACTIVE'>().default('ACTIVE').notNull(),
  createdBy: uuid('created_by').references(() => users.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Inward Stock
export const inwardStock = pgTable('inward_stock', {
  id: uuid('id').primaryKey().defaultRandom(),
  productId: uuid('product_id').references(() => products.id).notNull(),
  date: timestamp('date').defaultNow().notNull(),
  quantity: integer('quantity').notNull(),
  costPrice: doublePrecision('cost_price').notNull(),
  supplierName: varchar('supplier_name', { length: 255 }),
  referenceNumber: varchar('reference_number', { length: 255 }),
  remarks: text('remarks'),
  createdBy: uuid('created_by').references(() => users.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Outward Stock
export const outwardStock = pgTable('outward_stock', {
  id: uuid('id').primaryKey().defaultRandom(),
  productId: uuid('product_id').references(() => products.id).notNull(),
  date: timestamp('date').defaultNow().notNull(),
  quantity: integer('quantity').notNull(),
  issuedTo: varchar('issued_to', { length: 255 }),
  referenceNumber: varchar('reference_number', { length: 255 }),
  remarks: text('remarks'),
  createdBy: uuid('created_by').references(() => users.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Stock Movements
export const stockMovements = pgTable('stock_movements', {
  id: uuid('id').primaryKey().defaultRandom(),
  productId: uuid('product_id').references(() => products.id).notNull(),
  movementType: varchar('movement_type', { length: 50 }).$type<'IN' | 'OUT'>().notNull(),
  quantity: integer('quantity').notNull(),
  balanceStock: integer('balance_stock').notNull(),
  referenceNumber: varchar('reference_number', { length: 255 }),
  remarks: text('remarks'),
  createdBy: uuid('created_by').references(() => users.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Company Settings
export const companySettings = pgTable('company_settings', {
  id: integer('id').primaryKey(),
  companyName: varchar('company_name', { length: 255 }).notNull(),
  companyLogo: text('company_logo'),
  address: text('address'),
  phone: varchar('phone', { length: 50 }),
  email: varchar('email', { length: 255 }),
  currency: varchar('currency', { length: 50 }).default('USD'),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Relations
export const productsRelations = relations(products, ({ one }) => ({
  category: one(categories, {
    fields: [products.categoryId],
    references: [categories.id],
  }),
  createdBy: one(users, {
    fields: [products.createdBy],
    references: [users.id],
  }),
}));

export const inwardStockRelations = relations(inwardStock, ({ one }) => ({
  product: one(products, {
    fields: [inwardStock.productId],
    references: [products.id],
  }),
  createdBy: one(users, {
    fields: [inwardStock.createdBy],
    references: [users.id],
  }),
}));

export const outwardStockRelations = relations(outwardStock, ({ one }) => ({
  product: one(products, {
    fields: [outwardStock.productId],
    references: [products.id],
  }),
  createdBy: one(users, {
    fields: [outwardStock.createdBy],
    references: [users.id],
  }),
}));

export const stockMovementsRelations = relations(stockMovements, ({ one }) => ({
  product: one(products, {
    fields: [stockMovements.productId],
    references: [products.id],
  }),
  createdBy: one(users, {
    fields: [stockMovements.createdBy],
    references: [users.id],
  }),
}));
