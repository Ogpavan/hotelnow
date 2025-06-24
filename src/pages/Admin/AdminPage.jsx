import React, { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase/config";

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

function AdminDestinations() {
  const [dest, setDest] = useState({ name: "", img: "" });
  const [destinations, setDestinations] = useState([]);
  const [editId, setEditId] = useState(null);

  // Fetch destinations
  useEffect(() => {
    const fetchDest = async () => {
      const snap = await getDocs(collection(db, "destinations"));
      setDestinations(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    };
    fetchDest();
  }, []);

  // Add or update destination
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!dest.name || !dest.img) return;
    if (editId) {
      await updateDoc(doc(db, "destinations", editId), dest);
      setEditId(null);
    } else {
      await addDoc(collection(db, "destinations"), dest);
    }
    setDest({ name: "", img: "" });
    // Refresh
    const snap = await getDocs(collection(db, "destinations"));
    setDestinations(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
  };

  // Delete destination
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "destinations", id));
    setDestinations(destinations.filter((d) => d.id !== id));
  };

  // Edit destination
  const handleEdit = (d) => {
    setDest({ name: d.name, img: d.img });
    setEditId(d.id);
  };

  return (
    <div className="my-8 p-4 bg-gray-50 rounded-xl">
      <h2 className="text-xl font-bold mb-2">Manage Popular Destinations</h2>
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <input
          className="border p-2 rounded"
          placeholder="Destination Name"
          value={dest.name}
          onChange={(e) => setDest({ ...dest, name: e.target.value })}
          required
        />
        <input
          className="border p-2 rounded"
          placeholder="Image URL"
          value={dest.img}
          onChange={(e) => setDest({ ...dest, img: e.target.value })}
          required
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          type="submit"
        >
          {editId ? "Update" : "Add"}
        </button>
        {editId && (
          <button
            type="button"
            className="bg-gray-400 text-white px-3 py-2 rounded"
            onClick={() => {
              setEditId(null);
              setDest({ name: "", img: "" });
            }}
          >
            Cancel
          </button>
        )}
      </form>
      <ul>
        {destinations.map((d) => (
          <li key={d.id} className="flex items-center gap-4 mb-2">
            <img
              src={d.img}
              alt={d.name}
              className="w-12 h-12 rounded-full object-cover border"
            />
            <span className="flex-1">{d.name}</span>
            <button className="text-blue-600" onClick={() => handleEdit(d)}>
              Edit
            </button>
            <button className="text-red-600" onClick={() => handleDelete(d.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Place <AdminDestinations /> inside your AdminPage component, above or below the hotel form.

export default AdminPage;
