import express from "express";
import { createTrip, getAllTrips, getTripById, updateTrip, deleteTrip, } from "../controllers/tripController.js";
import { protectAdmin } from "../middleware/authMiddleware.js";


const router = express.Router();

router.get("/", getAllTrips);
router.post("/", createTrip);
// GET /api/trips/:id
router.get("/:id", getTripById);
router.post("/", protectAdmin, createTrip);
router.put("/:id", protectAdmin, updateTrip);
router.delete("/:id", protectAdmin, deleteTrip);



export default router;
