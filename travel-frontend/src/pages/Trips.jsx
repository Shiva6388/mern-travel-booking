import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Trips() {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/trips")
      .then((res) => setTrips(res.data.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">
        Upcoming Trips from Lucknow 🚍
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {trips.map((trip) => (
          <Link to={`/trips/${trip._id}`} key={trip._id}>
            <div className="rounded-xl bg-gray-900 border border-gray-800 p-5 hover:scale-105 transition">
              <h2 className="text-xl font-semibold">{trip.title}</h2>
              <p className="text-gray-300">{trip.destination}</p>

              <p className="mt-2 text-sm text-gray-400">
                {trip.durationDays}D / {trip.durationNights}N
              </p>

              <p className="mt-3 font-bold text-green-400">
                ₹{trip.pricePerPerson} / person
              </p>

              <p className="mt-2 text-sm text-gray-400">
                Seats: {trip.seatsBooked}/{trip.seatsTotal}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
