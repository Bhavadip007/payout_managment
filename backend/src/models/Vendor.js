import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: { type: String, required: true },
  upi_id: String,
  bank_account: String,
  ifsc: String,
  is_active: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model("Vendor", schema);