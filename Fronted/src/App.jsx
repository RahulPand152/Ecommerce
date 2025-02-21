import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home.jsx'
import Login from './components/Login.jsx'
import Signup from './components/Signup.jsx'
import  { Toaster } from 'react-hot-toast';
import Courses from './components/courses.jsx'
import Buy from './components/Buy.jsx'
import Purchases from './components/Purchases.jsx'

export default function App() {
  return (
    <>
       <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Other Routes */}
      <Route path="/courses" element={<Courses />} />
      <Route path="/buy/:courseId" element={<Buy />} />
      <Route path="/purchases" element={<Purchases />} />
      </Routes>
      <Toaster />
  
    </>
  )
}
