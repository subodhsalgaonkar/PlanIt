import React, { useState } from "react";
import reactLogo from "../assets/react.svg";
import Addeventform from "./Addeventform";

export default function CreateButton() {
  const [showModal, setShowModal] = useState(false); // State to manage modal visibility

  const handleAddEvent = () => {
    setShowModal(true); // Show the modal when "Add Event" is clicked
  };

  return (
    <div>
      <button className="p-2 rounded-full flex items-center shadow-md hover:shadow-2xl" onClick={handleAddEvent}>
        <img src={reactLogo} alt="create" className="w-9 h-9" />
        <span className="pl-3 pr-7 text- text-black font-sans">Create</span>
      </button>
      {showModal && <Addeventform setShowModal={setShowModal} />}
    </div>
  );
}

