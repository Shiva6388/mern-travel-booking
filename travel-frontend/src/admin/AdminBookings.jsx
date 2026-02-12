import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  const fetchBookings = async () => {
    try {
      const res = await API.get("/bookings");
      setBookings(res.data.data);
    } catch (error) {
      alert("Unauthorized");
      localStorage.removeItem("adminToken");
      navigate("/admin/login");
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("adminToken")) {
      navigate("/admin/login");
      return;
    }
    fetchBookings();
  }, []);

  const updateStatus = async (id, action) => {
    try {
      await API.put(`/bookings/${id}/${action}`);
      fetchBookings(); // refresh list
    } catch {
      alert("Action failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Manage Bookings</h1>

      <div className="space-y-4 max-w-4xl">
        {bookings.map((b) => (
          <div
            key={b._id}
            className="bg-gray-900 p-4 rounded flex justify-between items-center"
          >
            <div>
              <p className="font-bold">{b.name}</p>
              <p className="text-sm text-gray-400">
                {b.trip?.title} • {b.persons} persons
              </p>
              <p className="text-sm">Status: {b.status}</p>
            </div>

            <div className="space-x-2">
              {b.status === "PENDING" && (
                <>
                  <button
                    onClick={() => updateStatus(b._id, "confirm")}
                    className="bg-green-600 px-3 py-1 rounded"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => updateStatus(b._id, "cancel")}
                    className="bg-red-600 px-3 py-1 rounded"
                  >
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
