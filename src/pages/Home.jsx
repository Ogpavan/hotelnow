import React, { useState } from "react";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FaMapMarkerAlt, FaCalendarAlt, FaUser } from "react-icons/fa";
import Mumbai from "../assets/Mumbai.webp";
import Bangalore from "../assets/Bangalore.webp";
import NewDelhi from "../assets/NewDelhi.webp";
import Hyderabad from "../assets/Hyderabad.webp";
import Pune from "../assets/Pune.webp";
import Kolkata from "../assets/Kolkata.webp";
import Chennai from "../assets/Chennai.webp";
import Gurgaon from "../assets/Gurgaon.webp";
import Goa from "../assets/Goa.webp";
import Indore from "../assets/Indore.webp";
import Coimbatore from "../assets/Coimbatore.webp";
import Jaipur from "../assets/Jaipur.webp";
import FAQSection from "./FAQSection";
import Navbar from "../components/Navbar";

const faqs = [
  {
    question: "Can I cancel my hotel booking?",
    answer:
      "Yes, most bookings are cancellable up to 24 hours before check-in. Please check the specific hotel policy.",
  },
  {
    question: "Do you charge any hidden fees?",
    answer:
      "No, we ensure complete transparency. All taxes and charges are shown before payment.",
  },
  {
    question: "How do I get a refund after cancellation?",
    answer:
      "Refunds are processed within 5–7 business days after successful cancellation confirmation.",
  },
  {
    question: "Is early check-in available?",
    answer:
      "Early check-in depends on hotel availability. You can request it during booking or contact the hotel directly.",
  },
];

const hotels = [
  {
    name: "FabHotel Prime The King's Court",
    location: "Calangute, Goa",
    price: 1785,
    rating: 3.9,
    reviews: 1786,
    image:
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=60",
  },
  {
    name: "FabHotel Spring inn",
    location: "Kandivali West Station, Mumbai",
    price: 4200,
    rating: 4.0,
    reviews: 639,
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=60",
  },
  {
    name: "FabHotel Prime Srishoin",
    location: "Hitech City, Hyderabad",
    price: 1980,
    rating: 4.7,
    reviews: 199,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFfDJFkB42WNCdlgpMPsKs8Qsdc_R9L_ExKg&s",
  },
  {
    name: "FabHotel Phoenix Resorts",
    location: "MG Road, Bangalore",
    price: 1836,
    rating: 3.5,
    reviews: 571,
    image:
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=800&q=60",
  },
  {
    name: "FabHotel Spring inn",
    location: "Kandivali West Station, Mumbai",
    price: 4200,
    rating: 4.0,
    reviews: 639,
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=60",
  },
  {
    name: "FabHotel Prime Srishoin",
    location: "Hitech City, Hyderabad",
    price: 1980,
    rating: 4.7,
    reviews: 199,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFfDJFkB42WNCdlgpMPsKs8Qsdc_R9L_ExKg&s",
  },
  {
    name: "FabHotel Phoenix Resorts",
    location: "MG Road, Bangalore",
    price: 1836,
    rating: 3.5,
    reviews: 571,
    image:
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=800&q=60",
  },
];

const destinations = [
  {
    name: "Mumbai",
    image: Mumbai,
  },
  {
    name: "Bangalore",
    image: Bangalore,
  },
  {
    name: "New Delhi",
    image: NewDelhi,
  },
  {
    name: "Hyderabad",
    image: Hyderabad,
  },
  {
    name: "Pune",
    image: Pune,
  },
  {
    name: "Kolkata",
    image: Kolkata,
  },
  {
    name: "Chennai",
    image: Chennai,
  },
  {
    name: "Gurgaon",
    image: Gurgaon,
  },
  {
    name: "Goa",
    image: Goa,
  },
  {
    name: "Indore",
    image: Indore,
  },
  {
    name: "Coimbatore",
    image: Coimbatore,
  },
  {
    name: "Jaipur",
    image: Jaipur,
  },
];

