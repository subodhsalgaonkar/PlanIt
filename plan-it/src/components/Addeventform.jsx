import React, { useState } from 'react';
import axios from 'axios';
import { useEvents } from '../context/EventsContect';

export default function AddEventForm({ setShowModal }) {
  const { events, setEvents } = useEvents(); // Get events and setEvents from the Calendar context

  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const userId = localStorage.getItem('userId');

  const handleCloseModal = () => {
    setShowModal(false); // Hide the modal
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const combinedDateTime = new Date(`${date}T${time}`);// this is done as When you create a new Date object using only the date string, the time defaults to midnight UTC. When the time is converted to your local timezone, it adjusts accordingly, which might be why you see 5:30 AM.
      const response = await axios.post('http://localhost:3000/events', {
        date,
        time,
        title,
        description,
        userId,
      });

      if (response.data.message === 'Event created successfully') {
        console.log('Event added:', response.data.event);

        setEvents([
          ...events,
          {
            ...response.data.event,
            start: combinedDateTime,
            end: combinedDateTime,
          },
        ]);

        // Clear the form
        setDate('');
        setTime('');
        setTitle('');
        setDescription('');
        setShowModal(false); // Close the modal after successful submission
      } else {
        console.error('Failed to add event:', response.data.message);
      }
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Add Event</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Date</label>
            <input
              type="date"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Time</label>
            <input
              type="time"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Title</label>
            <input
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Add Event
            </button>
            <button
              type="button"
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleCloseModal}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
