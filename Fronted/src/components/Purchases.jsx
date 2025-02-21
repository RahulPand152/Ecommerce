 import React, { useEffect, useState } from 'react'
 import toast from 'react-hot-toast';
 import { Navigate } from 'react-router-dom';
 
import { FaDiscourse } from 'react-icons/fa6';
import { FaDownload } from 'react-icons/fa';
import { RiHome2Fill } from "react-icons/ri";

import { IoLogIn,IoLogOut } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";
 
 import axios from 'axios';

function Purchases() {
   

 
    const [purchases, setPurchase]= useState([])
    const[isLoggedIn, setIsLoggedIn] = useState(false);
    const[errorMessage, setErrorMessage] = useState(true)

    console.log("purchases",purchases)
    //token
    useEffect(()=>{
      const token = localStorage.getItem("user")
      if(token)
      setIsLoggedIn(true)
      else{
        setIsLoggedIn(false)
      }
    }, []);
    
    const handleLogout = async ()=>{
    
      try {
         const response =  await axios.get("http://localhost:5000/api/v1/User/logout",{
          withCredentials: true
        })
        toast.success( response.data.message)
        setIsLoggedIn(false)
      } catch (error) {
        console.log("Error in logging out", error)
        toast.error(error.response.data.errors ||"Error in logging out")
      }
    }
    
    
    //fetch courses
         useEffect(()=>{
          const fetchPurchase= async()=>{
            const token = JSON.parse(localStorage.getItem("user"))
            //const token = user.token
            console.log("purchase token", token)
            if(!token){
             setErrorMessage("Please login to purchase to course")
             return;
            }
         
            try {
             
             const response =  await axios.get("http://localhost:5000/api/v1/User/purchased",{},{
               headers:{
                 Authorization:`Bearer ${token}`
               },
               withCredentials:true
             })
             setPurchase(response.data.courseData)
            } catch (error) {
             setErrorMessage(error.response.data.errors || "Failed to purchased data")
            }
           };
           fetchPurchase()
          
          }, []);
         
    
        return (
    <div className='flex h-screen'>
      {/* Sidebar */}
      <div className=' w-64 bg-gray-100 p-5'>
        <nav>

          <ul>
                      <li className='mb-4'>
                      <a href='/' className='flex items-center'>
                      <span className='material-icons mr-2'>
                        <RiHome2Fill />
                      </span>{""}
                      Home
                      </a>
                      </li>
          
                      <li className='mb-4'>
                      <a href='#' className='flex items-center'>
                      <span className='material-icons mr-2'>
                        <FaDiscourse />
                      </span>{""}
                      Course
                      </a>
                      </li>
          
                      <li className='mb-4'>
                      <a href='/purchases' className='flex items-center'>
                      <span className='material-icons mr-2'>
                        <FaDownload  />
                      </span>{""}
                      Purchases
                      </a>
                      </li>
          
                      <li className='mb-4'>
                      <a href='#' className='flex items-center'>
                      <span className='material-icons mr-2'>
                        <IoMdSettings  />
                      </span>{""}
                      Setting
                      </a>
                      </li>
          
                      <li>
                        { isLoggedIn ? (
                          <a href='/'
                          className='flex items-center text-black'
                          onClick={handleLogout}
                          >
                            <span className='mr-2'>
                              <IoLogOut/>
                            </span>{""}
                            Logout
                            </a>
          
                        ):(
                          <>
                          <a href='/login' className='flex items-center text-black'>
                          <span className='mr-2'>
                            <IoLogIn/>
                            </span>{""}
                            Login
                            </a>
                          </>
                        )
                        }
                      </li>
                    </ul>

        </nav>
      </div>

      {/* main content */}
      <div className='flex-1 p-8 bg-gray-50'>
        <h2 className='text-xl font-semibold mb-6'>My Purchases</h2> 

        {/* error message */} 

        {
          errorMessage && (
            <div className='text-red-500 text-center'>{errorMessage}</div>
          )
        } 

        {/*Render purchase */}
        {
          purchases.length > 0 ?(
            <div className=' grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
              {
                Purchases.map((purchase, index) => (
                  <div 
                  key={index}
                  className='bg-white rounded-lg shadow-md p-6 mb-6'>

                    {/* Course Image */}
                    <img  
                    className='rounded-lg w-full h-48 object-cover'
                    src={
                      purchase.image?.url || "https://via.placeholder.com/200"
                    
                    }
                    alt={purchase.title}
                    />

                    <div  className='
                     text-center'>
                      <h3 className='text-lg font-bold'>{purchase.title}</h3>
                      <p className='text-gray-500'> 
                        {
                        purchase.description.length >100
                        ? `${purchase.description.slice(0,100)}...`
                        : purchase.description
                      }
                      </p>
                      <span className='text-gray-700 font-semibold text-sm'>${purchase.price}</span>

                    </div>
                    </div>
                ))
              }
            </div>
          ):(
            <p className='text-gray-500'>You have no purchase yet</p>
          )
        }             
      </div>
      
    </div>
  )
}

export default Purchases
