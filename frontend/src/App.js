import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Booking from "./pages/BookingsPage";
import AdminDashboard from "./admin/AdminDashboard"; 
import ProtectedRoute from "./context/ProtectedRoute"; 
import AllTeachers from "./components/AllTeachers";
import AllYogaStyles from "./components/AllYogaStyles";
import MyBookings from "./components/MyBookings";
const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/Bookings" element={<Booking />} />
          <Route path="/MyBookings" element={<MyBookings/>} />
          <Route path="/all-teachers" element={<AllTeachers />} />
          <Route path="/all-styles" element={<AllYogaStyles />} />
          {/* Protected Admin Route */}
          <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
            <Route path="/admin/*" element={<AdminDashboard />} />
          </Route>

        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
