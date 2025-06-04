import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/config";

const cityOptions = [
  "New Delhi",
  "Mumbai",
  "Jaipur",
  "Bangalore",
  "Hyderabad",
  "Pune",
  "Kolkata",
  "Chennai",
  "Gurgaon",
  "Goa",
  "Indore",
  "Coimbatore",
];

function AdminPage() {
  const [hotel, setHotel] = useState({
    name: "",
    location: "",
    city: "",
    price: "",
    rating: "",
    reviews: "",
    image: "",
    originalPrice: "",
    description: "",
  });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setHotel({ ...hotel, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");
    try {
      await addDoc(collection(db, "hotels"), {
        ...hotel,
        price: Number(hotel.price),
        rating: Number(hotel.rating),
        reviews: Number(hotel.reviews),
        originalPrice: Number(hotel.originalPrice),
      });
      setSuccess("Hotel uploaded successfully!");
      setHotel({
        name: "",
        location: "",
        city: "",
        price: "",
        rating: "",
        reviews: "",
        image: "",
        originalPrice: "",
        description: "",
      });
    } catch (err) {
      setError("Failed to upload hotel: " + err.message);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Upload Hotel Data</h2>
      <form onSubmit={handleSubmit} className="grid gap-3">
        <input
          name="name"
          value={hotel.name}
          onChange={handleChange}
          placeholder="Hotel Name"
          className="border p-2 rounded"
          required
        />
        <input
          name="location"
          value={hotel.location}
          onChange={handleChange}
          placeholder="Location"
          className="border p-2 rounded"
          required
        />
        <select
          name="city"
          value={hotel.city}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        >
          <option value="" disabled>
            Select City
          </option>
          {cityOptions.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
        <input
          name="price"
          value={hotel.price}
          onChange={handleChange}
          placeholder="Price"
          type="number"
          className="border p-2 rounded"
          required
        />
        <input
          name="originalPrice"
          value={hotel.originalPrice}
          onChange={handleChange}
          placeholder="Original Price"
          type="number"
          className="border p-2 rounded"
          required
        />
        <input
          name="rating"
          value={hotel.rating}
          onChange={handleChange}
          placeholder="Rating"
          type="number"
          step="0.1"
          className="border p-2 rounded"
          required
        />
        <input
          name="reviews"
          value={hotel.reviews}
          onChange={handleChange}
          placeholder="Reviews"
          type="number"
          className="border p-2 rounded"
          required
        />
        <input
          name="image"
          value={hotel.image}
          onChange={handleChange}
          placeholder="Image URL"
          className="border p-2 rounded"
          required
        />
        <textarea
          name="description"
          value={hotel.description}
          onChange={handleChange}
          placeholder="Description"
          className="border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Upload
        </button>
      </form>
      {success && <p className="text-green-600 mt-2">{success}</p>}
      {error && <p className="text-red-600 mt-2">{error}</p>}
    </div>
  );
}

export default AdminPage;
