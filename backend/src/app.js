import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import vendorRoutes from "./routes/vendorRoutes.js";
import payoutRoutes from "./routes/payoutRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/vendors", vendorRoutes);
app.use("/payouts", payoutRoutes);

export default app;