import mongoose from "mongoose";

const schema = new mongoose.Schema({
  vendor_id: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor" },
  amount: { type: Number, required: true },
  mode: { type: String, enum: ["UPI", "IMPS", "NEFT"] },
  note: String,
  status: {
    type: String,
    enum: ["Draft", "Submitted", "Approved", "Rejected"],
    default: "Draft"
  },
  decision_reason: String
}, { timestamps: true });

export default mongoose.model("Payout", schema);