import mongoose from "mongoose";

const schema = new mongoose.Schema({
  payout_id: { type: mongoose.Schema.Types.ObjectId, ref: "Payout" },
  action: String,
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

export default mongoose.model("Audit", schema);