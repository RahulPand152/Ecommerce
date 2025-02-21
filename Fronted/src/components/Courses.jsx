import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import logo from "../../public/logo.jpeg"
import { FaCircleUser } from 'react-icons/fa6';
import { FaDiscourse } from 'react-icons/fa6';
import { FaDownload } from 'react-icons/fa';
import { RiHome2Fill } from "react-icons/ri";
import { FiSearch } from "react-icons/fi";
import { IoLogIn,IoLogOut } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";
import { Link } from 'react-router-dom';

function Courses() {
  
    const [courses, setcourses]= useState([])
    const[isLoggedIn, setIsLoggedIn] = useState(false);
    const[loading, setLoading] = useState(true)

    //console.log("courses",courses)
    //token
    useEffect(()=>{
      const token = localStorage.getItem("user")
      //console.log("Token", token)
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
          const fetchCourse = async() =>{
            try {
                const response =await axios.get("http://localhost:5000/api/v1/course/courses",
                  {
                    withCredentials:true
                  }
                )
        console.log("CImage",response.data.courses);
            
              setcourses(response.data.courses)
              setLoading(false)
            } catch (error) {
              console.log("error in fetchCourse ", error)
            }
          };
          fetchCourse()
         },
        []);
    
        //logout
        


         
      return (
    <div className='w-64 bg-gray-100 h-screen p-5 fixed'>
     {/*Slider*/}
     <aside>
        <div className='flex items-center mb-10'>
           <img src={logo} alt="Profile" className='rounded-full h-12 w-12' />
        </div>
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
              { isLoggedIn? (
                <a href='/'
                onClick={handleLogout}
                className='flex items-center text-black'>
                
                
                  <span className='mr-2'>
                    <IoLogOut/>
                  </span>
                  Logout
                  </a>

              ):(
                
                <a href='/login' className='flex items-center text-black'>
                <span className='mr-2'>
                  <IoLogIn/>
                  </span>
                  Login
                  </a>
                
              )
              }
            </li>
          </ul>
        </nav>
     </aside>
     {/*main content */}
     

              <main className='ml-[150%] w-[400%] absolute top-0 left-0    bg-white p-4'>
                <header className='flex justify-between items-center mb-10'>
                <h1 className='text-xl font-bold'>Courses</h1>
                <div className='flex items-center space-x-3'>
                  <div className='flex items-center'>

                  <input 
                  type='text'
                  placeholder='Type here to search...'
                  className='border border-gray-300 rounded-full px-4 py-2 h-10 focus:outline-none'
                  />
                  <button className='h-10 border border-gray-300 rounded-r-full px-4 flex items-center justify-center' >
                  <  FiSearch className='text-xl text-gray-600'/>
                  </button>
                  
                  </div>
                  <FaCircleUser className='text-4xl text-blue-600'/>
                </div>
                </header>

                {/* vertical scrollable course secton */}
                <div className='overflow-y-auto h-[75vh]'>

                  { loading ?(
                    <p className='text-center text-gray-500'>Loading...</p>
                  ): courses.length === 0 ?(
                    <p className='text-center text-gray-500'>No Course posted yet by admin</p>
                  ):
                  (
                    <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-6'>
                      {
                        courses.map((course) =>(
                          <div 
                          key={course._id}
                          className='border border-gray-200 rounded-lg p-4 shadow-sm'

                          >
                            <img 
                            src={course.image.url}
                            alt={course.title}
                            className='rounded mb-4'
                            />

                          <h2 className='font-bold text-lg mb-2'>{course.title}</h2>
                            <p className='text-gray-600 mb-4'>
                              {course.description.length > 100
                              ? `${course.description.slice(0, 100)} ..`
                              : course.description
                              }

                            </p>
                            <div className='flex justify-between items-center mb-4'>
                              <span className='font-bold text-xl'>
                                RS{course.price}{""}
                                <span className='text-gray-600 line-through'>5999</span>
                                <span className='text-green-600'>20% off</span>

                              </span>

                            </div>

                            {/*But page*/}
                            <Link to={`/buy/${course._id}`}
                            className='bg-orange-500 w-full text-white px-4 py-2 rounded-lg hover:bg-blue-500 duration-300'
                            >
                              Buy Now
                            </Link>
                            </div>
                        ))
                      }


                    </div>
                  )

                  }

                </div>

              </main>
    </div>
  )
}


export default Courses

