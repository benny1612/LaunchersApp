import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getLauncherById } from '../api.js'

export default function LauncherDetailsPage() {
  const { id } = useParams()
  const [launcher, setLauncher] = useState()
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
    <div>
      {launcher && (
        <div>
          <p> name: {launcher.name}</p>
          <p>rocket Type: {launcher.rocketType}</p>
          <p>City: {launcher.city}</p>
          <p>latitude: {launcher.latitude}</p>
          <p>longitude:{launcher.longitude}</p>
        </div>
      )}
    </div>
  )
}
