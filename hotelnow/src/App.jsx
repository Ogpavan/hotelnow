import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import HotelList from "./pages/HotelList";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

function App() {
  return (
    <Router>
      <div className="max-w-5xl mx-auto bg-[#e3ebf3]">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/hotels/:city" element={<HotelList />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;