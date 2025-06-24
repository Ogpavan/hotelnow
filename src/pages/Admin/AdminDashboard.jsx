import React, { useState } from "react";
import AdminHotels from "./AdminHotels";
import AdminCities from "./AdminCities";
import AdminDestinations from "./AdminDestinations";
import AdminLandmarks from "./AdminLocalities";
import AdminLocalities from "./AdminLocalities";
import AdminHotelListEditor from "./AdminHotelListEditor";

const sections = [
  { key: "hotels", label: "Hotels" },
  { key: "edithotels", label: "Edit Hotels" },
  { key: "cities", label: "Cities" },
  { key: "destinations", label: "Popular Destinations" },
  { key: "localities", label: "Popular Localities" },
];

export default function AdminDashboard() {
  const [active, setActive] = useState("hotels");

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-8 text-blue-700">Admin Panel</h2>
        <nav className="flex flex-col gap-4">
          {sections.map((s) => (
            <button
              key={s.key}
              className={`text-left px-4 py-2 rounded transition ${
                active === s.key
                  ? "bg-blue-600 text-white font-semibold"
                  : "hover:bg-blue-100 text-gray-700"
              }`}
              onClick={() => setActive(s.key)}
            >
              {s.label}
            </button>
          ))}
        </nav>
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-8">
        {active === "hotels" && <AdminHotels />}
        {active === "edithotels" && <AdminHotelListEditor />}
        {active === "cities" && <AdminCities />}
        {active === "destinations" && <AdminDestinations />}
        {active === "localities" && <AdminLocalities />}
      </main>
    </div>
  );
}
