import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getLauncherById, deleteLauncher } from '../api.js'

export default function LauncherDetailsPage() {
  const { id } = useParams()
  const [launcher, setLauncher] = useState()
  const [msg, setMsg] = useState("")

  const handleDelete = async () => {
    try {
      const response = await deleteLauncher(id)
      setMsg("Launcher deleted")
      console.log(response)
    } catch (error) {
      setMsg("launcher not deleted ")
      console.log(error)
    }
  }

  const loadData = async () => {
    try {
      const data = await getLauncherById(id)
      setLauncher(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <div className="ml-20 mt-10">
      {launcher && (
        <div className="p-5 border ">
          <p className="text-xl font-bold mb-4">Details</p>
          <p>name: {launcher.name}</p>
          <p>rocket Type: {launcher.rocketType}</p>
          <p>City: {launcher.city}</p>
          <p>latitude: {launcher.latitude}</p>
          <p>longitude: {launcher.longitude}</p>
          <p>id: {launcher._id}</p>

          <button 
            onClick={handleDelete} 
            className="border border-red-800 text-red-800 p-2 mt-4 rounded text-sm hover:bg-red-50"
          >
            Delete Launcher
          </button>

          {msg && <p className=" text-blue-600 ">{msg}</p>}
        </div>
      )}
    </div>
  )
}
