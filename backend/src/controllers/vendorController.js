import Vendor from "../models/Vendor.js";

export const getVendors = async (req, res) => {
  const vendors = await Vendor.find();
  res.json(vendors);
};

export const createVendor = async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ msg: "Name required" });

  const vendor = await Vendor.create(req.body);
  res.json(vendor);
};