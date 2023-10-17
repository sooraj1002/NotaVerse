import Footer from "./Components/Footer/Footer";
import LandingPage from "./Pages/LandingPage/LandingPage";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import MyNotes from "./Pages/MyNotes/MyNotes";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup";
import Navbar from "./Components/Navbar/Navbar";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";

interface JwtPayload {
  exp: number;
  name: string;
}

export default function App() {
  const [name, setName] = useState<string>("");
  const token = localStorage.getItem("accessToken");

  const checkToken = async () => {
    if (token) {
      try {
        const decoded: JwtPayload = await jwt_decode(token);
        if (decoded.exp * 1000 > Date.now()) {
          setName(decoded.name);
          console.log(name);
        }
      } catch (error) {
        console.log("token has expired");
      }
    }
  };

  useEffect(() => {
    checkToken();
  }, []);
  return (
    <>
      <Navbar name={name} />
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
