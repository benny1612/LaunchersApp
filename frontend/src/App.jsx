import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './comps/Header'
import Login from './comps/Login'
import HomePage from './pages/HomePage'
import AddLauncherPage from './pages/AddLauncherPage'
import LauncherDetailsPage from './pages/LauncherDetailsPage'

export default function App() {
  return (
    <BrowserRouter>
      <Header />
        <Routes>
                      <Route path="/login" element={<Login />} />

              <Route path="/" element={<HomePage />} />

            <Route path="/home" element={<HomePage />} />

          <Route path="/add" element={<AddLauncherPage />} />
          <Route path="/details/:id" element={<LauncherDetailsPage />} />
        </Routes>
    </BrowserRouter>
  )
}
