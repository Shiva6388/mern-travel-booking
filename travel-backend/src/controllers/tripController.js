import Trip from "../models/Trip.js";

// ✅ GET ALL TRIPS
export const getAllTrips = async (req, res) => {
  try {
    const trips = await Trip.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      data: trips,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ✅ CREATE TRIP
export const createTrip = async (req, res) => {
  try {
    const {
      title,
      destination,
      price,
      seatsTotal,
      startDate,
      endDate,
      description,
    } = req.body;

    if (
      !title ||
      !destination ||
      !price ||
      !seatsTotal ||
      !startDate ||
      !endDate ||
      !description
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (end <= start) {
      return res.status(400).json({
        success: false,
        message: "End date must be after start date",
      });
    }

    const durationDays =
      Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
    const durationNights = durationDays - 1;

    const trip = await Trip.create({
      title,
      destination,
      pricePerPerson: price,
      seatsTotal,
      seatsBooked: 0,
      startDate,
      endDate,
      durationDays,
      durationNights,
      description,
    });

    res.status(201).json({
      success: true,
      message: "Trip created successfully",
      data: trip,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE TRIP (ADMIN)
export const updateTrip = async (req, res) => {
  try {
    const { id } = req.params;

    const trip = await Trip.findById(id);
    if (!trip) {
      return res.status(404).json({
        success: false,
        message: "Trip not found",
      });
    }

    const {
      title,
      destination,
      price,
      seatsTotal,
      startDate,
      endDate,
      description,
    } = req.body;

    // update fields
    trip.title = title ?? trip.title;
    trip.destination = destination ?? trip.destination;
    trip.pricePerPerson = price ?? trip.pricePerPerson;
    trip.seatsTotal = seatsTotal ?? trip.seatsTotal;
    trip.description = description ?? trip.description;

    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      if (end <= start) {
        return res.status(400).json({
          success: false,
          message: "End date must be after start date",
        });
      }

      const durationDays =
        Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;

      trip.startDate = start;
      trip.endDate = end;
      trip.durationDays = durationDays;
      trip.durationNights = durationDays - 1;
    }

    await trip.save();

    res.json({
      success: true,
      message: "Trip updated successfully",
      data: trip,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE TRIP (ADMIN)
export const deleteTrip = async (req, res) => {
  try {
    const { id } = req.params;

    const trip = await Trip.findById(id);
    if (!trip) {
      return res.status(404).json({
        success: false,
        message: "Trip not found",
      });
    }

    await trip.deleteOne();

    res.json({
      success: true,
      message: "Trip deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



// ✅ GET SINGLE TRIP
export const getTripById = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);

    if (!trip) {
      return res.status(404).json({
        success: false,
        message: "Trip not found",
      });
    }

    res.json({
      success: true,
      data: trip,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
