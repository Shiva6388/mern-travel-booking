import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");

    if (!token) {
      navigate("/admin/login");
      return;
    }

    axios
      .get("http://localhost:5000/api/dashboard/stats", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setStats(res.data.data))
      .catch(() => {
        alert("Unauthorized");
        localStorage.removeItem("adminToken");
        navigate("/admin/login");
      });
  }, []);

  if (!stats) {
    return <p className="text-white p-6">Loading...</p>;
  }
  const logout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-2 gap-4 max-w-xl">
        <div className="bg-gray-900 p-4 rounded">
          Total Trips: {stats.totalTrips}
        </div>
        <div className="bg-gray-900 p-4 rounded">
          Total Bookings: {stats.totalBookings}
        </div>
        <div className="bg-gray-900 p-4 rounded">
          Pending: {stats.pendingBookings}
        </div>
        <div className="bg-gray-900 p-4 rounded">
          Confirmed: {stats.confirmedBookings}
        </div>
        <div className="bg-gray-900 p-4 rounded">
          Cancelled: {stats.cancelledBookings}
        </div>
      </div>
      <div className="flex gap-4 mt-6">
        <button
          onClick={() => navigate("/admin/bookings")}
          className="bg-blue-600 px-4 py-2 rounded"
        >
          Manage Bookings
        </button>
        <button
          onClick={() => navigate("/admin/create-trip")}
          className="bg-green-600 px-4 py-2 rounded"
        >
          Create Trip
        </button>
        <button
          onClick={() => navigate("/admin/trips")}
          className="bg-blue-600 px-4 py-2 rounded"
        >
          View All Trips
        </button>

        <button onClick={logout} className="bg-red-600 px-4 py-2 rounded">
          Logout
        </button>
      </div>
    </div>
  );
}
