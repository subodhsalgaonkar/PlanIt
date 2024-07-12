import React from 'react'
import reactLogo from '../assets/react.svg'

export default function CreateButton() {
  return (
    <button className='p-2 rounded-full flex items-center shadow-md hover:shadow-2xl'>
      <img src={reactLogo} alt="create" className="w-9 h-9"/>
      <span className="pl-3 pr-7 text- text-black font-sans">Create</span>
    </button>
  )
}
