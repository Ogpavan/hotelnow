import React, { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../firebase/config";

function AdminCities() {
  const [city, setCity] = useState("");
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchCities = async () => {
      const snap = await getDocs(collection(db, "cities"));
      setCities(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    };
    fetchCities();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!city) return;
    await addDoc(collection(db, "cities"), { name: city });
    setCity("");
    const snap = await getDocs(collection(db, "cities"));
    setCities(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "cities", id));
    setCities(cities.filter((c) => c.id !== id));
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Manage Cities</h2>
      <form onSubmit={handleAdd} className="flex gap-2 mb-4">
        <input
          className="border p-2 rounded"
          placeholder="City Name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          type="submit"
        >
          Add
        </button>
      </form>
      <ul>
        {cities.map((c) => (
          <li key={c.id} className="flex items-center gap-4 mb-2">
            <span className="flex-1">{c.name}</span>
            <button className="text-red-600" onClick={() => handleDelete(c.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminCities;
