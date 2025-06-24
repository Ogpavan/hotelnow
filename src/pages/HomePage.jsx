import React, { useState, useEffect, useRef } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";
import { IoIosStar } from "react-icons/io";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { format } from "date-fns";
import { FaArrowRight, FaMapMarkerAlt, FaSearch } from "react-icons/fa";
import { CiCircleChevLeft, CiCircleChevRight } from "react-icons/ci";
import AnimatedCounter from "./AnimatedCounter";
import TestimonialSection from "./TestimonialSection";
import { Link, useNavigate } from "react-router-dom";

function HomePage() {
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);
  const [guests, setGuests] = useState(2);
  const [hotels, setHotels] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const navigate = useNavigate();
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  // Fetch cities from Firestore
  useEffect(() => {
    const fetchCities = async () => {
      const snap = await getDocs(collection(db, "cities"));
      setCities(snap.docs.map((d) => d.data().name));
    };
    fetchCities();
  }, []);

  // Fetch destinations from Firestore
  useEffect(() => {
    const fetchDestinations = async () => {
      const snap = await getDocs(collection(db, "destinations"));
      setDestinations(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    };
    fetchDestinations();
  }, []);

  useEffect(() => {
    const fetchHotels = async () => {
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
    };
    fetchHotels();
  }, []);

  const handleDateChange = (item) => {
    setDateRange([item.selection]);
    const { startDate, endDate } = item.selection;
    if (startDate && endDate && startDate.getTime() !== endDate.getTime()) {
      setShowCalendar(false);
    }
  };

  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const scrollAmount = 300;
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleChange = (e) => {
    const city = e.target.value;
    setSelectedCity(city);
  };

  // FAQ data
  const faqs = [
    {
      question: "How do I book a hotel on HotelNow?",
      answer:
        "Simply select your city, dates, and number of guests, then click 'Search'. Choose a hotel from the list and follow the booking instructions.",
    },
    {
      question: "Can I cancel or modify my booking?",
      answer:
        "Yes, you can cancel or modify your booking from your account dashboard, subject to the hotel's cancellation policy.",
    },
    {
      question: "Are there any hidden charges?",
      answer:
        "No, all charges are displayed upfront. Taxes and fees are included in the final price before you confirm your booking.",
    },
    {
      question: "How do I get the best deals?",
      answer:
        "Look out for our 'Top Deals' section and subscribe to our newsletter for exclusive offers and discounts.",
    },
    {
      question: "Is my payment information secure?",
      answer:
        "Absolutely! We use industry-standard encryption to ensure your payment details are safe and secure.",
    },
  ];

  // FAQ expand/collapse state
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div>
      <section className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-12">
        <h1 className="text-3xl sm:text-3xl md:text-4xl font-bold text-center text-[#00264d] leading-tight">
          <span className="text-blue-600">Where</span> are you going to go?
        </h1>

        <div className="mt-10 w-full max-w-4xl bg-white shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)] rounded-3xl md:rounded-full py-4 px-4 md:px-6 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 md:gap-6 relative poppins-regular">
          {/* Location */}
          <div className="flex flex-col w-full md:w-auto md:px-3 ">
            <span className="text-sm text-gray-500  ">Where to?</span>
            <select
              className="text-base md:text-lg font-medium text-gray-800 bg-transparent outline-none w-full pb-1"
              value={selectedCity}
              onChange={handleChange}
            >
              <option value="" disabled>
                Select City
              </option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          {/* Divider */}
          <div className="hidden md:block h-8 w-px bg-gray-200" />

          {/* Check-in & Check-out */}
          <div className="flex flex-col w-full md:w-auto relative">
            <span className="text-sm text-gray-500">Check-in & check-out</span>
            <button
              onClick={() => setShowCalendar(!showCalendar)}
              className="text-base md:text-lg font-medium text-gray-800 text-left bg-transparent outline-none w-full"
            >
              {`${format(dateRange[0].startDate, "EEE, dd MMM")} — ${format(
                dateRange[0].endDate,
                "EEE, dd MMM"
              )}`}
            </button>
            {showCalendar && (
              <div className="absolute top-20 md:top-16 z-50 bg-white shadow-lg rounded-xl">
                <DateRange
                  editableDateInputs={true}
                  onChange={handleDateChange}
                  moveRangeOnFirstSelection={false}
                  ranges={dateRange}
                  minDate={new Date()}
                />
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="hidden md:block h-8 w-px bg-gray-200" />

          {/* Guests */}
          <div className="flex flex-col w-full md:w-auto">
            <span className="text-sm text-gray-500">Guests</span>
            <input
              type="number"
              min={1}
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className="text-base md:text-lg font-medium text-gray-800 bg-transparent outline-none w-full md:w-20"
            />
          </div>

          {/* Search Button */}
          <button
            onClick={() => {
              if (!selectedCity) return alert("Please select a city");

              navigate(`/hotels/${selectedCity}`, {
                state: {
                  guests,
                  startDate: dateRange[0].startDate.toISOString(),
                  endDate: dateRange[0].endDate.toISOString(),
                },
              });
            }}
            className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 transition px-6 py-3 rounded-full text-white font-medium flex items-center justify-center gap-2"
          >
            <FaSearch />
            Search
          </button>
        </div>

        <p className="mt-6 text-sm text-gray-500 text-center">
          or looking for a hotel nearby tonight?
        </p>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-xl poppins-semibold text-[#00264d] mb-10 text-center md:text-left">
            Popular destinations
          </h2>

          <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-y-10 gap-x-8">
            {destinations.map((dest) => (
              <li
                key={dest.id}
                className="flex flex-col items-center text-center poppins-light text-[#00264d] cursor-pointer transition hover:scale-105"
              >
                <Link
                  to={`/hotels/${dest.name}`}
                  className="flex flex-col items-center"
                  state={{
                    guests,
                    startDate: dateRange[0].startDate.toISOString(),
                    endDate: dateRange[0].endDate.toISOString(),
                  }}
                >
                  <img
                    src={dest.img}
                    alt={dest.name}
                    className="w-20 h-20 rounded-full object-cover border border-gray-300 shadow-md mb-3"
                  />
                  <span className="text-sm text-[#00264d] poppins-regular">
                    {dest.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-4 py-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl poppins-semibold text-gray-800">Top Hotels</h2>
          {/* Always show arrows, but style for mobile */}
          <div className="space-x-1 flex md:mr-5">
            <button
              onClick={() => scroll("left")}
              className="text-gray-600 hover:text-gray-800 transition bg-white rounded-full shadow md:shadow-none p-1 md:p-0 fixed md:static left-2 bottom-8 z-20 md:relative md:left-0 md:bottom-0"
              style={{
                position: "sticky",
                left: 0,
                // background: "#fff",
                // boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                marginRight: "4px",
              }}
            >
              <CiCircleChevLeft className="w-8 h-8 text-gray-600 hover:text-gray-800" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="text-gray-600 hover:text-gray-800 transition bg-white rounded-full shadow md:shadow-none p-1 md:p-0 fixed md:static right-2 bottom-8 z-20 md:relative md:right-0 md:bottom-0"
              style={{
                position: "sticky",
                right: 0,
                // background: "#fff",
                // boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              }}
            >
              <CiCircleChevRight className="w-8 h-8" />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex overflow-x-auto space-x-6 hide-scrollbar scroll-smooth pb-2"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {hotels.map((hotel, index) => {
            const images = Array.isArray(hotel.image)
              ? hotel.image
              : hotel.image
              ? [hotel.image]
              : [];

            return (
              <div
                key={hotel.id || index}
                className="w-[280px] min-w-[280px] bg-white rounded-xl overflow-hidden border border-gray-200 flex-shrink-0"
              >
                {/* Hotel Image */}
                <div className="relative w-full h-44">
                  {images.length > 0 ? (
                    <>
                      <img
                        src={images[0]}
                        alt={hotel.name}
                        className="w-full h-44 object-cover"
                      />
                      <span className="absolute bottom-2 left-2 bg-black bg-opacity-60 text-white text-xs px-2 py-0.5 rounded">
                        {images.length} photo{images.length > 1 ? "s" : ""}
                      </span>
                    </>
                  ) : (
                    <div className="w-full h-44 bg-gray-200 flex items-center justify-center text-gray-400 text-xs">
                      No Image
                    </div>
                  )}
                </div>

                <div className="p-3">
                  {/* Hotel Name */}
                  <h3 className="text-md font-semibold text-gray-800 truncate">
                    {hotel.name}
                  </h3>

                  {/* Address with Icon */}
                  <div className="flex items-start gap-1 text-xs text-gray-600 mt-1">
                    <FaMapMarkerAlt className="mt-0.5 text-blue-500" />
                    <span className="truncate max-w-[230px]">
                      {hotel.location}
                    </span>
                  </div>

                  {/* City + Rating Row */}
                  <div className="flex items-center justify-between mt-2">
                    <span className="bg-blue-100 text-blue-700 text-xs px-2 py-[2px] rounded-md">
                      {hotel.city}
                    </span>

                    <div className="flex items-center text-sm text-gray-700">
                      <IoIosStar className="text-amber-400 mr-1" />
                      <span>{hotel.rating}</span>
                    </div>
                  </div>

                  {/* View Details CTA */}
                  <button
                    className="mt-3 w-full text-center bg-blue-600 text-white text-sm py-1.5 rounded-md hover:bg-blue-700 transition"
                    onClick={() =>
                      navigate(`/hotel/${hotel.id}`, {
                        state: {
                          startDate: dateRange[0].startDate.toISOString(),
                          endDate: dateRange[0].endDate.toISOString(),
                          guests,
                        },
                      })
                    }
                  >
                    View Details
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="px-4 py-12">
        <h2 className="text-xl font-semibold text-[#00264d] mb-6 text-center md:text-left">
          Our Achievements
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 py-6">
          <AnimatedCounter
            start={0}
            end={500}
            duration={2000}
            label="+ Hotels Listed"
          />
          <AnimatedCounter
            start={0}
            end={12000}
            duration={2000}
            label="+ Happy Customers"
          />
          <AnimatedCounter
            start={0}
            end={150}
            duration={2000}
            label="+ Bookings Per Month"
          />
        </div>
      </section>
      <section>
        <TestimonialSection />
      </section>

      <section className="px-4 ">
        <div className="bg-blue-700 text-white py-12 px-10 rounded-2xl max-w-7xl mx-auto mt-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-semibold mb-2">
                Ready to book your next stay?
              </h2>
              <p className="text-gray-300 text-sm sm:text-base max-w-sm">
                Discover top-rated hotels, great deals, and instant bookings
                with HotelNow.
              </p>
            </div>
            <button className="mt-4 md:mt-0 bg-white text-[#00264d] px-6 py-3 rounded-full font-medium flex items-center hover:bg-gray-100 transition">
              Start Booking <FaArrowRight className="ml-2" />
            </button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-4 py-12 ">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold text-[#00264d] mb-6 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="">
                <button
                  className="w-full flex justify-between items-center px-6 py-4 text-left focus:outline-none"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                >
                  <span className="font-medium text-[#00264d]">
                    {faq.question}
                  </span>
                  <span className="text-blue-600 text-2xl">
                    {openFaq === idx ? "-" : "+"}
                  </span>
                </button>
                {openFaq === idx && (
                  <div className="px-6 pb-4 text-gray-700 text-sm">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
