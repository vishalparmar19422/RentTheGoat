import {
    getAllCars,
    rentCar,
    returnCar,
    addCar,
    updateCar,  
    deleteCar,
    rentedCars
} from "../controllers/carController.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";
import express from "express";

const router = express.Router();

router.get("/", getAllCars); // Anyone can view cars

router.get("/rentedcars", protect, rentedCars); // Renter only
router.post("/rent/:id", protect, rentCar); // Renter only
router.post("/return/:id", protect, returnCar); // Renter only



// Admin-only routes
router.post("/", protect, isAdmin, addCar);
router.put("/:id", protect, isAdmin, updateCar);
router.delete("/:id", protect, isAdmin, deleteCar);

export default router;
