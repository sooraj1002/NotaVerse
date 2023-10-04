import React from "react";
import Button from "../Button/Button";

interface CardProps {
  title: string;
}

const Card: React.FC<CardProps> = ({ title }) => {
  return (
    <div className="block rounded-lg bg-gray-300 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] my-5">
      <div className="flex justify-between border-b-2 border-neutral-100 px-6 py-3 dark:border-neutral-600 text-black text-2xl">
        <span className="cursor-pointer">{title}</span>
        <div>
          <Button title="Edit" customClass="px-2 py-1 mx-1 hover:bg-blue-700" />
          <Button
            title="Delete"
            customClass="px-2 py-1 mx-1 bg-red-500 hover:bg-red-700"
          />
        </div>
      </div>
      <div className="p-6">
        <blockquote>
          <p className="text-xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
            posuere erat a ante.
          </p>
        </blockquote>
        <figcaption className="text-md text-neutral-600 dark:text-neutral-400">
          - Someone famous in <cite title="Source Title">Source Title</cite>
        </figcaption>
      </div>
    </div>
  );
};

export default Card;
