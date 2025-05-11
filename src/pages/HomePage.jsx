import React, { useState } from "react";
import { useRef } from "react";
import { IoIosStar } from "react-icons/io";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { format } from "date-fns";
import { FaArrowRight, FaMapMarkerAlt, FaSearch } from "react-icons/fa";
import bangalore from "../assets/Bangalore.webp";
import mumbai from "../assets/Mumbai.webp";
import newdelhi from "../assets/NewDelhi.webp";
import hyderabad from "../assets/Hyderabad.webp";
import pune from "../assets/Pune.webp";
import kolkata from "../assets/Kolkata.webp";
import chennai from "../assets/Chennai.webp";
import gurgaon from "../assets/Gurgaon.webp";
import goa from "../assets/Goa.webp";
import indore from "../assets/Indore.webp";
import coimbatore from "../assets/Coimbatore.webp";
import jaipur from "../assets/Jaipur.webp";

import { CiCircleChevLeft, CiCircleChevRight } from "react-icons/ci";
import AnimatedCounter from "./AnimatedCounter";
import TestimonialSection from "./TestimonialSection";

const cities = [
  "New York",
  "Paris",
  "Tokyo",
  "London",
  "Delhi",
  "Dubai",
  "Sydney",
];

const destinations = [
  [
    {
      name: "Mumbai",
      img: mumbai,
    },
    {
      name: "Bangalore",
      img: bangalore,
    },
    {
      name: "New Delhi",
      img: newdelhi,
    },
  ],
  [
    {
      name: "Hyderabad",
      img: hyderabad,
    },
    {
      name: "Pune",
      img: pune,
    },
    {
      name: "Kolkata",
      img: kolkata,
    },
  ],
  [
    {
      name: "Chennai",
      img: chennai,
    },
    {
      name: "Gurgaon",
      img: gurgaon,
    },
    {
      name: "Goa",
      img: goa,
    },
  ],
  [
    {
      name: "Indore",
      img: indore,
    },
    {
      name: "Coimbatore",
      img: coimbatore,
    },
    {
      name: "Jaipur",
      img: jaipur,
    },
  ],
];

const hotels = [
  {
    name: "The King's Court",
    location: "Calangute, Goa",
    price: 1785,
    rating: 3.9 + " Good",
    reviews: 1786,
    image:
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=60",
  },
  {
    name: " Radisson Blu",
    location: "Mumbai",
    price: 4200,
    rating: "4.0 Good",
    reviews: 639,
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=60",
  },
  {
    name: "  Prime Srishoin",
    location: "Hyderabad",
    price: 1980,
    rating: "4.0 Good",
    reviews: 199,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFfDJFkB42WNCdlgpMPsKs8Qsdc_R9L_ExKg&s",
  },
  {
    name: "  Phoenix Resorts",
    location: " Bangalore",
    price: 1836,
    rating: "4.0 Good",
    reviews: 571,
    image:
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=800&q=60",
  },
  {
    name: "  Spring inn",
    location: "Mumbai",
    price: 4200,
    rating: "4.0 Good",
    reviews: 639,
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=60",
  },
  {
    name: "  Prime Srishoin",
    location: "Hyderabad",
    price: 1980,
    rating: "4.0 Good",
    reviews: 199,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFfDJFkB42WNCdlgpMPsKs8Qsdc_R9L_ExKg&s",
  },
  {
    name: "  Phoenix Resorts",
    location: "Bangalore",
    price: 1836,
    rating: "4.0 Good",
    reviews: 571,
    image:
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=800&q=60",
  },
];
function HomePage() {
  const [selectedCity, setSelectedCity] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);
  const [guests, setGuests] = useState(1);
  // const [showAll, setShowAll] = useState(true);
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

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

  // const flatDestinations = destinations.flat();

  // const firstRow = flatDestinations.slice(0, 6);
  // const secondRow = flatDestinations.slice(6, 12); // adjust slice size if needed

  return (
    <div>
      <section className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-12">
        <h1 className="text-3xl sm:text-3xl md:text-4xl poppins-bold text-center text-[#00264d] leading-tight">
          <span className="text-blue-600">Where</span> are you going to go?
        </h1>

        <div className="mt-10 w-full max-w-4xl bg-white shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)] rounded-3xl md:rounded-full py-4 px-4 md:px-6 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 md:gap-6 relative poppins-regular">
          {/* Location */}
          <div className="flex flex-col w-full md:w-auto md:px-3 ">
            <span className="text-sm text-gray-500  ">Where to?</span>
            <select
              className="text-base md:text-lg font-medium text-gray-800 bg-transparent outline-none w-full pb-1"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
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
          <button className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 transition px-6 py-3 rounded-full text-white font-medium flex items-center justify-center gap-2">
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
          <h2 className="text-2xl poppins-semibold text-[#00264d] mb-10 text-center md:text-left">
            Popular destinations
          </h2>

          <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-y-10 gap-x-8">
            {destinations.flat().map((dest) => (
              <li
                key={dest.name}
                className="flex flex-col items-center text-center poppins-light text-[#00264d]"
              >
                <img
                  src={dest.img}
                  alt={dest.name}
                  className="w-20 h-20 rounded-full object-cover border border-gray-300 shadow-md mb-3 transition-transform duration-300 hover:scale-105"
                />
                <span className="text-base text-[#00264d] poppins-regular">
                  {dest.name}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="px-4 py-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl sm:text-2xl poppins-semibold text-gray-800">
            Top Hotels
          </h2>
          <div className="space-x-1 hidden sm:flex md:mr-5">
            <button
              onClick={() => scroll("left")}
              className="text-gray-600 hover:text-gray-800 transition"
            >
              <CiCircleChevLeft className="w-8 h-8 text-gray-600 hover:text-gray-800" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="text-gray-600 hover:text-gray-800 transition"
            >
              <CiCircleChevRight className="w-8 h-8" />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex overflow-x-auto space-x-6 hide-scrollbar scroll-smooth"
        >
          {hotels.map((hotel, index) => (
            <div key={index} className="min-w-[280px]">
              <img
                src={hotel.image}
                alt={hotel.name}
                className="w-full h-44 object-cover rounded-xl mb-2"
              />
              <div className="px-1">
                <h3 className="text-lg poppins-regular text-gray-800">
                  {hotel.name}
                </h3>
                <div className="flex items-center text-sm text-blue-600 poppins-light">
                  <FaMapMarkerAlt className="mr-1 text-blue-500" />
                  {hotel.location}
                </div>
                <div className="flex items-center justify-between text-sm poppins-light">
                  <div className="flex items-center text-gray-600">
                    <IoIosStar className="text-amber-400 mr-1" />
                    {hotel.rating}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 py-12">
        <h2 className="text-2xl font-semibold text-[#00264d] mb-6 text-center md:text-left">
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
    </div>
  );
}

export default HomePage;
