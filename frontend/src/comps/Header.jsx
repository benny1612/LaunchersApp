import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <nav className="bg-red-800 text-white p-4">
      <div className="flex justify-between items-center">
        <div className="flex gap-6">
          <Link to="/">Home</Link>
          <Link to="/add">Add Launcher</Link>
        </div>
      </div>
    </nav>
  )
}
