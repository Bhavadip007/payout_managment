import express from "express";
import {
  createPayout,
  getPayouts,
  getPayoutById,
  submitPayout,
  approvePayout,
  rejectPayout
} from "../controllers/payoutController.js";

import { auth } from "../middleware/auth.js";
import { allowRoles } from "../middleware/role.js";

const router = express.Router();

router.get("/", auth, getPayouts);
router.get("/:id", auth, getPayoutById);

router.post("/", auth, allowRoles("OPS"), createPayout);
router.post("/:id/submit", auth, allowRoles("OPS"), submitPayout);

router.post("/:id/approve", auth, allowRoles("FINANCE"), approvePayout);
router.post("/:id/reject", auth, allowRoles("FINANCE"), rejectPayout);

export default router;