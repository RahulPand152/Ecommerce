import axios from 'axios'
import React, { useState } from 'react'

import toast from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'

function Buy() {

  const {courseId} = useParams()
  const [loading, setLoading] =useState(false)
  const navigate = useNavigate()

  const token =  JSON.parse(localStorage.getItem('user'))
  //console.log("User", user)
  //const token = User.token;

 // console.log("token", user)

  const handlePurchase= async()=>{
   if(!token){
    toast.error("Please login to purchase to course")
   }

   try {
    setLoading(true)
    const response =  await axios.post(`http://localhost:5000/api/v1/course/buy/${courseId}`,{},{
      headers:{
        Authorization:`Bearer ${token}`
      },
      withCredentials:true
    })
    toast.success( response.data.message||"Course purchased successfuly!")
    setLoading(true)
    navigate("/purchases")
   } catch (error) {
    setLoading(false)
    if(error?.response?.status === 400){
      toast.error("you have already purchased this course")
      navigate("/purchases")
    }else{
      toast.error(error?.response?.data?.errors)
    }
   }
  };
  return (
    
    <div className='flex h-screen items-center justify-center'>
      <button className='
      bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600' onClick={handlePurchase} disabled={loading}>{loading? "Processing..": "Buy Now"}</button>
    </div>
  )
}

export default Buy
