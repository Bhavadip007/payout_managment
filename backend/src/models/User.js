import mongoose from "mongoose";

const schema = new mongoose.Schema({
  email: String,
  password: String,
  role: { type: String, enum: ["OPS", "FINANCE"] }
});

export default mongoose.model("User", schema);