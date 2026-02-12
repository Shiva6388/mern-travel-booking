import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

export default function TripDetails() {
  const { id } = useParams(); // URL se id nikali
  const [trip, setTrip] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/trips/${id}`)
      .then((res) => setTrip(res.data.data))
      .catch((err) => console.log(err));
  }, [id]);

  // Jab tak data load ho raha
  if (!trip) {
    return <p className="text-white p-6">Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <h1 className="text-4xl font-bold mb-2">{trip.title}</h1>
      <p className="text-gray-300">{trip.destination}</p>

      <p className="mt-4 text-lg">
        {trip.durationDays} Days / {trip.durationNights} Nights
      </p>

      <p className="mt-3 text-2xl font-bold text-green-400">
        ₹{trip.pricePerPerson} / person
      </p>

      <p className="mt-2 text-gray-400">
        Seats: {trip.seatsBooked}/{trip.seatsTotal}
      </p>
      <Link
        to={`/book/${trip._id}`}
        className="inline-block mt-6 bg-green-600 px-6 py-2 rounded"
      >
        Book Now
      </Link>
    </div>
  );
}
