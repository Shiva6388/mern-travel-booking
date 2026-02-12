import mongoose from "mongoose";

const tripSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    destination: { type: String, required: true },

    pricePerPerson: { type: Number, required: true },

    seatsTotal: { type: Number, required: true },
    seatsBooked: { type: Number, default: 0 },

    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },

    durationDays: { type: Number, required: true },
    durationNights: { type: Number, required: true },

    description: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Trip", tripSchema);
