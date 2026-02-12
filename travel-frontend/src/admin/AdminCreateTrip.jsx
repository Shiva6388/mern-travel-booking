import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function AdminCreateTrip() {
  const [form, setForm] = useState({
    title: "",
    destination: "",
    price: "",
    seatsTotal: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  const today = new Date().toISOString().split("T")[0];
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // ✅ CREATE PAYLOAD HERE
    const payload = {
      title: form.title.trim(),
      destination: form.destination.trim(),
      price: Number(form.price),
      seatsTotal: Number(form.seatsTotal),
      startDate: new Date(form.startDate),
      endDate: new Date(form.endDate),
      description: form.description.trim(),
    };

    try {
      await API.post("/trips", payload);
      alert("Trip created successfully");
      navigate("/admin/trips");
    } catch (err) {
      console.error("BACKEND ERROR 👉", err.response?.data);
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <h1 className="text-2xl font-bold mb-4">Create New Trip</h1>

      <form onSubmit={handleSubmit} className="space-y-3 max-w-md">
        <input
          name="title"
          placeholder="Trip Title"
          value={form.title}
          onChange={handleChange}
          className="w-full p-2 rounded bg-white text-black"
          required
        />

        <input
          name="destination"
          placeholder="Destination"
          value={form.destination}
          onChange={handleChange}
          className="w-full p-2 rounded bg-white text-black"
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price per person"
          value={form.price}
          onChange={handleChange}
          className="w-full p-2 rounded bg-white text-black"
          required
        />

        <input
          type="number"
          name="seatsTotal"
          placeholder="Total Seats"
          value={form.seatsTotal}
          onChange={handleChange}
          className="w-full p-2 rounded bg-white text-black"
          required
        />

        <input
          type="date"
          name="startDate"
          value={form.startDate}
          min={today}
          onChange={handleChange}
          className="w-full p-2 rounded bg-white text-black"
          required
        />

        <input
          type="date"
          name="endDate"
          value={form.endDate}
          min={form.startDate || today}
          onChange={handleChange}
          className="w-full p-2 rounded bg-white text-black"
          required
        />

        <textarea
          name="description"
          placeholder="Trip Description"
          value={form.description}
          onChange={handleChange}
          className="w-full p-2 rounded bg-white text-black"
          required
        />

        {/* 🔴 ERROR MESSAGE */}
        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className={`px-4 py-2 rounded ${
            loading ? "bg-gray-500" : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {loading ? "Creating..." : "Create Trip"}
        </button>
      </form>
    </div>
  );
}
