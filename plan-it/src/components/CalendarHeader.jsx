import React from 'react'
import reactLogo from '../assets/react.svg'

export default function CalendarHeader() {
  return (
    <div className='sticky top-0 w-screen bg-white'>
      <header className='px-4 py-2 flex items-center'>
        <button className='mr-2 w-12 h-12 hover:bg-gray-200 hover:rounded-full'>|||</button>
        <img src={reactLogo} alt="" className="mr-2 w-12 h-12" />
        <h1 className='pl-2  text-2xl text-black font-sans'>PlanIt</h1>
      </header>
    </div>
  )
}