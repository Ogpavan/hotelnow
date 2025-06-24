import React, { useEffect, useState } from "react";
import { useLocation, useParams, Link } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaFilter,
  FaTimes,
  FaWifi,
  FaParking,
  FaSwimmingPool,
} from "react-icons/fa";
import { IoIosStar } from "react-icons/io";
import { RxCaretSort } from "react-icons/rx";
import { MdFilterAlt } from "react-icons/md";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";

const PRICE_RANGES = [
  { label: "Under ₹1,500", min: 0, max: 1500 },
  { label: "₹1,500 - ₹2,000", min: 1500, max: 2000 },
  { label: "₹2,000 - ₹2,500", min: 2000, max: 2500 },
  { label: "₹2,500 - ₹3,000", min: 2500, max: 3000 },
  { label: "₹3,000 & above", min: 3000, max: Infinity },
];

const SORT_OPTIONS = [
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
  { value: "popularity", label: "Most Popular" },
];

function HotelList() {
  const { city } = useParams();
  const location = useLocation();
  const { startDate, endDate, guests } = location.state || {};
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [localities, setLocalities] = useState([]);
  const [selectedLocalities, setSelectedLocalities] = useState([]);
  const [selectedPrices, setSelectedPrices] = useState([]);
  const [sortBy, setSortBy] = useState("popularity");
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const [expandedHotel, setExpandedHotel] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
        console.log("Hotels fetched:", hotelsData);
      } catch (error) {
        console.error("Error fetching hotels:", error);
      }
      setLoading(false);
    };
    fetchHotels();
  }, []);

  useEffect(() => {
    const fetchLocalities = async () => {
      const snap = await getDocs(collection(db, "localities"));
      setLocalities(
        snap.docs
          .map((d) => ({ id: d.id, ...d.data() }))
          .filter((l) => l.city?.toLowerCase() === city?.toLowerCase())
      );
    };
    fetchLocalities();
  }, [city]);

  const handleLocalityChange = (localityName) => {
    setSelectedLocalities((prev) =>
      prev.includes(localityName)
        ? prev.filter((l) => l !== localityName)
        : [...prev, localityName]
    );
  };

  const handlePriceChange = (label) => {
    setSelectedPrices((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    );
  };

  const clearAllFilters = () => {
    setSelectedLocalities([]);
    setSelectedPrices([]);
  };

  // Filter and sort hotels
  const filteredHotels = hotels
    .filter((hotel) => {
      const inCity = hotel.city?.toLowerCase() === city.toLowerCase();
      const inLocality =
        selectedLocalities.length === 0 ||
        selectedLocalities.includes(hotel.locality);
      const inPrice =
        selectedPrices.length === 0 ||
        selectedPrices.some((label) => {
          const range = PRICE_RANGES.find((r) => r.label === label);
          return (
            range &&
            Number(hotel.price) >= range.min &&
            Number(hotel.price) < range.max
          );
        });
      return inCity && inLocality && inPrice;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return Number(a.price) - Number(b.price);
        case "price-high":
          return Number(b.price) - Number(a.price);
        case "rating":
          return Number(b.rating) - Number(a.rating);
        default:
          return 0;
      }
    });

  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const activeFiltersCount = selectedLocalities.length + selectedPrices.length;

  const FilterSidebar = ({ isMobile = false }) => (
    <div
      className={`bg-white rounded-sm shadow-sm border border-gray-200 ${
        isMobile ? "p-4" : "p-6"
      } ${isMobile ? "h-full overflow-y-auto" : "sticky top-6 h-fit"}`}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <MdFilterAlt className="text-blue-600" />
          Filters
        </h2>
        {isMobile && (
          <button
            onClick={() => setShowMobileFilter(false)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <FaTimes className="text-gray-500" />
          </button>
        )}
      </div>

      {activeFiltersCount > 0 && (
        <div className="mb-6 p-3 bg-blue-50 rounded-sm">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-blue-700">
              {activeFiltersCount} filter{activeFiltersCount > 1 ? "s" : ""}{" "}
              applied
            </span>
            <button
              onClick={clearAllFilters}
              className="text-xs text-blue-600 hover:text-blue-800 underline"
            >
              Clear all
            </button>
          </div>
        </div>
      )}

      <div className="mb-8 text-xs">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          Price per night
        </h3>
        <div className="space-y-3">
          {PRICE_RANGES.map((range) => (
            <label
              key={range.label}
              className="flex items-center group cursor-pointer"
            >
              <input
                type="checkbox"
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                checked={selectedPrices.includes(range.label)}
                onChange={() => handlePriceChange(range.label)}
              />
              <span className="ml-3 text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
                {range.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-8 text-xs">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          Quick filters
        </h3>
        <div className="space-y-3">
          <label className="flex items-center group cursor-pointer">
            <input
              type="checkbox"
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
            />
            <span className="ml-3 text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
              Couple friendly
            </span>
          </label>
          <label className="flex items-center group cursor-pointer">
            <input
              type="checkbox"
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
            />
            <span className="ml-3 text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
              Triple occupancy
            </span>
          </label>
        </div>
      </div>

      {localities.length > 0 && (
        <div className="text-xs">
          <h3 className=" font-semibold text-gray-900 mb-4 flex items-center gap-2">
            Popular localities
          </h3>
          <div className="space-y-3 max-h-48 overflow-y-auto">
            {localities.map((l) => (
              <label
                key={l.id}
                className="flex items-center group cursor-pointer"
              >
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                  checked={selectedLocalities.includes(l.name)}
                  onChange={() => handleLocalityChange(l.name)}
                />
                <span className="ml-3 text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
                  {l.name}
                </span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const LoadingSkeleton = () => (
    <div className="space-y-6">
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className="bg-white rounded-xl border border-gray-200 overflow-hidden animate-pulse"
        >
          <div className="flex">
            <div className="w-1/3 min-w-[160px] h-48 bg-gray-300"></div>
            <div className="p-6 flex-1">
              <div className="h-6 bg-gray-300 rounded mb-3 w-3/4"></div>
              <div className="h-4 bg-gray-300 rounded mb-2 w-1/2"></div>
              <div className="h-4 bg-gray-300 rounded mb-4 w-1/4"></div>
              <div className="h-4 bg-gray-300 rounded w-full"></div>
            </div>
            <div className="p-6 text-right">
              <div className="h-6 bg-gray-300 rounded mb-2 w-20"></div>
              <div className="h-8 bg-gray-300 rounded mb-4 w-24"></div>
              <div className="h-8 bg-blue-300 rounded w-20"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen  ">
      {/* Mobile Filter Overlay */}
      {showMobileFilter && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setShowMobileFilter(false)}
          ></div>
          <div className="absolute right-0 top-0 h-full w-60 max-w-[90vw] bg-white">
            <FilterSidebar isMobile />
          </div>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-6 p-4 lg:p-6 max-w-6xl mx-auto">
        {/* Desktop Filter Sidebar */}
        <aside className="hidden lg:block w-60 flex-shrink-0">
          <FilterSidebar />
        </aside>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* Header Section */}
          <div className="bg-white rounded-sm shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <h1 className="text-md font-bold text-gray-900 mb-2">
                  {loading ? (
                    <div className="h-8 bg-gray-300 rounded w-48 animate-pulse"></div>
                  ) : (
                    <>
                      {filteredHotels.length} hotel
                      {filteredHotels.length !== 1 ? "s" : ""} in {city}
                    </>
                  )}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    {formatDate(startDate)} - {formatDate(endDate)}
                  </span>
                  <span className="flex items-center gap-1">
                    {guests || "1"} guest{(guests || 1) > 1 ? "s" : ""}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {/* Mobile Filter Button */}
                <button
                  onClick={() => setShowMobileFilter(true)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-sm hover:bg-gray-50 transition-colors"
                >
                  <FaFilter className="text-xs" />
                  <span>Filters</span>
                  {activeFiltersCount > 0 && (
                    <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                      {activeFiltersCount}
                    </span>
                  )}
                </button>

                {/* Sort Dropdown */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-sm hover:bg-gray-50 transition-colors focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {SORT_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Hotels List */}
          {loading ? (
            <LoadingSkeleton />
          ) : filteredHotels.length ? (
            <div className="space-y-6">
              {filteredHotels.map((hotel, idx) => {
                // Ensure hotel.image is always an array
                const images = Array.isArray(hotel.image)
                  ? hotel.image
                  : hotel.image
                  ? [hotel.image]
                  : [];

                return (
                  <div
                    key={hotel.id || idx}
                    className="bg-white border border-gray-200 rounded-sm overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group"
                  >
                    <div className="flex flex-col lg:flex-row">
                      {/* Hotel Image */}
                      <div className="lg:w-1/3 min-w-[160px] h-48 lg:h-auto overflow-hidden relative">
                        {images.length > 0 ? (
                          <>
                            <img
                              src={images[0]}
                              alt={hotel.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              loading="lazy"
                            />
                            <span className="absolute bottom-2 left-2 bg-black bg-opacity-60 text-white text-xs px-2 py-0.5 rounded">
                              {images.length} photo
                              {images.length > 1 ? "s" : ""}
                            </span>
                          </>
                        ) : (
                          <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                            No Image
                          </div>
                        )}
                      </div>

                      {/* Hotel Info */}
                      <div className="flex-1 p-6">
                        <div className="flex flex-col lg:flex-row lg:justify-between gap-4">
                          <div className="flex-1">
                            <h2 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                              {hotel.name}
                            </h2>

                            <div className="flex items-center text-gray-600 mb-3">
                              {/* <FaMapMarkerAlt className="mr-2 text-gray-400 flex-shrink-0" /> */}
                              <span className="text-xs">{hotel.location}</span>
                            </div>

                            <div className="flex items-center gap-4 mb-3">
                              <div className="flex items-center">
                                <div className="flex items-center bg-green-100 px-2 py-1 rounded-md">
                                  <IoIosStar className="text-yellow-500 mr-1" />
                                  <span className="font-semibold text-green-700 text-sm">
                                    {hotel.rating}/5
                                  </span>
                                </div>
                                <span className="text-gray-500 text-sm ml-2">
                                  ({hotel.reviews} reviews)
                                </span>
                              </div>
                            </div>

                            <p className="text-sm text-gray-600 leading-relaxed mb-4 text-[15px]">
                              {expandedHotel === hotel.id
                                ? hotel.description
                                : `${hotel.description?.substring(0, 20)}...`}
                              <button
                                onClick={() =>
                                  setExpandedHotel(
                                    expandedHotel === hotel.id ? null : hotel.id
                                  )
                                }
                                className="text-blue-600 hover:text-blue-800 ml-1 font-medium transition-colors"
                              >
                                {expandedHotel === hotel.id
                                  ? "Show less"
                                  : "Read more"}
                              </button>
                            </p>

                            {/* Amenities */}
                            {/* <div className="flex items-center gap-4 text-gray-500">
                              <div className="flex items-center gap-1 text-xs">
                                <FaWifi /> WiFi
                              </div>
                              <div className="flex items-center gap-1 text-xs">
                                <FaParking /> Parking
                              </div>
                              <div className="flex items-center gap-1 text-xs">
                                <FaSwimmingPool /> Pool
                              </div>
                            </div> */}
                          </div>

                          {/* Pricing */}
                          <div className="lg:text-right lg:min-w-[140px] flex flex-row lg:flex-col justify-between lg:justify-center items-end lg:items-end">
                            <div className="mb-4">
                              {hotel.originalPrice && (
                                <p className="text-sm line-through text-gray-400 mb-1">
                                  ₹{hotel.originalPrice}
                                </p>
                              )}
                              <div className="flex lg:flex-col items-baseline lg:items-end gap-1">
                                <p className="text-xl  font-bold text-gray-900">
                                  ₹{hotel.price}
                                </p>
                                <span className="text-sm text-gray-500">
                                  /night
                                </span>
                              </div>
                              <p className="text-xs text-gray-500 mt-1">
                                + ₹250 GST
                              </p>
                            </div>

                            <Link
                              to={`/hotel/${hotel.id}`}
                              state={{ startDate, endDate, guests }}
                              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-sm hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg text-center min-w-[120px] text-xs"
                            >
                              Book Now
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🏨</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No hotels found
              </h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your filters or search for a different location
              </p>
              {activeFiltersCount > 0 && (
                <button
                  onClick={clearAllFilters}
                  className="px-6 py-2 bg-blue-600 text-white rounded-sm hover:bg-blue-700 transition-colors"
                >
                  Clear all filters
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HotelList;
