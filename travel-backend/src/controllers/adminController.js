import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Trip from "../models/Trip.js";
import Booking from "../models/Booking.js";

export const getDashboardStats = async (req, res) => {
  try {
    const totalTrips = await Trip.countDocuments();

    const totalBookings = await Booking.countDocuments();

    const totalSeatsBooked = await Booking.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: "$persons" },
        },
      },
    ]);

    const totalRevenue = await Booking.aggregate([
      {
        $lookup: {
          from: "trips",
          localField: "trip",
          foreignField: "_id",
          as: "tripData",
        },
      },
      { $unwind: "$tripData" },
      {
        $group: {
          _id: null,
          revenue: {
            $sum: {
              $multiply: ["$persons", "$tripData.price"],
            },
          },
        },
      },
    ]);

    res.json({
      success: true,
      data: {
        totalTrips,
        totalBookings,
        totalSeatsBooked: totalSeatsBooked[0]?.total || 0,
        totalRevenue: totalRevenue[0]?.revenue || 0,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



export const registerAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ Check fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password required",
      });
    }

    // 2️⃣ Check admin already exists?
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: "Admin already exists",
      });
    }

    // 3️⃣ Password hash
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4️⃣ Save admin
    const admin = await Admin.create({
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: "Admin registered successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ Check fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password required",
      });
    }

    // 2️⃣ Find admin
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // 3️⃣ Compare password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // 4️⃣ Generate JWT token
    const token = jwt.sign(
      {
        id: admin._id,
        role: admin.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 5️⃣ Send token
    res.json({
      success: true,
      token,
      message: "Login successful",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

