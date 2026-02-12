import Booking from "../models/Booking.js";
import Trip from "../models/Trip.js";

export const createBooking = async (req, res) => {
  try {
    const { tripId, name, phone, email, persons } = req.body;

    // 1️⃣ Basic validation
    if (!tripId || !name || !phone || !persons) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be filled",
      });
    }

    // 2️⃣ Trip nikaalo
    const trip = await Trip.findById(tripId);

    if (!trip) {
      return res.status(404).json({
        success: false,
        message: "Trip not found",
      });
    }

    // 3️⃣ Seats availability check
    const availableSeats = trip.seatsTotal - trip.seatsBooked;

    if (persons > availableSeats) {
      return res.status(400).json({
        success: false,
        message: "Not enough seats available",
      });
    }

    // 4️⃣ Booking create karo
    const booking = await Booking.create({
      trip: tripId,
      name,
      phone,
      email,
      persons,
    });

    // 5️⃣ Seats update karo
    trip.seatsBooked += persons;
    await trip.save();

    // 6️⃣ Success response
    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ADMIN: Get all bookings
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("trip", "title destination")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ADMIN: Confirm booking
export const confirmBooking = async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    booking.status = "CONFIRMED";
    await booking.save();

    res.json({
      success: true,
      message: "Booking confirmed",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ADMIN: Cancel booking
export const cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    // Seats wapas free karo
    const trip = await Trip.findById(booking.trip);
    trip.seatsBooked -= booking.persons;
    await trip.save();

    booking.status = "CANCELLED";
    await booking.save();

    res.json({
      success: true,
      message: "Booking cancelled",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


