import React from "react";

interface NavbarProps {
  name: string;
}

const Navbar: React.FC<NavbarProps> = ({ name }) => {
  return (
    <nav className="flex justify-between px-20 py-10 items-center bg-blue-400">
      <a href="/">
        <h1 className="text-xl text-gray-800 font-bold">NotaVerse</h1>
      </a>
      <div className="flex items-center">
        <div className="flex items-center border-black">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 pt-0.5 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            className="ml-2 outline-none bg-transparent text-black placeholder:text-black"
            type="text"
            name="search"
            id="search"
            placeholder="Search..."
          />
        </div>
        <ul className="flex items-center space-x-6">
          <li className="font-semibold text-gray-700"></li>
          <li>
            <a href="/mynotes">My Notes</a>
          </li>
          <li className="group relative">
            <button className="flex items-center space-x-1 text-gray-700 group-hover:text-blue-500">
              <span>{name}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M2.293 4.293a1 1 0 011.414 0L10 10.586l6.293-6.293a1 1 0 111.414 1.414l-7 7a1 1 0 01-1.414 0l-7-7a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <ul className="absolute hidden space-y-2 mt-2 py-2 bg-white border border-gray-200 rounded shadow-lg group-hover:block transition-opacity duration-300 opacity-0 group-hover:opacity-100">
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-700 hover:text-blue-500"
                >
                  My Profile
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-700 hover:text-blue-500"
                >
                  Logout
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
