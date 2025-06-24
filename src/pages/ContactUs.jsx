import React, { useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaCommentDots,
  FaPaperPlane,
  FaCheck,
  FaPhone,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";

const ContactUs = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [focusedField, setFocusedField] = useState(null);

  const validateForm = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    } else if (form.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!form.message.trim()) {
      newErrors.message = "Message is required";
    } else if (form.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setSubmitted(true);
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setErrors({});
    setForm({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  const InputField = ({
    icon: Icon,
    label,
    name,
    type = "text",
    placeholder,
    required = false,
    as = "input",
    rows = 4,
  }) => {
    const hasError = errors[name];
    const isFocused = focusedField === name;
    const hasValue = form[name];

    return (
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          <Icon className="inline mr-2 text-blue-600" />
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        <div className="relative">
          {as === "textarea" ? (
            <textarea
              name={name}
              value={form[name]}
              onChange={handleChange}
              onFocus={() => setFocusedField(name)}
              onBlur={() => setFocusedField(null)}
              placeholder={placeholder}
              rows={rows}
              required={required}
              className={`w-full px-4 py-3 border-2 rounded-lg transition-all duration-300 resize-none
                ${
                  hasError
                    ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                    : isFocused
                    ? "border-blue-500 focus:ring-blue-200"
                    : hasValue
                    ? "border-green-300 focus:border-green-500 focus:ring-green-200"
                    : "border-gray-300 focus:border-blue-500 focus:ring-blue-200"
                }
                focus:outline-none focus:ring-4 focus:ring-opacity-20
                placeholder-gray-400 text-gray-700`}
            />
          ) : (
            <input
              type={type}
              name={name}
              value={form[name]}
              onChange={handleChange}
              onFocus={() => setFocusedField(name)}
              onBlur={() => setFocusedField(null)}
              placeholder={placeholder}
              required={required}
              className={`w-full px-4 py-3 border-2 rounded-lg transition-all duration-300
                ${
                  hasError
                    ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                    : isFocused
                    ? "border-blue-500 focus:ring-blue-200"
                    : hasValue
                    ? "border-green-300 focus:border-green-500 focus:ring-green-200"
                    : "border-gray-300 focus:border-blue-500 focus:ring-blue-200"
                }
                focus:outline-none focus:ring-4 focus:ring-opacity-20
                placeholder-gray-400 text-gray-700`}
            />
          )}

          {/* Success checkmark */}
          {hasValue && !hasError && !isFocused && (
            <FaCheck className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500" />
          )}
        </div>

        {hasError && (
          <p className="mt-2 text-sm text-red-600 flex items-center">
            <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
            {hasError}
          </p>
        )}

        {/* Character count for message */}
        {name === "message" && (
          <p className="mt-1 text-xs text-gray-500 text-right">
            {form[name].length}/500 characters
          </p>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Get in Touch
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Have a question or want to work together? We'd love to hear from
            you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl p-8 text-white h-fit">
              <h2 className="text-2xl font-bold mb-6">
                Let's Start a Conversation
              </h2>
              <p className="text-blue-100 mb-8 leading-relaxed">
                We're here to help and answer any question you might have. We
                look forward to hearing from you.
              </p>

              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="bg-white bg-opacity-20 p-3 rounded-lg mr-4">
                    <FaPhone className="text-xl" />
                  </div>
                  <div>
                    <p className="font-semibold">Phone</p>
                    <p className="text-blue-100">+91 98765 43210</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="bg-white bg-opacity-20 p-3 rounded-lg mr-4">
                    <FaEnvelope className="text-xl" />
                  </div>
                  <div>
                    <p className="font-semibold">Email</p>
                    <p className="text-blue-100">hello@company.com</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="bg-white bg-opacity-20 p-3 rounded-lg mr-4">
                    <FaMapMarkerAlt className="text-xl" />
                  </div>
                  <div>
                    <p className="font-semibold">Address</p>
                    <p className="text-blue-100">
                      123 Business Street
                      <br />
                      City, State 12345
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="bg-white bg-opacity-20 p-3 rounded-lg mr-4">
                    <FaClock className="text-xl" />
                  </div>
                  <div>
                    <p className="font-semibold">Business Hours</p>
                    <p className="text-blue-100">
                      Mon - Fri: 9:00 AM - 6:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
                    <FaCheck className="text-2xl text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-gray-600 mb-8 leading-relaxed">
                    Thank you for reaching out to us. We've received your
                    message and will get back to you within 24 hours.
                  </p>
                  <button
                    onClick={handleReset}
                    className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-gray-900 mb-8">
                    Send us a Message
                  </h2>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <InputField
                        icon={FaUser}
                        label="Full Name"
                        name="name"
                        placeholder="Enter your full name"
                        required
                      />
                      <InputField
                        icon={FaEnvelope}
                        label="Email Address"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        required
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <InputField
                        icon={FaPhone}
                        label="Phone Number"
                        name="phone"
                        type="tel"
                        placeholder="Enter your phone number"
                      />
                      <InputField
                        icon={FaCommentDots}
                        label="Subject"
                        name="subject"
                        placeholder="What's this about?"
                      />
                    </div>

                    <InputField
                      icon={FaCommentDots}
                      label="Message"
                      name="message"
                      placeholder="Tell us more about your inquiry..."
                      required
                      as="textarea"
                      rows={6}
                    />

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full py-4 px-8 rounded-lg font-semibold text-white transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-blue-200 ${
                        isSubmitting
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl"
                      }`}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center">
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Sending Message...
                        </span>
                      ) : (
                        <span className="flex items-center justify-center">
                          <FaPaperPlane className="mr-2" />
                          Send Message
                        </span>
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
