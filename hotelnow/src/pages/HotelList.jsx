import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa";
import { IoIosStar } from "react-icons/io";
import { RxCaretSort } from "react-icons/rx";
import { db } from "../firebase/config"; // Import the Firebase configuration
import { collection, getDocs, query, where } from "firebase/firestore"; // Import Firestore functions

function HotelList() {
  const { city } = useParams();
  const location = useLocation();
  const { startDate, endDate, guests } = location.state || {};
  const [filteredHotels, setFilteredHotels] = useState([]);

  useEffect(() => {
    const fetchHotels = async () => {
      const hotelsCollection = collection(db, "hotels");
      const q = query(hotelsCollection, where("city", "==", city));
      const querySnapshot = await getDocs(q);
      const hotelsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setFilteredHotels(hotelsData);
    };

    fetchHotels();
  }, [city]);

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

        {filteredHotels.length ? (
          <div className="grid gap-6">
            {filteredHotels.map((hotel) => (
              <div
                key={hotel.id}
                className="flex bg-white border border-gray-200 rounded-r-md overflow-hidden shadow-sm"
              >
                <div className=" w-1/3 h-auto ">
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-full h-full object-cover rounded-l-md"
                  />
                </div>

                <div className="p-4 flex justify-between w-full">
                  <div>
                    <h2 className="text-lg font-semibold text-[#00264d]">
                      {hotel.name}
                    </h2>
                    <div className="flex items-center text-sm text-gray-600 mb-1">
                      <FaMapMarkerAlt className="mr-1 text-gray-500" />
                      {hotel.location}
                    </div>
                    <div className="flex items-center text-sm text-green-700 mb-2">
                      <IoIosStar className="text-yellow-400 mr-1" />
                      <span className="font-medium">{hotel.rating}/5</span>
                      &nbsp;|&nbsp; {hotel.reviews} reviews
                    </div>
                    <p className="text-xs text-gray-600 max-w-[400px] line-clamp-2">
                      <span>{hotel.description}</span>
                      <span className="text-blue-600 cursor-pointer ml-1">
                        Read more
                      </span>
                    </p>
                  </div>

                  <div className="text-right flex flex-col items-center">
                    <p className="text-sm line-through text-gray-400">
                      ₹{hotel.originalPrice}
                    </p>
                    <p className="text-xl font-bold text-gray-800">
                      ₹{hotel.price}
                    </p>
                    <p className="text-xs text-gray-500">+ ₹250 GST</p>
                    <button className="mt-2 border text-blue-600 border-blue-300 px-3 py-1 rounded-full">
                      Book Now
                    </button>
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