import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import LandingPage from "./Pages/LandingPage/LandingPage";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import MyNotes from "./Pages/MyNotes/MyNotes";

export default function App() {
  return (
    <>
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/mynotes" element={<MyNotes />} />
        </Routes>
      </Router>
      <Footer />
    </>
  );
}
