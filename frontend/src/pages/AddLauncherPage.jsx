import React, { useState } from 'react'
import { addLauncher } from '../api';

export default function AddLauncherPage() {
  const [msg, setMsg] = useState("")

  const handleSubmit =  async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    if (!data.name || !data.rocketType || !data.latitude || !data.longitude || !data.city) {
      setMsg("All fields are required")
      return
    }

   

    if (isNaN(data.latitude) || isNaN(data.longitude)) {
      setMsg("latitude and longitude must be numbers")
      return
    }
  data.latitude = Number(data.latitude)
    data.longitude = Number(data.longitude)

    
    const response = await addLauncher(data)
    console.log(response)
    if (response.acknowledged===true){
setMsg("Launcher added")
    }
    else{setMsg("Launcher not added")}
  }

  return (
    <div >
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input  type="text" name="name" placeholder="name" className="border p-1" />

        <select  name="rocketType" className="border p-1">
          <option value="">Type</option>
          <option value="Shahab3">Shahab3</option>
          <option value="Fetah110">Fetah110</option>
          <option value="Radwan">Radwan</option>
          <option value="Kheibar">Kheibar</option>
        </select>

        <input  type="number" step="any" name="latitude" placeholder="latitude" className="border p-1" />
        <input  type="number" step="any" name="longitude" placeholder="longitude" className="border p-1" />
        <input  type="text" name="city" placeholder="city" className="border p-1" />

        <button type="submit" className="bg-blue-600 text-white p-2">Add Launcher</button>
      </form>

      {msg && <p className="text-red-600 font-bold text-center m-2">{msg}</p>}
    </div>
  )
}
