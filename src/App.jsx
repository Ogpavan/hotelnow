import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import HotelList from "./pages/HotelList";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import HotelDetails from "./pages/HotelDetails";
import ContactUs from "./pages/ContactUs";

function App() {
  return (
    <Router>
      <div className="max-w-5xl mx-auto bg-[#e3ebf3]">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/hotels/:city" element={<HotelList />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/hotel/:id" element={<HotelDetails />} />
          <Route path="/contact" element={<ContactUs />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
