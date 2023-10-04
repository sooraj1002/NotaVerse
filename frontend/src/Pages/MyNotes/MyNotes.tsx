import { Link } from "react-router-dom";
import PageTemplate from "../../Components/PageTemplate/PageTemplate";
import Card from "../../Components/Card/Card";
import notes from "../../../data/notes";

const MyNotes = () => {
  return (
    <PageTemplate title="Welcome Back Sooraj ">
      <Link to="create">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-full ml-8 mt-5">
          Create New Note
        </button>
      </Link>
      {notes.map((note) => (
        <Card title={note.title} key={note._id} />
      ))}
    </PageTemplate>
  );
};

export default MyNotes;
