import Payout from "../models/Payout.js";
import Audit from "../models/Audit.js";

export const createPayout = async (req, res) => {
  const { amount } = req.body;
  if (amount <= 0) return res.status(400).json({ msg: "Invalid amount" });

  const payout = await Payout.create(req.body);

  await Audit.create({
    payout_id: payout._id,
    action: "CREATED",
    user_id: req.user.id
  });

  res.json(payout);
};

export const getPayouts = async (req, res) => {
  const { status, vendor } = req.query;

  const filter = {};
  if (status) filter.status = status;
  if (vendor) filter.vendor_id = vendor;

  const payouts = await Payout.find(filter).populate("vendor_id");
  res.json(payouts);
};

export const getPayoutById = async (req, res) => {
  const payout = await Payout.findById(req.params.id).populate("vendor_id");
  const audits = await Audit.find({ payout_id: payout._id }).populate("user_id");

  res.json({ payout, audits });
};

export const submitPayout = async (req, res) => {
  const payout = await Payout.findById(req.params.id);

  if (payout.status !== "Draft") {
    return res.status(400).json({ msg: "Invalid status" });
  }

  payout.status = "Submitted";
  await payout.save();

  await Audit.create({
    payout_id: payout._id,
    action: "SUBMITTED",
    user_id: req.user.id
  });

  res.json(payout);
};

export const approvePayout = async (req, res) => {
  const payout = await Payout.findById(req.params.id);

  if (payout.status !== "Submitted") {
    return res.status(400).json({ msg: "Invalid status" });
  }

  payout.status = "Approved";
  await payout.save();

  await Audit.create({
    payout_id: payout._id,
    action: "APPROVED",
    user_id: req.user.id
  });

  res.json(payout);
};

export const rejectPayout = async (req, res) => {
  const { reason } = req.body;
  if (!reason) return res.status(400).json({ msg: "Reason required" });

  const payout = await Payout.findById(req.params.id);

  if (payout.status !== "Submitted") {
    return res.status(400).json({ msg: "Invalid status" });
  }

  payout.status = "Rejected";
  payout.decision_reason = reason;

  await payout.save();

  await Audit.create({
    payout_id: payout._id,
    action: "REJECTED",
    user_id: req.user.id
  });

  res.json(payout);
};