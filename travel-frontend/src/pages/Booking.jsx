import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Booking() {
  const { id } = useParams(); // tripId
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    persons: 1,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/bookings", {
        tripId: id,
        ...form,
      });

      alert("Booking successful!");
    } catch (error) {
      alert(error.response?.data?.message || "Booking failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <h1 className="text-3xl font-bold mb-4">Book Your Trip</h1>

      <form onSubmit={handleSubmit} className="max-w-md space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          className="w-full p-2 text-black"
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          className="w-full p-2 text-black"
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-2 text-black"
          onChange={handleChange}
        />

        <input
          type="number"
          name="persons"
          min="1"
          className="w-full p-2 text-black"
          onChange={handleChange}
          required
        />

        <button className="bg-green-600 px-4 py-2 rounded">
          Book Now
        </button>
      </form>
    </div>
  );
}
