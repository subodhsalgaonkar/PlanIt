// import React from 'react'

// export default function SmallCalendar() {
//   return (
//     <div>
      
//     </div>
//   )
// }

import React, { useState } from 'react';
import dayjs from 'dayjs';
// import 'dayjs/locale/en'; // Import your locale if needed
// import './SmallCalendar.css'; // Custom styles for your calendar

const SmallCalendar = ({ selectedDate, onDateChange }) => {
  const [currentMonth, setCurrentMonth] = useState(dayjs().startOf('month'));

  const startOfMonth = currentMonth.startOf('month');
  const endOfMonth = currentMonth.endOf('month');
  const startDate = startOfMonth.startOf('week');
  const endDate = endOfMonth.endOf('week');

  const handlePrevMonth = () => {
    setCurrentMonth(currentMonth.subtract(1, 'month'));
  };

  const handleNextMonth = () => {
    setCurrentMonth(currentMonth.add(1, 'month'));
  };

  const handleDateClick = (date) => {
    onDateChange(date.toDate());
  };

  const renderDays = () => {
    const days = [];
    let day = startDate;

    while (day.isBefore(endDate)) {
      days.push(
        <div
          key={day.toString()}
          className={`day ${day.month() !== currentMonth.month() ? 'text-gray-400' : ''} ${
            day.isSame(selectedDate, 'day') ? 'selected' : ''
          }`}
          onClick={() => handleDateClick(day)}
        >
          {day.date()}
        </div>
      );
      day = day.add(1, 'day');
    }

    return days;
  };

  return (
    <div className="calendar">
      <div className="header flex justify-between items-center mb-2">
        <button onClick={handlePrevMonth}>&lt;</button>
        <div>{currentMonth.format('MMMM YYYY')}</div>
        <button onClick={handleNextMonth}>&gt;</button>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
          <div key={day} className="day-name">
            {day}
          </div>
        ))}
        {renderDays()}
      </div>
    </div>
  );
};

export default SmallCalendar;
