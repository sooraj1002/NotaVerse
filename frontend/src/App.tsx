import Footer from "./Components/Footer/Footer";
import LandingPage from "./Pages/LandingPage/LandingPage";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import MyNotes from "./Pages/MyNotes/MyNotes";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup";
import Navbar from "./Components/Navbar/Navbar";
import CreateNote from "./Pages/CreateNote/CreateNote";
import EditNote from "./Pages/EditNote/EditNote";
import { useState } from "react";

export default function App() {
  const [search, setSearch] = useState<string>("");
  return (
    <>
      <Navbar setSearch={setSearch} />
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/mynotes" element={<MyNotes search={search} />} />
          <Route path="/mynotes/create" element={<CreateNote />} />
          <Route path="/mynotes/:noteId" element={<EditNote />} />
        </Routes>
      </Router>
      <Footer />
    </>
  );
}
