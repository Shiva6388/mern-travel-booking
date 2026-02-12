import { BrowserRouter, Routes, Route } from "react-router-dom";
import Trips from "./pages/Trips";
import TripDetails from "./pages/TripDetails";
import Booking from "./pages/Booking";
import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";
import AdminBookings from "./admin/AdminBookings";
import AdminCreateTrip from "./admin/AdminCreateTrip";
import AdminTrips from "./admin/AdminTrips";
import AdminEditTrip from "./pages/AdminEditTrip";





export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Trips />} />
        <Route path="/trips/:id" element={<TripDetails />} />
        <Route path="/book/:id" element={<Booking />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/bookings" element={<AdminBookings />} />
        <Route path="/admin/create-trip" element={<AdminCreateTrip />} />
        <Route path="/admin/trips" element={<AdminTrips />} />
        <Route path="/admin/edit-trip/:id" element={<AdminEditTrip />} />
      </Routes>
    </BrowserRouter>
  );
}


