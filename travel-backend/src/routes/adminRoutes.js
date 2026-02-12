import express from "express";
import { registerAdmin, loginAdmin, getDashboardStats } from "../controllers/adminController.js";
import { protectAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Register admin (one time)
router.post("/register", registerAdmin);

// Login admin
router.post("/login", loginAdmin);

router.get("/dashboard", protectAdmin, getDashboardStats);

export default router;
