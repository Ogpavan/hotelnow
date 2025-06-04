import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { FaMapMarkerAlt, FaWifi, FaSwimmer, FaUtensils } from "react-icons/fa";
import { IoIosStar } from "react-icons/io";

const amenitiesList = [
  { icon: <FaWifi />, label: "Free Wi-Fi" },
  { icon: <FaSwimmer />, label: "Pool" },
  { icon: <FaUtensils />, label: "Restaurant" },
];

const tabs = ["about", "reviews"];

function ImageSlider({ images }) {
  const [current, setCurrent] = useState(0);
  if (!images || images.length === 0) return null;

  return (
    <div className="relative rounded-lg overflow-hidden shadow-md">
      <img
        src={images[current]}
        alt={`Slide ${current + 1}`}
        className="w-full h-[400px] object-cover"
      />
      {images.length > 1 && (
        <>
          <button
            onClick={() =>
              setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1))
            }
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow-md hover:bg-white"
          >
            {"<"}
          </button>
          <button
            onClick={() =>
              setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1))
            }
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow-md hover:bg-white"
          >
            {">"}
          </button>
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, idx) => (
              <span
                key={idx}
                className={`w-3 h-3 rounded-full cursor-pointer ${
                  idx === current ? "bg-blue-600" : "bg-gray-300"
                }`}
                onClick={() => setCurrent(idx)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// Trustable Booking Popup
function BookingPopup({ open, onClose, onSubmit }) {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (name && number.match(/^[6-9]\d{9}$/)) {
      onSubmit({ name, number });
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-8 relative border border-blue-100">
        <button
          className="absolute top-3 right-4 text-gray-400 hover:text-gray-700 text-2xl"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        <div className="flex items-center gap-2 mb-4">
          <img
            src="https://img.icons8.com/color/48/verified-badge.png"
            alt="Verified"
            className="w-8 h-8"
          />
          <h2 className="text-xl font-bold text-blue-700">
            Book with Confidence
          </h2>
        </div>
        <p className="text-gray-600 mb-4 text-sm">
          Your details are{" "}
          <span className="font-semibold text-green-700">100% safe</span> and
          encrypted. We never share your information.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Enter your name"
            />
            {submitted && !name && (
              <span className="text-xs text-red-500">Name is required.</span>
            )}
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Mobile Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              required
              pattern="[6-9]\d{9}"
              placeholder="10-digit Indian mobile number"
            />
            {submitted && !number.match(/^[6-9]\d{9}$/) && (
              <span className="text-xs text-red-500">
                Enter a valid 10-digit Indian mobile number.
              </span>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Confirm Booking
          </button>
        </form>
        <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
          <img
            src="https://img.icons8.com/fluency/24/lock-2.png"
            alt="Secure"
            className="w-5 h-5"
          />
          <span>
            Your data is protected with{" "}
            <span className="font-semibold text-blue-700">
              256-bit SSL encryption
            </span>
            .
          </span>
        </div>
      </div>
    </div>
  );
}

function HotelDetails() {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const [tab, setTab] = useState("about");
  const [showPopup, setShowPopup] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  useEffect(() => {
    const fetchHotel = async () => {
      const docRef = doc(db, "hotels", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setHotel({ id: docSnap.id, ...docSnap.data() });
      }
    };
    fetchHotel();
  }, [id]);

  const handleBooking = (user) => {
    setShowPopup(false);
    setBookingSuccess(true);
    setTimeout(() => setBookingSuccess(false), 3500);
    // Here you can also send booking data to your backend or Firestore
  };

  if (!hotel) return <div className="text-center py-10">Loading...</div>;
  const images = Array.isArray(hotel.image) ? hotel.image : [hotel.image];

  return (
    <div className="max-w-7xl mx-auto p-6">
      <BookingPopup
        open={showPopup}
        onClose={() => setShowPopup(false)}
        onSubmit={handleBooking}
      />
      {bookingSuccess && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 font-semibold">
          Booking Confirmed! Our team will contact you soon.
        </div>
      )}
      <div className="lg:flex lg:gap-12">
        {/* Left Column: Images */}
        <div className="lg:w-3/5">
          <ImageSlider images={images} />
        </div>

        {/* Right Column: Info & Booking */}
        <div className="lg:w-2/5 sticky top-24 mt-6 lg:mt-0 self-start bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold text-[#00264d]">{hotel.name}</h1>
          <div className="flex items-center text-gray-600 mt-2">
            <FaMapMarkerAlt className="mr-2" />
            {hotel.location}
          </div>
          <div className="flex items-center mt-2 text-green-700">
            <IoIosStar className="text-yellow-400 mr-1" />
            <span className="font-medium">{hotel.rating}/5</span>
            <span className="text-gray-500 ml-2">
              ({hotel.reviews} reviews)
            </span>
          </div>

          {/* Amenities */}
          <div className="mt-6 grid grid-cols-3 gap-4 text-center text-gray-700 text-sm">
            {amenitiesList.map((a) => (
              <div key={a.label} className="flex flex-col items-center gap-1">
                <div className="text-xl">{a.icon}</div>
                <span>{a.label}</span>
              </div>
            ))}
          </div>

          {/* Price & Booking */}
          <div className="mt-8 border-t pt-6">
            <div className="text-sm line-through text-gray-400">
              ₹{hotel.originalPrice}
            </div>
            <div className="text-3xl font-bold text-gray-900">
              ₹{hotel.price}
            </div>
            <p className="text-xs text-gray-500 mb-4">+ ₹250 GST</p>
            <button
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
              onClick={() => setShowPopup(true)}
            >
              Book Now
            </button>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="mt-12 border-b">
        <nav className="flex space-x-8 text-gray-600 text-sm font-semibold">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`pb-3 ${
                tab === t
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "hover:text-blue-600"
              }`}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </nav>
      </div>

      <div className="mt-6 max-w-4xl mx-auto text-gray-700">
        {tab === "about" && <p>{hotel.description}</p>}

        {tab === "reviews" && (
          <div className="space-y-6">
            {[1, 2].map((r) => (
              <div key={r} className="border-b pb-4">
                <p className="font-medium">User {r}</p>
                <p className="text-sm text-gray-600">
                  Great location and clean rooms. Would definitely stay again!
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Google Map */}
      <div className="mt-12 max-w-4xl mx-auto rounded-lg overflow-hidden shadow-lg">
        <iframe
          title="Google Maps"
          className="w-full h-96"
          src={`https://www.google.com/maps?q=${encodeURIComponent(
            hotel.location
          )}&output=embed`}
          loading="lazy"
        />
      </div>
    </div>
  );
}

export default HotelDetails;
