import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Dashboard from './Pages/Dashboard'
import Admin from './Pages/Admin'



const AllRoutes = () => {
  return (
      <Routes>
        <Route path="/" element={<Dashboard/>}></Route>
        <Route path="/admin" element={<Admin/>}></Route>
       
      </Routes>
  )
}

export default AllRoutes