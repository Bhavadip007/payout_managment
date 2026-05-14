import express from "express";
import { getVendors, createVendor } from "../controllers/vendorController.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.get("/", auth, getVendors);
router.post("/", auth, createVendor);

export default router;