import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import {
  FaMapMarkerAlt,
  FaStar,
  FaRupeeSign,
  FaWifi,
  FaCar,
  FaSwimmingPool,
  FaCheck,
  FaHeart,
  FaShare,
  FaChevronLeft,
  FaChevronRight,
  FaPhone,
  FaEnvelope,
  FaGlobe,
} from "react-icons/fa";

function HotelDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showFullDescription, setShowFullDescription] = useState(false);

  // Get booking details from location state (passed from hotel list)
  const { startDate, endDate, guests } = location.state || {};

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  // Fetch hotel data when component mounts
  useEffect(() => {
    const fetchHotel = async () => {
      if (!id) {
        setError("Hotel ID not provided");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const hotelDoc = doc(db, "hotels", id);
        const hotelSnap = await getDoc(hotelDoc);

        if (hotelSnap.exists()) {
          const hotelData = { id: hotelSnap.id, ...hotelSnap.data() };
          setHotel(hotelData);
        } else {
          setError("Hotel not found");
        }
      } catch (err) {
        console.error("Error fetching hotel:", err);
        setError("Failed to load hotel details");
      } finally {
        setLoading(false);
      }
    };

    fetchHotel();
  }, [id]);

  const nextImage = () => {
    if (hotel?.image && hotel.image.length > 1) {
      setCurrentImageIndex((prev) =>
        prev === hotel.image.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (hotel?.image && hotel.image.length > 1) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? hotel.image.length - 1 : prev - 1
      );
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} className="text-yellow-400 text-xs" />);
    }

    if (hasHalfStar) {
      stars.push(
        <FaStar key="half" className="text-yellow-400 opacity-50 text-xs" />
      );
    }

    return stars;
  };

  const calculateDiscount = () => {
    if (!hotel?.originalPrice || !hotel?.price) return 0;
    return Math.round(
      ((hotel.originalPrice - hotel.price) / hotel.originalPrice) * 100
    );
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  // Ensure image is an array
  const hotelImages = Array.isArray(hotel?.image)
    ? hotel.image
    : typeof hotel?.image === "string"
    ? [hotel.image]
    : [
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-sm">Loading hotel details...</p>
        </div>
      </div>
    );
  }

  if (error || !hotel) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-base mb-4">
            {error || "Hotel not found"}
          </p>
          <button
            onClick={handleGoBack}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 text-sm rounded"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <button
            onClick={handleGoBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 text-xs"
          >
            <FaChevronLeft />
            Back to Hotels
          </button>
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-full hover:bg-gray-100">
              <FaShare className="text-gray-600 text-xs" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100">
              <FaHeart className="text-gray-600 text-xs" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Image Slider & Thumbnails */}
          <div className="lg:w-1/2 w-full">
            <div className="relative   overflow-hidden h-64 sm:h-80 bg-gray-100">
              {hotelImages.length > 0 && (
                <img
                  src={hotelImages[currentImageIndex]}
                  alt={hotel.name}
                  className="w-full h-full object-cover transition-all duration-300"
                />
              )}
              {/* Slider Controls */}
              {hotelImages.length > 1 && (
                <>
                  <button
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-1 text-xs"
                    onClick={prevImage}
                  >
                    <FaChevronLeft />
                  </button>
                  <button
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-1 text-xs"
                    onClick={nextImage}
                  >
                    <FaChevronRight />
                  </button>
                </>
              )}
              {/* Image count */}
              <span className="absolute bottom-2 left-2 bg-black bg-opacity-60 text-white text-xs px-2 py-0.5 rounded">
                {currentImageIndex + 1} / {hotelImages.length}
              </span>
            </div>
            {/* Thumbnails */}
            {hotelImages.length > 1 && (
              <div className="flex gap-2 mt-3">
                {hotelImages.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`thumb-${idx}`}
                    className={`w-20 h-16 object-cover rounded cursor-pointer border ${
                      currentImageIndex === idx
                        ? "border-blue-600"
                        : "border-gray-200"
                    }`}
                    onClick={() => setCurrentImageIndex(idx)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Book Now Card */}
          <div className="lg:w-1/2 w-full relative">
            <div className="sticky top-24">
              <div className="bg-white   shadow-lg border border-gray-100 p-5 text-xs">
                <div className="flex items-center justify-between mb-2">
                  <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs">
                    {hotel.city}
                  </span>
                  <span className="flex items-center text-amber-500 font-semibold text-xs">
                    <FaStar className="mr-1" />
                    {hotel.rating}
                  </span>
                </div>
                <h2 className="text-base font-semibold text-[#00264d] mb-1">
                  {hotel.name}
                </h2>
                <div className="flex items-center text-gray-500 mb-2 text-xs">
                  <FaMapMarkerAlt className="mr-1" />
                  <span className="truncate">{hotel.location}</span>
                </div>
                <div className="flex gap-2 mb-2 items-end">
                  <span className="text-gray-700 line-through text-xs">
                    ₹{hotel.originalPrice}
                  </span>
                  <span className="text-lg font-bold text-blue-700">
                    ₹{hotel.price}
                  </span>
                  <span className="text-gray-400 text-xs">+ ₹250 GST</span>
                </div>
                <div className="mb-2">
                  <span className="text-gray-600">Check-in:</span>{" "}
                  <span className="font-medium">{formatDate(startDate)}</span>
                </div>
                <div className="mb-2">
                  <span className="text-gray-600">Check-out:</span>{" "}
                  <span className="font-medium">{formatDate(endDate)}</span>
                </div>
                <div className="mb-4">
                  <span className="text-gray-600">Guests:</span>{" "}
                  <span className="font-medium">{guests || 1}</span>
                </div>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold text-xs transition">
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Hotel Details */}
        <div className="mt-8 bg-white   shadow border border-gray-100 p-6 text-xs">
          <h3 className="text-base font-semibold text-[#00264d] mb-2">
            About this hotel
          </h3>
          <p className="text-gray-700 whitespace-pre-line mb-4">
            {showFullDescription
              ? hotel.description
              : hotel.description.slice(0, 350) +
                (hotel.description.length > 350 ? "..." : "")}
          </p>
          {hotel.description.length > 350 && (
            <button
              className="text-blue-600 text-xs underline"
              onClick={() => setShowFullDescription((v) => !v)}
            >
              {showFullDescription ? "Show less" : "Read more"}
            </button>
          )}

          <div className="mt-6">
            <h4 className="font-semibold text-[#00264d] mb-2 text-xs">
              Amenities
            </h4>
            <ul className="flex flex-wrap gap-2">
              {hotel.amenities &&
                hotel.amenities.map((a, i) => (
                  <li
                    key={i}
                    className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-xs"
                  >
                    {a}
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HotelDetails;
