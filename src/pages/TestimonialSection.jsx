import React from "react";

const testimonials = [
  {
    name: "Ayesha Khan",
    feedback:
      "HotelNow made my vacation so smooth! Booking was instant and I got amazing discounts.",
  },
  {
    name: "Rohit Sharma",
    feedback:
      "Loved the UI, super intuitive and I found exactly what I needed. Highly recommend!",
  },
  {
    name: "Sara Mehta",
    feedback:
      "Seamless experience! I booked 3 hotels within minutes and all were just as described.",
  },
  {
    name: "Arjun Verma",
    feedback:
      "The customer support and ease of use is top notch. HotelNow is now my go-to!",
  },
];

const TestimonialSection = () => {
  return (
    <section className="px-4 py-6">
      <h2 className="text-2xl font-semibold text-[#00264d] mb-6">
        What Our Customers Say
      </h2>

      <div className="flex space-x-6 overflow-x-auto hide-scrollbar snap-x snap-mandatory scroll-smooth">
        {testimonials.map((t, index) => (
          <div
            key={index}
            className="md:min-w-[250px] max-w-[250px] snap-start bg-white shadow-md rounded-xl p-6 flex-shrink-0 border border-gray-100"
          >
            <p className="text-gray-700 text-sm mb-4 leading-relaxed">
              “{t.feedback}”
            </p>
            <h3 className="text-[#00264d] font-semibold text-sm text-right">
              – {t.name}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TestimonialSection;
