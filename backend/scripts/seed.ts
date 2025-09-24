// scripts/seed.ts
import dotenv from "dotenv";
import { connectDB } from "../src/utils/db";
import { User } from "../src/models/User";
dotenv.config();

async function seed() {
  await connectDB();

  // Remove existing admin with same email to avoid duplicate key error
  await User.deleteOne({ email: "admin@rentkar.com" });

  const admin = new User({
    name: "Admin User",
    email: "admin@rentkar.com",
    password: "Admin123!", // will be hashed by pre-save
    role: "admin",
    availability: true,
  });

  await admin.save();
  console.log("Admin created:", admin.email);
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed", err);
  process.exit(1);
});
