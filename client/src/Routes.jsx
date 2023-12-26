import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Dashboard from './Pages/Dashboard'
import Login from './Pages/Login'
import AdminPanel from './Pages/Admin/AdminPanel'
import Home from './Pages/HomePage/Home'
import IrmDashboard from './Pages/IRM/IrmDashboard'



const AllRoutes = () => {
  return (
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/dashboard" element={<Dashboard/>}></Route>
        <Route path="/admin" element={<AdminPanel/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/irm" element={<IrmDashboard/>}></Route>
      </Routes>
  )
}

export default AllRoutes