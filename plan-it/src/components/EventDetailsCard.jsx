// EventDetailsCard.js
import React from 'react';

const EventDetailsCard = ({ event, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative bg-white p-8 rounded-lg shadow-lg w-full max-w-md max-h-60 overflow-y-auto">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          &times;
        </button>
        <h3 className="text-2xl font-bold mb-4">{event.title}</h3>
        <p className="mb-2">{new Date(event.start).toLocaleString()}</p>
        <p>{event.description}</p>
      </div>
    </div>
  );
};

export default EventDetailsCard;
