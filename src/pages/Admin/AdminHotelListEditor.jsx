import React, { useEffect, useState } from "react";
import { db } from "../../firebase/config";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { FaEdit, FaSave } from "react-icons/fa";

const AdminHotelListEditor = () => {
  const [hotels, setHotels] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editedHotel, setEditedHotel] = useState({});

  useEffect(() => {
    const fetchHotels = async () => {
      const snap = await getDocs(collection(db, "hotels"));
      setHotels(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    };
    fetchHotels();
  }, []);

  const handleEditClick = (index) => {
    setEditIndex(index);
    const hotel = hotels[index];
    setEditedHotel({
      ...hotel,
      image: Array.isArray(hotel.image)
        ? hotel.image.join(", ")
        : hotel.image || "",
      amenities: Array.isArray(hotel.amenities)
        ? hotel.amenities.join(", ")
        : hotel.amenities || "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedHotel({ ...editedHotel, [name]: value });
  };

  const handleSave = async () => {
    const docRef = doc(db, "hotels", editedHotel.id);
    const updated = {
      ...editedHotel,
      price: Number(editedHotel.price),
      originalPrice: Number(editedHotel.originalPrice),
      rating: Number(editedHotel.rating),
      reviews: Number(editedHotel.reviews),
      latitude: Number(editedHotel.latitude),
      longitude: Number(editedHotel.longitude),
      featured: Boolean(editedHotel.featured),
      verified: Boolean(editedHotel.verified),
      amenities: editedHotel.amenities.split(",").map((a) => a.trim()),
      image: editedHotel.image.split(",").map((i) => i.trim()),
    };

    await updateDoc(docRef, updated);

    const updatedHotels = [...hotels];
    updatedHotels[editIndex] = updated;
    setHotels(updatedHotels);
    setEditIndex(null);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Hotel List & Editor</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th>Name</th>
            <th>City</th>
            <th>Price</th>
            <th>Rating</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {hotels.map((hotel, index) => (
            <tr key={hotel.id} className="border-t">
              <td>
                {editIndex === index ? (
                  <input
                    name="name"
                    value={editedHotel.name}
                    onChange={handleInputChange}
                    className="border p-1"
                  />
                ) : (
                  hotel.name
                )}
              </td>
              <td>
                {editIndex === index ? (
                  <input
                    name="city"
                    value={editedHotel.city}
                    onChange={handleInputChange}
                    className="border p-1"
                  />
                ) : (
                  hotel.city
                )}
              </td>
              <td>
                {editIndex === index ? (
                  <input
                    name="price"
                    type="number"
                    value={editedHotel.price}
                    onChange={handleInputChange}
                    className="border p-1"
                  />
                ) : (
                  `₹${hotel.price}`
                )}
              </td>
              <td>
                {editIndex === index ? (
                  <input
                    name="rating"
                    type="number"
                    step="0.1"
                    value={editedHotel.rating}
                    onChange={handleInputChange}
                    className="border p-1"
                  />
                ) : (
                  hotel.rating
                )}
              </td>
              <td>
                {editIndex === index ? (
                  <button
                    onClick={handleSave}
                    className="text-green-600 hover:text-green-800"
                  >
                    <FaSave />
                  </button>
                ) : (
                  <button
                    onClick={() => handleEditClick(index)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <FaEdit />
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminHotelListEditor;
