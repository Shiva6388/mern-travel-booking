import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";

export default function AdminEditTrip() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    destination: "",
    price: "",
    seatsTotal: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTrip();
  }, []);

  const fetchTrip = async () => {
    try {
      const res = await API.get(`/trips/${id}`);
      const trip = res.data.data;

      setForm({
        title: trip.title || "",
        destination: trip.destination || "",
        price: trip.price || "",
        seatsTotal: trip.seatsTotal || "",
        startDate: trip.startDate?.split("T")[0] || "",
        endDate: trip.endDate?.split("T")[0] || "",
        description: trip.description || "",
      });

    } catch (err) {
      setError("Failed to load trip");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await API.put(`/trips/${id}`, {
        title: form.title,
        destination: form.destination,
        price: Number(form.price),
        seatsTotal: Number(form.seatsTotal),
        startDate: new Date(form.startDate),
        endDate: new Date(form.endDate),
        description: form.description,
      });

      alert("Trip updated successfully");
      navigate("/admin/trips");
    } catch (err) {
      setError(err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Trip</h1>

      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-3 max-w-md">
        {["title", "destination", "price", "seatsTotal"].map((field) => (
          <input
            key={field}
            name={field}
            value={form[field]}
            onChange={handleChange}
            placeholder={field}
            className="w-full p-2 rounded bg-white text-black"
            required
          />
        ))}

        <input
          type="date"
          name="startDate"
          value={form.startDate}
          onChange={handleChange}
          className="w-full p-2 rounded bg-white text-black"
          required
        />

        <input
          type="date"
          name="endDate"
          value={form.endDate}
          onChange={handleChange}
          className="w-full p-2 rounded bg-white text-black"
          required
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full p-2 rounded bg-white text-black"
          required
        />

        <button
          disabled={loading}
          className={`px-4 py-2 rounded ${
            loading ? "bg-gray-600" : "bg-blue-600"
          }`}
        >
          {loading ? "Updating..." : "Update Trip"}
        </button>
      </form>
    </div>
  );
}
