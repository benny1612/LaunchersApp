import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getLauncherById, deleteLauncher, Updatelauncher } from '../api.js'

export default function LauncherDetailsPage() {
  const { id } = useParams()
  const [launcher, setLauncher] = useState()
  const [update, setUpdate] = useState(false)
  const [msg, setMsg] = useState("")
  const [msg2, setMsg2] = useState("")

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    if (isNaN(data.latitude) || isNaN(data.longitude)) {
      setMsg2("latitude and longitude must be numbers")
      return
    }

    data.latitude = Number(data.latitude)
    data.longitude = Number(data.longitude)

    try {
      const response = await Updatelauncher(id, data)
      
        setUpdate(false)
      
    } catch (error) {
        console.log(error)
      setMsg2("launcher not update ")
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <div className="ml-20 mt-10">
      {launcher && (
        <div className="p-5 border">
          <p className="text-xl font-bold mb-4">Details</p>
          <p>name: {launcher.name}</p>
          <p>rocket Type: {launcher.rocketType}</p>
          <p>City: {launcher.city}</p>
          <p>latitude: {launcher.latitude}</p>
          <p>longitude: {launcher.longitude}</p>
          <p>id: {launcher._id}</p>

          <div className="flex gap-4">
            <button
              onClick={handleDelete}
              className="border border-red-800 text-red-800 p-2 mt-4 rounded text-sm hover:bg-red-50"
            >
              Delete Launcher
            </button>

            <button
              onClick={() => setUpdate(true)}
              className="border border-blue-800 text-blue-800 p-2 mt-4 rounded text-sm hover:bg-blue-50"
            >
              Update Details
            </button>
          </div>

          {msg && <p className="text-blue-600 mt-2">{msg}</p>}
        </div>
      )}

      {update && (
        <div>
          <p className="font-bold mb-4">update Launcher </p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input type="text" name="name" placeholder="name" className="border p-1" />
            
            <select name="rocketType" className="border p-1">
              <option value="">Type</option>
              <option value="Shahab3">Shahab3</option>
              <option value="Fetah110">Fetah110</option>
              <option value="Radwan">Radwan</option>
              <option value="Kheibar">Kheibar</option>
            </select>

            <input type="number"  name="latitude" placeholder="latitude" className="border p-1" />
            <input type="number"  name="longitude" placeholder="longitude" className="border p-1" />
            <input type="text" name="city" placeholder="city" className="border p-1" />

            <button type="submit" className="bg-blue-600 text-white p-3">
              update
            </button>
          </form>
          {msg2 && <p className="text-red-600">{msg2}</p>}
        </div>
      )}
    </div>
  )
}
