import React, { useState } from "react";
import Button from "../Button/Button";

interface Note {
  id: string;
  title: string;
  content: string;
  category: string;
}

interface CardProps {
  note: Note;
}

const Card: React.FC<CardProps> = ({ note }) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleNoteDelete = (id: string) => {
    if (window.confirm("Are you sure")) {
      console.log("deleting id ", id);
    }
  };

  return (
    <div className="block rounded-lg bg-gray-300 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] my-5">
      <div className="flex justify-between border-b-2 border-neutral-100 px-6 py-3 dark:border-neutral-600 text-black text-2xl">
        <span className="cursor-pointer text-4xl" onClick={toggleCollapse}>
          {note.title}
        </span>
        <div>
          <a href={`/note/${note.id}`}>
            <Button
              title="Edit"
              customClass="px-2 py-1 mx-1 hover:bg-blue-700"
            />
          </a>
          <Button
            title="Delete"
            customClass="px-2 py-1 mx-1 bg-red-500 hover:bg-red-700"
            onClick={() => handleNoteDelete(note.id)}
          />
        </div>
      </div>
      <div className="p-6" hidden={isCollapsed}>
        <span className="bg-green-600 text-green-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded  dark:text-green-300">
          Category- {note.category}
        </span>
        <blockquote>
          <p className="text-2xl">{note.content}</p>
        </blockquote>
        <figcaption className="text-md text-neutral-600 dark:text-neutral-400">
          created on - DATE
        </figcaption>
      </div>
    </div>
  );
};

export default Card;
