import Trip from "../models/Trip.js";
import Booking from "../models/Booking.js";

// ADMIN DASHBOARD STATS
export const getDashboardStats = async (req, res) => {
  try {
    // Total trips
    const totalTrips = await Trip.countDocuments();

    // Total bookings
    const totalBookings = await Booking.countDocuments();

    // Booking status wise counts
    const pendingBookings = await Booking.countDocuments({
      status: "PENDING",
    });

    const confirmedBookings = await Booking.countDocuments({
      status: "CONFIRMED",
    });

    const cancelledBookings = await Booking.countDocuments({
      status: "CANCELLED",
    });

    res.json({
      success: true,
      data: {
        totalTrips,
        totalBookings,
        pendingBookings,
        confirmedBookings,
        cancelledBookings,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
