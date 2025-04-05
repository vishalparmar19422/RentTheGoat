import Car from "../models/Car.js";
import User from "../models/User.js";

export const rentCar = async (req, res) => {
    const carId = req.params.id;

    try {
        const car = await Car.findById(carId);
        const user = await User.findById(req.user._id);

        if (!car || !user) {
            return res.status(404).json({ message: "Car or user not found" });
        }

        if (!car.available) {
            return res.status(400).json({ message: "Car is already rented" });
        }

        car.available = false;
        await car.save();

        user.rentedCars.push(car._id);
        await user.save();

        res.json({ message: "Car rented successfully", car });
    } catch (err) {
        res.status(500).json({ message: "Failed to rent car", error: err.message });
    }
};

export const returnCar = async (req, res) => {
    const carId = req.params.id;
  
    try {
      const car = await Car.findById(carId);
      const user = await User.findById(req.user._id);
  
      if (!car || !user) {
        return res.status(404).json({ message: "Car or user not found" });
      }
  
      if (!user.rentedCars.includes(car._id)) {
        return res.status(400).json({ message: "You haven't rented this car" });
      }
  
      car.available = true;
      await car.save();
  
      user.rentedCars = user.rentedCars.filter(
        (rentedId) => rentedId.toString() !== car._id.toString()
      );
      await user.save();
  
      res.json({ message: "Car returned successfully", car });
    } catch (err) {
      res.status(500).json({ message: "Failed to return car", error: err.message });
    }
  };
  


// @desc Add new car (Admin only)
export const addCar = async (req, res) => {
    try {
        const { name, brand, model, rentPerDay, image } = req.body;

        const newCar = new Car({
            name,
            brand,
            model,
            rentPerDay,
            image,
        });

        const savedCar = await newCar.save();
        res.status(201).json(savedCar);
    } catch (err) {
        res.status(500).json({ message: "Error adding car", error: err.message });
    }
};

// @desc Update car (Admin only)
export const updateCar = async (req, res) => {
    try {
        const carId = req.params.id;
        const updates = req.body;

        const updatedCar = await Car.findByIdAndUpdate(carId, updates, {
            new: true,
        });

        if (!updatedCar) {
            return res.status(404).json({ message: "Car not found" });
        }

        res.json(updatedCar);
    } catch (err) {
        res.status(500).json({ message: "Error updating car", error: err.message });
    }
};

// @desc Delete car (Admin only)
export const deleteCar = async (req, res) => {
    try {
        const carId = req.params.id;
        const deletedCar = await Car.findByIdAndDelete(carId);

        if (!deletedCar) {
            return res.status(404).json({ message: "Car not found" });
        }

        res.json({ message: "Car deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting car", error: err.message });
    }
};


export const getAllCars = async (req, res) => {
    try {
        const cars = await Car.find();
        res.json(cars);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch cars" });
    }
};