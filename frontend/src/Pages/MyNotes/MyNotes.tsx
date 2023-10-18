import { Link, useNavigate } from "react-router-dom";
import PageTemplate from "../../Components/PageTemplate/PageTemplate";
import Card from "../../Components/Card/Card";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../Context/AuthContext";

interface Note {
  id: string;
  title: string;
  content: string;
  category: string;
}

const MyNotes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const { user, expired } = useAuth();

  const fetchNotes = async () => {
    if (!expired())
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_LINK}/notes`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        setNotes(response.data);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (expired()) {
      navigate("/login");
    }
    fetchNotes();
  }, []);

  const title = `Welcome back ${user?.name}`;
  return (
    <PageTemplate title={title}>
      <Link to="create">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-full ml-8 mt-5">
          Create New Note
        </button>
      </Link>
      {notes && notes.map((note) => <Card note={note} key={note.id} />)}
    </PageTemplate>
  );
};

export default MyNotes;
