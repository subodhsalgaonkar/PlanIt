import React, { useState, useEffect } from "react";
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import dayjs from "dayjs";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./Calendar.css";
import SideBar from "./SideBar";
import CalendarHeader from "./CalendarHeader";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const localizer = dayjsLocalizer(dayjs);

const MyCalendar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false); // State to manage modal visibility
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const checkLoginStatus = () => {
      const isLoggedInStorage = localStorage.getItem("isLoggedIn") === "true";
      setIsLoggedIn(isLoggedInStorage);
      if (!isLoggedInStorage) {
        navigate("/login");
      }
    };
    checkLoginStatus();
  }, [navigate]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:3000/events", {
          params: { userId },
        });
        const fetchedEvents = response.data.map((event) => ({
          ...event,
          start: new Date(event.date),
          end: new Date(event.date),
        }));
        setEvents(fetchedEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    if (userId) {
      fetchEvents();
    }
  }, [userId]);

  const handleAddEvent = () => {
    setShowModal(true); // Show the modal when "Add Event" is clicked
  };

  const handleCloseModal = () => {
    setShowModal(false); // Hide the modal
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/events", {
        date,
        time,
        title,
        description,
        userId,
      });
      if (response.data.message === "Event created successfully") {
        console.log("Event added:", response.data.event);
        // Update events state with the new event
        setEvents([
          ...events,
          {
            ...response.data.event,
            start: new Date(date),
            end: new Date(date),
          },
        ]);
        // Clear the form
        setDate("");
        setTime("");
        setTitle("");
        setDescription("");
        setShowModal(false); // Close the modal after successful submission
      } else {
        console.error("Failed to add event:", response.data.message);
      }
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userId");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <div className="relative">
      <div className="absolute top-4 right-4 z-10">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleAddEvent}
        >
          Add Event
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
      <CalendarHeader />
      <SideBar />
      {isLoggedIn && (
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: "91.2vh" }}
          className="fixed bottom-0 right-0 w-10/12 z-0"
        />
      )}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Add Event</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Date
                </label>
                <input
                  type="date"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Time
                </label>
                <input
                  type="time"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Title
                </label>
                <input
                  type="text"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Description
                </label>
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
      )}
    </div>
  );
};

export default MyCalendar;
