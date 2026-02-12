import express from "express";
import { createBooking, getAllBookings, confirmBooking, cancelBooking } from "../controllers/bookingController.js";
import { protectAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// PUBLIC
router.post("/", createBooking);

// ADMIN (JWT protected)
router.get("/", protectAdmin, getAllBookings);
router.put("/:id/confirm", protectAdmin, confirmBooking);
router.put("/:id/cancel", protectAdmin, cancelBooking);

export default router;
