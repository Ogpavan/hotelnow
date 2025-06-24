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
// ...existing hotel code...

export default function AdminDestinations() {
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
