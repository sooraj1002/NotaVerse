import { Link, useNavigate } from "react-router-dom";
import PageTemplate from "../../Components/PageTemplate/PageTemplate";
import Card from "../../Components/Card/Card";
import { useEffect, useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";

interface Note {
  _id: string;
  title: string;
  content: string;
  category: string;
}

interface JwtPayload {
  sub: number;
  email: string;
  exp: number;
  name: string;
}

const MyNotes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [name, setName] = useState<String>("");

  const fetchNotes = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_LINK}/notes`
      );
      setNotes(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const token = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  const checkToken = async () => {
    if (token) {
      try {
        const decoded: JwtPayload = await jwt_decode(token);
        // console.log(decoded);
        if (decoded.exp * 1000 > Date.now()) {
          setName(decoded.name);
          console.log(name);
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.log("token has expired");
      }
    }
  };

  useEffect(() => {
    fetchNotes();
    if (!checkToken()) {
      alert("Session has expired, login again");
      navigate("/login");
    }
  }, []);

  const title = `Welcome back ${name}`;
  return (
    <PageTemplate title={title}>
      <Link to="create">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-full ml-8 mt-5">
          Create New Note
        </button>
      </Link>
      {notes.map((note) => (
        <Card note={note} key={note._id} />
      ))}
    </PageTemplate>
  );
};

export default MyNotes;
