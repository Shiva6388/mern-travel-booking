import express from "express";
import { getDashboardStats } from "../controllers/dashboardController.js";
import { protectAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// ADMIN DASHBOARD
router.get("/stats", protectAdmin, getDashboardStats);

export default router;
