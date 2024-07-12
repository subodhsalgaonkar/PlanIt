import React, { useState } from 'react'
import CreateButton from './CreateButton'
import SmallCalendar from './SmallCalendar';
import Dropdown from './Dropdown';



export default function SideBar() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const myCalendars = ['SYIT 24', 'Office', 'GYM', 'Tutions', 'NGO', 'Group project', 'Cricket', 'School'];
  const otherCalendars = ['Holiday Calendar', 'Meetings']; {/*These are just for test*/ }

  return (
    <aside className=' border p-5 w-2/12 '>
      <CreateButton/>
      <div className="mt-4">
        <SmallCalendar selectedDate={selectedDate} onDateChange={setSelectedDate} />
      </div>
      <div className="mt-4">
        <Dropdown name="Communities" values={myCalendars} />
        <Dropdown name="Other calendars" values={otherCalendars} />
      </div>
    </aside>
  )
}
