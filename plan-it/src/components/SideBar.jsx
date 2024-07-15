import React, { useState } from "react";
import { Link } from "react-router-dom";
import CreateButton from "./CreateButton";
import SmallCalendar from "./SmallCalendar";
import Dropdown from "./Dropdown";

export default function SideBar() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const myCalendars = [
    "SYIT 24",
    "Office",
    "GYM",
    "Tutions",
    "NGO",
    "Group project",
    "Cricket",
    "School",
  ];
  const otherCalendars = ["Holiday Calendar", "Meetings"];

  return (
    <aside className="border p-5 w-2/12">
      <CreateButton />
      <div className="mt-4">
        {/* <SmallCalendar
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
        /> */}
      </div>
      <div className="mt-4">
        <Link to="/profile">
          <div className="cursor-pointer flex justify-between items-center p-2 bg-gray-800 text-white rounded-md mb-4">
            <span>Profile</span>
          </div>
        </Link>
        <Link to="/mycalendar">
          <div className="cursor-pointer flex justify-between items-center p-2 bg-gray-800 text-white rounded-md mb-4">
            <span>Home</span>
          </div>
        </Link>
        <Dropdown name="Communities" values={myCalendars} />
        <Dropdown name="Other calendars" values={otherCalendars} />
      </div>
    </aside>
  );
}
