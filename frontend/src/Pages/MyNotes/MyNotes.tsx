import { Link } from "react-router-dom";
import PageTemplate from "../../Components/PageTemplate/PageTemplate";
import Card from "../../Components/Card/Card";
import notes from "../../../data/notes";
import { useEffect } from "react";
import axios from "axios";

const MyNotes = () => {
  const fetchNotes = async () => {
    try {
      const response = await axios.get("/api/notes");
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <PageTemplate title="Welcome Back Sooraj ">
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
