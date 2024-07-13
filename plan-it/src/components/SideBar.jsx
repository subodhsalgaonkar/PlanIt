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
        <SmallCalendar
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
        />
      </div>
      <div className="mt-4">
        <Link to="/profile">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Profile
          </button>
        </Link>
        <Dropdown name="Communities" values={myCalendars} />
        <Dropdown name="Other calendars" values={otherCalendars} />
      </div>
    </aside>
  );
}
