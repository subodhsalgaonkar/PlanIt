import React, { useState } from 'react';

const Dropdown = ({ name, values }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="mb-4">
      <div
        onClick={toggleDropdown}
        className="cursor-pointer flex justify-between items-center p-2 bg-gray-800 text-white rounded-md"
      >
        <span>{name}</span>
        <span>{isOpen ? '▲' : '▼'}</span>
      </div>
      {isOpen && (
        <ul className="overflow-auto h-52 mt-2 bg-gray-900 text-white rounded-md">
          {values.map((value, index) => (
            <li key={index} className="px-4 py-2 hover:bg-gray-700 flex items-center">
              <input type="checkbox" className="mr-2"  />{/*this was checked before idk why*/}
              {value}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;