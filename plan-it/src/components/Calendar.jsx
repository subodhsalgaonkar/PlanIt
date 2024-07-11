import { Calendar, dayjsLocalizer } from "react-big-calendar";
import dayjs from "dayjs";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./Calendar.css";

const localizer = dayjsLocalizer(dayjs);

const MyCalendar = ({ events }) => (
  <div className="static">
    <Calendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      style={{ height: "90vh" ,width:"90vw" }}
      className="absolute bottom-0 right-0"
    />
  </div>
);

export default MyCalendar;
