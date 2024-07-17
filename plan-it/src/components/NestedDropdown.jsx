import React, { useState } from "react";

const NestedDropdown = ({ values }) => {
  const [isNestedOpen, setIsNestedOpen] = useState(false);

  const toggleNestedDropdown = () => {
    setIsNestedOpen(!isNestedOpen);
  };

  return (
    <div className="mt-2">
      <div
        onClick={toggleNestedDropdown}
        className="cursor-pointer flex justify-between items-center p-2 bg-gray-700 text-white rounded-md"
      >
        <span>My Communities</span>
        <span>{isNestedOpen ? "▲" : "▼"}</span>
      </div>
      {isNestedOpen && (
        <ul className="mt-2 bg-gray-800 text-white rounded-md">
          {values.map((value, index) => (
            <li
              key={index}
              className="px-4 py-2 hover:bg-gray-600 flex items-center"
            >
              <input type="checkbox" className="mr-2" />
              {value}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NestedDropdown;
