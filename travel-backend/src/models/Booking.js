import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    // Kaunsi trip book ho rahi hai
    trip: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trip",
      required: true,
    },

    // Customer details
    name: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    email: {
      type: String,
    },

    persons: {
      type: Number,
      required: true,
    },

    // Booking status
    status: {
      type: String,
      enum: ["PENDING", "CONFIRMED", "CANCELLED"],
      default: "PENDING",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
