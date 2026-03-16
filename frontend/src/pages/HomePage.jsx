import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getAllLaunchers } from '../api'

export default function Home() {
  const [launchers, setLaunchers] = useState([])

  const loadData = async () => {
    try {
      const data = await getAllLaunchers()
      setLaunchers(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <div >
      
        <p className="text-2xl ">Launchers</p>
       
      

      <div className="space-y-4">
        {launchers && launchers.map((l) => (
          <div key={l._id} className=" border flex justify-between items-center ">
            <div>
              <p >name: {l.name}</p>
              <p>rocketType: {l.rocketType} </p>
              <p>city: {l.city}</p>
              <p>latitude: {l.latitude} </p>
              <p>longitude: {l.longitude}</p>
              <p>id: {l._id}</p>
            </div>
            
            <Link to={`/details/${l._id}`} >
               details
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
