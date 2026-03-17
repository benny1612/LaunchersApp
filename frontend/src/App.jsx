import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './comps/Header'
import Login from './comps/Login'
import HomePage from './pages/HomePage'
import AddLauncherPage from './pages/AddLauncherPage'
import LauncherDetailsPage from './pages/LauncherDetailsPage'
import EditUserPage from './pages/EditUserPage'
import RegisterPage from './pages/RegisterPage'
import AdminPage from './pages/AdminPage'
import UsersPage from './pages/UsersPage'

export default function App() {
  return (
    <BrowserRouter>
      <Header />
        <Routes>
                      <Route path="/login" element={<Login />} />

              <Route path="/" element={<HomePage />} />

            <Route path="/home" element={<HomePage />} />
            <Route path="/editUser/:id" element={<EditUserPage />} />
            <Route path="/RegisterPage" element={<RegisterPage />} />
            <Route path="/AdminPage" element={<AdminPage />} />
            <Route path="/UsersPage" element={<UsersPage />} />

          <Route path="/add" element={<AddLauncherPage />} />
          <Route path="/details/:id" element={<LauncherDetailsPage />} />
        </Routes>
    </BrowserRouter>
  )
}
