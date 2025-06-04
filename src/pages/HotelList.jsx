import React, { useEffect, useState } from "react";
import { useLocation, useParams, Link } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa";
import { IoIosStar } from "react-icons/io";
import { RxCaretSort } from "react-icons/rx";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";

function HotelList() {
  const { city } = useParams();
  const location = useLocation();
  const { startDate, endDate, guests } = location.state || {};
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHotels = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "hotels"));
        const hotelsData = [];
        querySnapshot.forEach((doc) => {
          hotelsData.push({ id: doc.id, ...doc.data() });
        });
        setHotels(hotelsData);
      } catch (error) {
        console.error("Error fetching hotels:", error);
      }
      setLoading(false);
    };
    fetchHotels();
  }, []);

  const filteredHotels = hotels.filter(
    (hotel) => hotel.city?.toLowerCase() === city.toLowerCase()
  );

  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <div className="flex flex-col lg:flex-row px-4 py-6 gap-6 h-[calc(100vh-64px)] overflow-hidden">
      {/* Filter Sidebar */}
      <aside className="w-full lg:w-1/4 bg-white rounded text-[#00264d] poppins-light p-6 overflow-y-auto sticky top-0 h-fit self-start">
        <h2 className="text-lg font-semibold mb-4">Filter by:</h2>

        <div className="mb-6">
          <h3 className="poppins-semibold text-sm mb-2">Price per night</h3>
          {[
            "Under ₹1,500",
            "₹1,500 - ₹2,000",
            "₹2,000 - ₹2,500",
            "₹2,500 - ₹3,000",
            "₹3,000 & above",
          ].map((range, i) => (
            <div key={i} className="flex items-center mb-2 text-sm">
              <input type="checkbox" className="mr-2" />
              <span>{range}</span>
            </div>
          ))}
        </div>

        <div>
          <h3 className="poppins-semibold text-sm mb-2">Other filters</h3>
          <div className="flex items-center mb-2 poppins-light text-sm">
            <input type="checkbox" className="mr-2" />
            <span>Couple friendly</span>
          </div>
          <div className="flex items-center poppins-light text-sm">
            <input type="checkbox" className="mr-2" />
            <span>Triple occupancy</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="w-full lg:w-3/4 bg-gray-50 p-6 overflow-y-auto hide-scrollbar rounded">
        <div className="flex items-center justify-between ">
          <h1 className="text-xl text-[#00264d] poppins-semibold mb-2">
            {filteredHotels.length} hotel
            {filteredHotels.length !== 1 ? "s" : ""} found in {city}
          </h1>
          <button className="border flex items-center gap-1 text-[#00264d] text-sm  px-3 py-1 rounded-full">
            <RxCaretSort /> Sort by Price
          </button>
        </div>
        <p className="text-sm mb-4 text-gray-600">
          Dates: {formatDate(startDate)} to {formatDate(endDate)}, Guests:{" "}
          {guests || "1"}
        </p>

        {loading ? (
          <p className="text-center text-gray-500">Loading hotels...</p>
        ) : filteredHotels.length ? (
          <div className="grid gap-6">
            {filteredHotels.map((hotel, idx) => (
              <div
                key={hotel.id || idx}
                className="flex bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition duration-300"
              >
                {/* Left Image */}
                <div className="w-1/3 min-w-[160px] max-h-48 overflow-hidden">
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Right Content */}
                <div className="p-4 flex justify-between gap-4 w-full">
                  {/* Info Section */}
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-[#00264d] mb-1 truncate">
                      {hotel.name}
                    </h2>

                    <div className="flex  text-sm text-gray-600">
                      <FaMapMarkerAlt className="mr-1 mt-1 text-gray-500" />
                      <span className="text-wrap">{hotel.location}</span>
                    </div>

                    <div className="flex items-center text-sm text-green-700 mb-2">
                      <IoIosStar className="text-yellow-400 mr-1" />
                      <span className="font-medium">{hotel.rating}/5</span>
                      <span className="text-gray-400 ml-2">
                        ({hotel.reviews} reviews)
                      </span>
                    </div>

                    <p className="text-sm text-gray-600 max-w-[500px] line-clamp-2">
                      {hotel.description}
                      <span className="text-blue-600 cursor-pointer ml-1 hover:underline">
                        Read more
                      </span>
                    </p>
                  </div>

                  {/* Pricing & CTA */}
                  <div className="text-right min-w-[120px] flex flex-col items-end justify-between">
                    <div>
                      <p className="text-sm line-through text-gray-400">
                        ₹{hotel.originalPrice}
                      </p>
                      <p className="text-2xl font-bold text-gray-800">
                        ₹{hotel.price}
                      </p>
                      <p className="text-xs text-gray-500">+ ₹250 GST</p>
                    </div>

                    <Link
                      to={`/hotel/${hotel.id}`}
                      className="mt-3 px-4 py-1.5 text-sm font-medium bg-blue-600 text-white rounded-full hover:bg-blue-700 transition text-center"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No hotels found in {city}</p>
        )}
      </div>
    </div>
  );
}

export default HotelList;
