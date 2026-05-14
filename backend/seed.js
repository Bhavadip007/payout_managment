import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "./src/models/User.js";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);

await User.deleteMany();

await User.create([
  {
    email: "ops@demo.com",
    password: await bcrypt.hash("ops123", 10),
    role: "OPS"
  },
  {
    email: "finance@demo.com",
    password: await bcrypt.hash("fin123", 10),
    role: "FINANCE"
  }
]);

console.log("Seeded");
process.exit();