import React, { useEffect, useState } from "react";
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import dayjs from "dayjs";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./Calendar.css";
import SideBar from "./SideBar";
import CalendarHeader from "./CalendarHeader";

const localizer = dayjsLocalizer(dayjs);

const MyCalendar = ({ events }) => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    setUsername(storedUsername);
    // Optionally retrieve the password if needed (not recommended for display)
    // const storedPassword = localStorage.getItem("password");
    // console.log("Stored Password: ", storedPassword);
  }, []);

  return (
    <div className="">
      <CalendarHeader />
      <SideBar />
      <div className="fixed top-0 left-0 p-4">
        <h2>Welcome, {username}</h2>
      </div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "91.2vh" }}
        className="fixed bottom-0 right-0 w-10/12"
      />
    </div>
  );
};

export default MyCalendar;