const testimonials = [
  {
    name: "Ayesha Khan",
    feedback:
      "I had an amazing stay! The booking process was so smooth, and the hotel was exactly as shown. Highly recommended!",
    image:
      "https://static.flashintel.ai/image/6/b/2/6b29ef1e5b357849a3edc1850d880902.jpeg",
    rating: 5,
  },
  {
    name: "Ravi Sharma",
    feedback:
      "Great experience overall. The customer support helped me find the best deal quickly.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwhzpLyVZtbEQH1utfxtkcuLEqc5bIapYhGQ&s",
    rating: 4,
  },
  {
    name: "Raj Singh",
    feedback:
      "This platform saved me hours of searching. Found a great place in Uttarakhand within minutes!",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZVXzir_tAbd4qog2e2VyyMXhjvVSVYeVT3w&s",
    rating: 5,
  },
];

const Home = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <div className="relative  h-screen flex flex-col m-5 rounded-3xl  overflow-hidden ">
        {/* Background Outline Buildings */}
        <div
          className="absolute  opacity-10 w-full h-full  bg-center bg-no-repeat bg-contain pointer-events-none"
          style={{ backgroundImage: "url('/bg.png')" }}
        ></div>

        {/* Main Content */}

        <Navbar />
        <main className="relative flex flex-col items-center justify-center flex-grow px-4 text-center z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-snug tracking-wide">
            Discover Handpicked Luxury Stays
            <br />
            Across <span className="">Incredible India</span>.
          </h1>
          <p className="text-lg mb-10 max-w-2xl tracking-wide">
            Luxury meets Convenience
          </p>

          {/* FabHotels Style Search Box */}
          <div className="bg-white rounded-2xl shadow-xl p-4 w-full max-w-5xl mb-15">
            <form className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
              {/* Location Input */}
              <div className="flex items-center border border-gray-300 rounded-lg p-3">
                <FaMapMarkerAlt className="text-gray-400 mr-3" />
                <input
                  type="text"
                  placeholder="Location"
                  className="flex-1 outline-none text-gray-700"
                />
              </div>

              {/* Dates Input */}
              <div className="flex items-center border border-gray-300 rounded-lg p-3">
                <FaCalendarAlt className="text-gray-400 mr-3" />
                <input
                  type="text"
                  placeholder="Check-in / Check-out"
                  className="flex-1 outline-none text-gray-700"
                />
              </div>

              {/* Guests Input */}
              <div className="flex items-center border border-gray-300 rounded-lg p-3">
                <FaUser className="text-gray-400 mr-3" />
                <input
                  type="number"
                  min="1"
                  placeholder="Guests"
                  className="flex-1 outline-none text-gray-700"
                />
              </div>

              {/* Search Button */}
              <button
                type="submit"
                className="bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-bold py-3 rounded-lg transition-all duration-300 w-full"
              >
                Search
              </button>
            </form>
          </div>
        </main>
      </div>
      <section>
        <div className="max-w-5xl mx-auto p-8 my-10">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-10 tracking-tight text-center ">
            Top Places to Visit
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {destinations.map((city, index) => (
              <div key={index} className="flex items-center gap-4">
                <img
                  src={city.image}
                  alt={city.name}
                  className="w-14 h-14 rounded-full object-cover"
                />
                <span className="text-lg text-gray-700">{city.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="relative">
        <div className="max-w-5xl mx-auto px-4 py-8 my-10">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-10 tracking-tight text-center">
            Featured Hotels
          </h2>

          {/* Scroll Buttons */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-16 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-md p-2 rounded-full hover:bg-gray-100"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => scroll("right")}
            className="absolute right-16 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-md p-2 rounded-full hover:bg-gray-100"
          >
            <ChevronRight size={20} />
          </button>

          {/* Scrollable Hotel Cards */}
          <div
            ref={scrollRef}
            className="flex space-x-4 overflow-x-auto  scrollbar-hide scroll-smooth px-2"
            style={{ overflowX: "hidden" }}
          >
            {hotels.map((hotel, index) => {
              const fullStars = Math.floor(hotel.rating);
              const halfStar = hotel.rating % 1 >= 0.5;
              const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

              return (
                <div
                  key={index}
                  className="min-w-[250px] bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] rounded-xl overflow-hidden hover:shadow-2xl transition-shadow flex-shrink-0 mb-10 py-4"
                >
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-full h-40 object-cover rounded-t-xl"
                  />
                  <div className="px-4 py-3 flex flex-col gap-y-2">
                    <div className="flex items-center space-x-1 text-yellow-500 text-sm">
                      {Array(fullStars)
                        .fill("★")
                        .map((_, i) => (
                          <span key={i}>★</span>
                        ))}
                      {halfStar && <span>☆</span>}
                      {Array(emptyStars)
                        .fill("☆")
                        .map((_, i) => (
                          <span key={`e-${i}`}>☆</span>
                        ))}
                      <span className="ml-2 text-gray-700 text-xs">
                        {hotel.rating}/5
                      </span>
                    </div>
                    <h3 className="font-semibold text-base leading-snug">
                      {hotel.name.length > 25
                        ? hotel.name.slice(0, 25) + "..."
                        : hotel.name}
                    </h3>
                    <p className="text-gray-600 text-sm">{hotel.location}</p>
                    <p className="text-gray-800 text-sm">
                      Starts ₹{hotel.price.toLocaleString()} per night
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 " id="testimonials">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4 text-gray-900 gradient-text">
            What Our Guests Say
          </h2>
          <p className="text-gray-600 mb-10">
            Trusted by thousands of travelers across India
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] hover:shadow-lg transition duration-300"
              >
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full mx-auto mb-4"
                />
                <h4 className="text-lg font-semibold mb-2 text-gray-800">
                  {testimonial.name}
                </h4>
                <div className="flex justify-center mb-3">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${
                        i < testimonial.rating
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.3 4.004h4.21c.969 0 1.371 1.24.588 1.81l-3.404 2.475 1.3 4.004c.3.921-.755 1.688-1.54 1.118L10 13.347l-3.404 2.475c-.784.57-1.838-.197-1.539-1.118l1.3-4.004-3.404-2.475c-.783-.57-.38-1.81.588-1.81h4.21l1.3-4.004z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 text-sm">{testimonial.feedback}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FAQSection />
      <section className="bg-gradient-to-b from-indigo-900 via-purple-800 to-purple-700 text-white py-16 m-5 rounded-3xl">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Book Your Next Stay?
          </h2>
          <p className="text-lg mb-8 text-blue-100">
            Find the best deals and top-rated places across India with just a
            few clicks.
          </p>
          <a
            href="/book-now"
            className="inline-block bg-white text-blue-700 font-semibold px-8 py-3 rounded-full shadow hover:bg-gray-100 transition duration-300"
          >
            Book Now
          </a>
        </div>
      </section>
      <section>
        <div className="bg-gray-50 py-10 px-5">
          <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-y-4 text-sm text-gray-600">
            <a href="#">Hotels Near me</a>
            <a href="#">Hotels in New Delhi</a>
            <a href="#">Hotels in Pune</a>
            <a href="#">Hotels in Mumbai</a>

            <a href="#">Hotels in Bangalore</a>
            <a href="#">Hotels in Kolkata</a>
            <a href="#">Hotels in Goa</a>
            <a href="#">Hotels in Gurgaon</a>

            <a href="#">Hotels in Hyderabad</a>
            <a href="#">Hotels in Jaipur</a>
            <a href="#">Hotels in Indore</a>
            <a href="#">Hotels in Bhopal</a>

            <a href="#">Hotels in Chennai</a>
            <a href="#">Hotels in Ahmedabad</a>
            <a href="#">Hotels in Noida</a>
            <a href="#">Hotels in Lucknow</a>

            <a href="#">Hotels in Nagpur</a>
            <a href="#">Hotels in Udaipur</a>
            <a href="#">Hotels in Kanpur</a>
            <a href="#">Hotels in Amritsar</a>

            <a href="#">Hotels in Varanasi</a>
            <a href="#">Hotels in Nashik</a>
            <a href="#">Hotels in Manali</a>
            <a href="#">Hotels in Dehradun</a>

            <a href="#">Hotels in Coimbatore</a>
            <a href="#">Hotels in Bhubaneswar</a>
            <a href="#">Hotels in Patna</a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
