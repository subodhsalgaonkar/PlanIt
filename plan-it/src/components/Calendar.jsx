import { Calendar, dayjsLocalizer } from "react-big-calendar";
import dayjs from "dayjs";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./Calendar.css";
import SideBar from "./SideBar";
import CalendarHeader from "./CalendarHeader";

const localizer = dayjsLocalizer(dayjs);

const MyCalendar = ({ events }) => (
  <div className="">
    <CalendarHeader />
    <SideBar />
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

export default MyCalendar;
