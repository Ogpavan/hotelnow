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

function AdminLocalities() {
  const [cities, setCities] = useState([]);
  const [localities, setLocalities] = useState([]);
  const [form, setForm] = useState({ name: "", city: "" });
  const [editId, setEditId] = useState(null);

  // Fetch cities
  useEffect(() => {
    const fetchCities = async () => {
      const snap = await getDocs(collection(db, "cities"));
      setCities(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    };
    fetchCities();
  }, []);

  // Fetch localities
  useEffect(() => {
    const fetchLocalities = async () => {
      const snap = await getDocs(collection(db, "localities"));
      setLocalities(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    };
    fetchLocalities();
  }, []);

  // Add or update locality
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.city) return;
    if (editId) {
      await updateDoc(doc(db, "localities", editId), form);
      setEditId(null);
    } else {
      await addDoc(collection(db, "localities"), form);
    }
    setForm({ name: "", city: "" });
    // Refresh
    const snap = await getDocs(collection(db, "localities"));
    setLocalities(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
  };

  // Delete locality
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "localities", id));
    setLocalities(localities.filter((l) => l.id !== id));
  };

  // Edit locality
  const handleEdit = (l) => {
    setForm({ name: l.name, city: l.city });
    setEditId(l.id);
  };

  return (
    <div className="my-8 p-4 bg-gray-50 rounded-xl">
      <h2 className="text-xl font-bold mb-2">Manage Popular Localities</h2>
      <form onSubmit={handleSubmit} className="flex flex-wrap gap-2 mb-4">
        <input
          className="border p-2 rounded"
          placeholder="Locality Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <select
          className="border p-2 rounded"
          value={form.city}
          onChange={(e) => setForm({ ...form, city: e.target.value })}
          required
        >
          <option value="" disabled>
            Select City
          </option>
          {cities.map((c) => (
            <option key={c.id} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>
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
              setForm({ name: "", city: "" });
            }}
          >
            Cancel
          </button>
        )}
      </form>
      <ul>
        {localities.map((l) => (
          <li key={l.id} className="flex items-center gap-4 mb-2">
            <span className="flex-1">
              {l.name} <span className="text-xs text-gray-500">({l.city})</span>
            </span>
            <button className="text-blue-600" onClick={() => handleEdit(l)}>
              Edit
            </button>
            <button className="text-red-600" onClick={() => handleDelete(l.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminLocalities;
