import React, { useEffect, useState } from "react";
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import dayjs from "dayjs";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./Calendar.css";
import SideBar from "./SideBar";
import CalendarHeader from "./CalendarHeader";
import { useNavigate } from "react-router-dom";

const localizer = dayjsLocalizer(dayjs);

const MyCalendar = ({ events }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to manage login status
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoginStatus = () => {
      const isLoggedInStorage = localStorage.getItem("isLoggedIn") === "true";
      setIsLoggedIn(isLoggedInStorage);
      if (!isLoggedInStorage) {
        navigate("/login"); // Redirect to login if not logged in
      }
    };
    checkLoginStatus();
  }, [navigate]);

  const handleAddEvent = () => {
    // Handle navigation to the add event page or logic to add event
    console.log("Add Event clicked");
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
  );
};

export default MyCalendar;
