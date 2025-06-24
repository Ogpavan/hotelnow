import React, { useState, useEffect } from "react";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";
import {
  FaHotel,
  FaMapMarkerAlt,
  FaRupeeSign,
  FaImage,
  FaStar,
  FaClipboardList,
  FaCity,
  FaListAlt,
} from "react-icons/fa";

function AdminHotels() {
  const [hotel, setHotel] = useState({
    name: "",
    location: "",
    city: "",
    locality: "",
    price: "",
    originalPrice: "",
    rating: "",
    reviews: "",
    description: "",
    image: "",
    amenities: "",
    latitude: "",
    longitude: "",
    featured: false,
    verified: false,
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [cities, setCities] = useState([]);
  const [localities, setLocalities] = useState([]);

  useEffect(() => {
    const fetchCities = async () => {
      const snap = await getDocs(collection(db, "cities"));
      setCities(snap.docs.map((d) => d.data().name));
    };
    fetchCities();
  }, []);

  useEffect(() => {
    const fetchLocalities = async () => {
      const snap = await getDocs(collection(db, "localities"));
      setLocalities(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    };
    fetchLocalities();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setHotel({ ...hotel, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");
    try {
      await addDoc(collection(db, "hotels"), {
        ...hotel,
        price: Number(hotel.price),
        originalPrice: Number(hotel.originalPrice),
        rating: Number(hotel.rating),
        reviews: Number(hotel.reviews),
        latitude: Number(hotel.latitude),
        longitude: Number(hotel.longitude),
        featured: Boolean(hotel.featured),
        verified: Boolean(hotel.verified),
        amenities: hotel.amenities.split(",").map((a) => a.trim()),
        image: hotel.image.split(",").map((i) => i.trim()),
      });

      setSuccess("Hotel uploaded successfully!");
      setHotel({
        name: "",
        location: "",
        city: "",
        locality: "",
        price: "",
        originalPrice: "",
        rating: "",
        reviews: "",
        description: "",
        image: "",
        amenities: "",
        latitude: "",
        longitude: "",

        featured: false,
        verified: false,
      });
    } catch (err) {
      setError("Upload failed: " + err.message);
    }
  };

  const filteredLocalities = hotel.city
    ? localities.filter((l) => l.city === hotel.city)
    : [];

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <FaHotel /> Upload Hotel
      </h2>

      <form onSubmit={handleSubmit} className="grid gap-4">
        <InputField
          icon={<FaHotel />}
          name="name"
          value={hotel.name}
          onChange={handleChange}
          placeholder="Hotel Name"
        />
        <InputField
          icon={<FaMapMarkerAlt />}
          name="location"
          value={hotel.location}
          onChange={handleChange}
          placeholder="Full Location/Address"
        />
        <InputField
          icon={<FaCity />}
          name="city"
          value={hotel.city}
          onChange={handleChange}
          placeholder="City"
          isSelect
          options={cities}
        />
        <InputField
          icon={<FaMapMarkerAlt />}
          name="locality"
          value={hotel.locality}
          onChange={handleChange}
          placeholder="Locality"
          isSelect
          options={filteredLocalities.map((l) => l.name)}
          disabled={!hotel.city}
        />
        <div className="flex  items-center border p-2 rounded gap-2">
          <InputField
            icon={<FaMapMarkerAlt />}
            name="latitude"
            type="number"
            value={hotel.latitude}
            onChange={handleChange}
            placeholder="Latitude"
          />
          <InputField
            icon={<FaMapMarkerAlt />}
            name="longitude"
            type="number"
            value={hotel.longitude}
            onChange={handleChange}
            placeholder="Longitude"
          />
        </div>
        <InputField
          icon={<FaRupeeSign />}
          name="price"
          type="number"
          value={hotel.price}
          onChange={handleChange}
          placeholder="Price"
        />
        <InputField
          icon={<FaRupeeSign />}
          name="originalPrice"
          type="number"
          value={hotel.originalPrice}
          onChange={handleChange}
          placeholder="Original Price"
        />
        <InputField
          icon={<FaStar />}
          name="rating"
          type="number"
          value={hotel.rating}
          onChange={handleChange}
          placeholder="Rating"
          step="0.1"
        />
        <InputField
          icon={<FaClipboardList />}
          name="reviews"
          type="number"
          value={hotel.reviews}
          onChange={handleChange}
          placeholder="Total Reviews"
        />
        <InputField
          icon={<FaImage />}
          name="image"
          value={hotel.image}
          onChange={handleChange}
          placeholder="Image URLs (comma separated)"
        />
        <InputField
          icon={<FaListAlt />}
          name="amenities"
          value={hotel.amenities}
          onChange={handleChange}
          placeholder="Amenities (comma separated)"
        />

        <textarea
          name="description"
          value={hotel.description}
          onChange={handleChange}
          placeholder="Hotel Description"
          className="border p-2 rounded"
          required
        />

        <div className="flex gap-4 items-center">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="featured"
              checked={hotel.featured}
              onChange={handleChange}
            />
            Featured
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="verified"
              checked={hotel.verified}
              onChange={handleChange}
            />
            Verified
          </label>
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded"
        >
          Upload Hotel
        </button>
      </form>

      {success && <p className="text-green-600 mt-2">{success}</p>}
      {error && <p className="text-red-600 mt-2">{error}</p>}
    </div>
  );
}

function InputField({
  icon,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  isSelect = false,
  options = [],
  disabled = false,
  step,
}) {
  return (
    <div className="flex w-full items-center border p-2 rounded gap-2">
      {icon}
      {isSelect ? (
        <select
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className="w-full outline-none"
          required
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      ) : (
        <input
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          type={type}
          step={step}
          className="w-full outline-none"
          required
        />
      )}
    </div>
  );
}

export default AdminHotels;
