import { useState } from "react";
import PageTemplate from "../../Components/PageTemplate/PageTemplate";
import axios from "axios";
import { useAuth } from "../../Context/AuthContext";

interface Note {
  title: string;
  content: string;
  category: string;
}

const CreateNote = () => {
  const [noteData, setNoteData] = useState<Note>({
    title: "",
    content: "",
    category: "",
  });

  const { expired } = useAuth();

  const handleInputChange = (name: string, value: string) => {
    setNoteData((prevNoteData) => ({
      ...prevNoteData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await sendrequest();
  };

  const sendrequest = async () => {
    if (!expired())
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_LINK}/notes`,
          noteData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        console.log("updated successfully", response);
      } catch (error) {
        console.error("Error updating note:", error);
      }
  };

  return (
    <PageTemplate title="Create New Note">
      <form
        className="h-auto p-6 bg-gray-100 flex justify-center"
        onSubmit={handleSubmit}
      >
        <div className="container max-w-screen-lg mx-auto">
          <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
            <div className="md:col-span-5">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                name="title"
                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 text-black"
                value={noteData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                required
              />
            </div>

            <div className="md:col-span-5">
              <label htmlFor="content">Content</label>
              <textarea
                name="content"
                className="h-40 border mt-1 rounded px-4 w-full bg-gray-50"
                value={noteData.content}
                onChange={(e) => handleInputChange("content", e.target.value)}
                required
              />
            </div>

            <div className="md:col-span-5">
              <label htmlFor="Category">Category</label>
              <input
                type="text"
                name="category"
                className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                value={noteData.category}
                onChange={(e) => handleInputChange("category", e.target.value)}
                required
              />
            </div>

            <div className="md:col-span-5 text-right">
              <div className="inline-flex items-end">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </PageTemplate>
  );
};

export default CreateNote;
