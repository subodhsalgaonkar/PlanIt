import React, { useState, useEffect } from "react";
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import dayjs from "dayjs";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./Calendar.css";
import SideBar from "./SideBar";
import CalendarHeader from "./CalendarHeader";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { EventsProvider } from "../context/EventsContect";

const localizer = dayjsLocalizer(dayjs);

const MyCalendar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [events, setEvents] = useState([]);
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

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userId");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <EventsProvider value={{events,setEvents}}>
    <div className="relative">
      <div className="absolute top-4 right-4 z-10">
        {/* <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleAddEvent}
        >
          Add Event
        </button> */}
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
    </div>
    </EventsProvider>
  );
};

export default MyCalendar;
