import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './comps/Header'
import HomePage from './pages/HomePage'
import AddLauncherPage from './pages/AddLauncherPage'
import LauncherDetailsPage from './pages/LauncherDetailsPage'

export default function App() {
  return (
    <BrowserRouter>
      <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add" element={<AddLauncherPage />} />
          <Route path="/details/:id" element={<LauncherDetailsPage />} />
        </Routes>
    </BrowserRouter>
  )
}
