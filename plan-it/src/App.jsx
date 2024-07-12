import { useState } from 'react'
import './App.css'
import MyCalendar from './components/Calendar'
import CalendarHeader from './components/CalendarHeader'
import SideBar from './components/SideBar'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="h-screen flex flex-col">
        <CalendarHeader/>
        <div className="flex flex-1">
          <SideBar/>
          <MyCalendar/>
        </div>
      </div>
    </>
  )
}

export default App
