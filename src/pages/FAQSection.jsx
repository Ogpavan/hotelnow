import React, { useState } from "react";

const FAQSection = () => {
  const [expandedFAQ, setExpandedFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  return (
    <div className="py-24 px-8 max-w-4xl mx-auto flex flex-col md:flex-row gap-12">
      {/* Left Side */}
      <div className="flex flex-col text-left basis-1/2">
        <p className="inline-block font-semibold text-primary mb-4">
          HotelNow FAQ
        </p>
        <p className="sm:text-4xl text-5xl font-extrabold gradient-text">
          Frequently Asked
          <br /> Questions
        </p>
      </div>

      {/* Right Side (FAQ List) */}
      <ul className="basis-1/2">
        {[
          {
            question: "How can I book a hotel through HotelNow?",
            answer:
              "Booking a hotel with HotelNow is simple. Just enter your destination, check-in and check-out dates, and the number of guests. Then, browse through the available options and select the one that fits your needs.",
          },
          {
            question: "What types of hotels are available on HotelNow?",
            answer:
              "HotelNow offers a wide variety of hotels ranging from budget-friendly options to luxury resorts. We ensure that you have plenty of choices to suit your preferences and budget.",
          },
          {
            question: "Are the prices really cheaper with HotelNow?",
            answer:
              "Yes! HotelNow partners with hotels to offer exclusive deals and discounted rates, allowing you to book accommodations at lower prices than on traditional booking sites.",
          },
          {
            question: "Is there a cancellation policy for bookings?",
            answer:
              "Cancellation policies vary by hotel. You can review the cancellation terms during the booking process, and most hotels offer free cancellation up to a specific date.",
          },
        ].map((faq, index) => (
          <li key={index}>
            <button
              className="relative flex gap-2 items-center w-full py-5 text-base font-semibold text-left border-t md:text-lg border-base-content/10"
              aria-expanded={expandedFAQ === index ? "true" : "false"}
              onClick={() => toggleFAQ(index)}
            >
              <span className="flex-1 text-base-content">{faq.question}</span>
              <svg
                className="w-4 h-4 ml-auto transition-transform duration-300"
                viewBox="0 0 16 16"
                fill="currentColor"
              >
                <path
                  d={`M2 8h12M8 2v12`}
                  style={{
                    transform:
                      expandedFAQ === index ? "rotate(45deg)" : "rotate(0deg)",
                  }}
                />
              </svg>
            </button>
            <div
              className="transition-all duration-300 ease-in-out max-h-0 overflow-hidden"
              style={{
                maxHeight: expandedFAQ === index ? "200px" : "0",
              }}
            >
              <div className="pb-5 leading-relaxed text-base-content">
                {faq.answer}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FAQSection;
