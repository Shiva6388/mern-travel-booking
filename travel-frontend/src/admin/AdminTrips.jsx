import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";


export default function AdminTrips() {

  const navigate = useNavigate();
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    try {
      const res = await API.get("/trips");
      setTrips(res.data.data);
    } catch (error) {
      console.error(error);
      alert("Failed to load trips");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this trip?")) return;

    try {
      await API.delete(`/trips/${id}`);
      setTrips(trips.filter((t) => t._id !== id));
    } catch (err) {
      alert("Failed to delete trip");
    }
  };


  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <h1 className="text-2xl font-bold mb-6">All Trips</h1>

      {trips.length === 0 ? (
        <p>No trips found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {trips.map((trip) => (
            <div key={trip._id} className="bg-gray-900 p-4 rounded-lg">
              <h2 className="text-xl font-semibold">{trip.title}</h2>

              <p className="text-gray-400">{trip.destination}</p>

              {/* ✅ FIXED HERE */}
              <p className="mt-2 text-green-400">₹{trip.pricePerPerson} / person</p>

              <p>
                Seats: {trip.seatsBooked}/{trip.seatsTotal}
              </p>

              <p className="text-sm text-gray-400 mt-1">
                {new Date(trip.startDate).toDateString()} →{" "}
                {new Date(trip.endDate).toDateString()}
              </p>
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => navigate(`/admin/edit-trip/${trip._id}`)}
                  className="bg-blue-600 px-3 py-1 rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(trip._id)}
                  className="bg-red-600 px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
