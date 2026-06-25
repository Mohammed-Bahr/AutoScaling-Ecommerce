import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import Product from "./models/productModel.js";
import Category from "./models/categoryModel.js";
import User from "./models/userModel.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ─── Configuration ───────────────────────────────────────────────────────────
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/depi-project";
const PRODUCTS_FILE = path.resolve(__dirname, "..", "DataSet", "products.json");

// ─── Category definitions (must match ObjectIds used in products.json) ──────
const categories = [
  { _id: "507f1f77bcf86cd799439011", name: "Electronics" },
  { _id: "507f1f77bcf86cd799439012", name: "Fashion" },
  { _id: "507f1f77bcf86cd799439013", name: "Home & Kitchen" },
  { _id: "507f1f77bcf86cd799439014", name: "Sports & Outdoors" },
  { _id: "507f1f77bcf86cd799439015", name: "Books" },
  { _id: "507f1f77bcf86cd799439016", name: "Beauty & Personal Care" },
  { _id: "507f1f77bcf86cd799439017", name: "Toys & Games" },
  { _id: "507f1f77bcf86cd799439018", name: "Automotive" },
  { _id: "507f1f77bcf86cd799439019", name: "Health & Wellness" },
  { _id: "507f1f77bcf86cd79943901a", name: "Office Supplies" },
];

// ─── User definitions (must match ObjectIds used in reviews) ────────────────
const users = [
  { _id: "507f1f77bcf86cd799439021", username: "Sarah Johnson",     email: "sarah.johnson@example.com",     password: "password123", isAdmin: false },
  { _id: "507f1f77bcf86cd799439022", username: "Michael Chen",      email: "michael.chen@example.com",      password: "password123", isAdmin: false },
  { _id: "507f1f77bcf86cd799439023", username: "Amanda Davis",      email: "amanda.davis@example.com",      password: "password123", isAdmin: false },
  { _id: "507f1f77bcf86cd799439024", username: "John Martinez",     email: "john.martinez@example.com",     password: "password123", isAdmin: false },
  { _id: "507f1f77bcf86cd799439025", username: "James Brown",       email: "james.brown@example.com",       password: "password123", isAdmin: false },
  { _id: "507f1f77bcf86cd799439026", username: "Christopher Lee",   email: "christopher.lee@example.com",   password: "password123", isAdmin: false },
  { _id: "507f1f77bcf86cd799439027", username: "David Kim",         email: "david.kim@example.com",         password: "password123", isAdmin: false },
  { _id: "507f1f77bcf86cd799439028", username: "Maria Garcia",      email: "maria.garcia@example.com",      password: "password123", isAdmin: false },
  { _id: "507f1f77bcf86cd799439029", username: "Jessica Williams",  email: "jessica.williams@example.com",  password: "password123", isAdmin: false },
  { _id: "507f1f77bcf86cd79943902a", username: "Ashley Harris",     email: "ashley.harris@example.com",     password: "password123", isAdmin: false },
  // Admin user with a distinct ID
  { _id: "507f1f77bcf86cd79943902b", username: "Admin",             email: "admin@example.com",             password: "admin123",    isAdmin: true },
];

// ─── Seed logic ──────────────────────────────────────────────────────────────
async function seed() {
  try {
    console.log("⏳ Connecting to MongoDB...");
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB\n");

    // ── 1. Drop existing data ──────────────────────────────────────────────
    console.log("🗑️  Dropping existing Products, Categories, and Users...");
    await Product.deleteMany({});
    await Category.deleteMany({});
    await User.deleteMany({});
    console.log("✅ Existing data cleared\n");

    // ── 2. Seed categories ─────────────────────────────────────────────────
    console.log("📁 Seeding categories...");
    await Category.insertMany(categories);
    console.log(`✅ ${categories.length} categories created\n`);

    // ── 3. Seed users ──────────────────────────────────────────────────────
    console.log("👤 Seeding users...");
    const hashedUsers = await Promise.all(
      users.map(async (u) => ({
        ...u,
        password: await bcrypt.hash(u.password, 10),
      }))
    );
    await User.insertMany(hashedUsers);
    console.log(`✅ ${users.length} users created\n`);

    // ── 4. Seed products ───────────────────────────────────────────────────
    console.log("📦 Seeding products...");

    // Read and parse the products JSON file
    const rawData = fs.readFileSync(PRODUCTS_FILE, "utf-8");
    const productsData = JSON.parse(rawData);

    // Transform: strip _id from reviews (Mongoose timestamps will add them)
    // and ensure timestamps are proper Date objects
    const products = productsData.map((p) => ({
      _id: p._id,
      name: p.name,
      image: p.image,
      brand: p.brand,
      quantity: p.quantity,
      category: p.category,
      description: p.description,
      reviews: (p.reviews || []).map((r) => ({
        name: r.name,
        rating: r.rating,
        comment: r.comment,
        user: r.user,
        createdAt: new Date(r.createdAt),
        updatedAt: new Date(r.updatedAt),
      })),
      rating: p.rating,
      numReviews: p.numReviews,
      price: p.price,
      countInStock: p.countInStock,
      createdAt: new Date(p.createdAt),
      updatedAt: new Date(p.updatedAt),
    }));

    await Product.insertMany(products);
    console.log(`✅ ${products.length} products imported\n`);

    // ── Summary ────────────────────────────────────────────────────────────
    console.log("═══════════════════════════════════════════");
    console.log("🎉  Seeding complete!");
    console.log(`   • ${categories.length} categories`);
    console.log(`   • ${users.length} users (1 admin)`);
    console.log(`   • ${products.length} products`);
    console.log("═══════════════════════════════════════════\n");

    // Admin credentials reminder
    console.log("🔑 Admin login:");
    console.log("   Email:    admin@example.com");
    console.log("   Password: admin123\n");

    process.exit(0);
  } catch (error) {
    console.error("\n❌ Seeding failed:", error.message);
    process.exit(1);
  }
}

seed();
