import { useState } from 'react'
import './App.css'
import MyCalendar from './components/Calendar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div style={{}}>
        <MyCalendar/>
      </div>
    </>
  )
}

export default App
