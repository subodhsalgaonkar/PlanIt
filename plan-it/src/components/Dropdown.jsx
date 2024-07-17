import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NestedDropdown from "./NestedDropdown"; // Import the NestedDropdown component

const Dropdown = ({ name, values }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleFirstItemClick = (value) => {
    if (value === "Communities") {
      navigate("/communities");
    }
  };

  const mainCommunity = values[0];
  const myCommunities = values.slice(1); // Get all other communities

  return (
    <div className="mb-4">
      <div
        onClick={toggleDropdown}
        className="cursor-pointer flex justify-between items-center p-2 bg-gray-800 text-white rounded-md"
      >
        <span>{name}</span>
        <span>{isOpen ? "▲" : "▼"}</span>
      </div>
      {isOpen && (
        <ul className="overflow-auto h-52 mt-2 bg-gray-900 text-white rounded-md">
          <li className="px-4 py-2 hover:bg-gray-700 flex items-center">
            <button
              className="w-full text-left"
              onClick={() => handleFirstItemClick(mainCommunity)}
            >
              {mainCommunity}
            </button>
          </li>
          <li className="px-4 py-2 hover:bg-gray-700 flex items-center">
            <NestedDropdown values={myCommunities} />{" "}
            {/* Use the NestedDropdown component */}
          </li>
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
