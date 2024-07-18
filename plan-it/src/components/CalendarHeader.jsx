import React from 'react'
import reactLogo from '../assets/react.svg'//svg of logo added



export default function CalendarHeader({handleLogout}) {
  return (
    <div className='sticky top-0 w-screen bg-white flex items-center'>
      <header className='px-4 py-2 flex items-center'>
        <button className='mr-2 w-12 h-12 hover:bg-gray-200 hover:rounded-full flex items-center justify-center'>
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#434343">
            <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/>
          </svg>
        </button>

        <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#77fd6d">
          <path d="M600-160q-134 0-227-93t-93-227q0-134 93-227t227-93q134 0 227 93t93 227q0 134-93 227t-227 93Zm-.24-60Q708-220 784-295.76q76-75.77 76-184Q860-588 784.24-664q-75.77-76-184-76Q492-740 416-664.24q-76 75.77-76 184Q340-372 415.76-296q75.77 76 184 76ZM702-337l42-42-114-114v-147h-60v172l132 131ZM80-610v-60h160v60H80ZM40-450v-60h200v60H40Zm40 160v-60h160v60H80Zm520-190Z"/>
        </svg>
        {/* <img src={reactLogo} alt="" className="mr-2 w-12 h-12" /> */}
        <h1 className='pl-2  text-2xl text-black font-sans font-bold'>PlanIt</h1>

      </header>
        <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded absolute right-3 "
            onClick={handleLogout}
          >
            Logout
        </button>
    </div>
  )
}