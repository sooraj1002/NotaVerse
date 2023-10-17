import Footer from "./Components/Footer/Footer";
import LandingPage from "./Pages/LandingPage/LandingPage";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import MyNotes from "./Pages/MyNotes/MyNotes";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup";
import Navbar from "./Components/Navbar/Navbar";

export default function App() {
  return (
    <>
      <Navbar />
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/mynotes" element={<MyNotes />} />
        </Routes>
      </Router>
      <Footer />
    </>
  );
}
