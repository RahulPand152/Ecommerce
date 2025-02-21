import React, { useEffect, useState } from 'react'
import logo from "../../public/logo.jpeg"
import { Link } from 'react-router-dom'
import { FaFacebook } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import axios from "axios"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import toast from 'react-hot-toast';


export default function Home() {
  const [courses, setcourses]= useState([])
const [isLoggedIn, setIsLoggedIn] = useState(false);

//token
useEffect(()=>{
  const token = localStorage.getItem("user")
  if(token){
    console.log( "token",token)
  setIsLoggedIn(true);
  }
  else{
    setIsLoggedIn(false)
  }
}, []);


const handleLogout = async ()=>{

  try {
     const response =  axios.get("http://localhost:5000/api/v1/User/logout",
     {
      withCredentials: true,
    })
    console.log("Log out is problem")
    toast.success( (await response) .data.message);
    setIsLoggedIn(false)
  } catch (error) {
    console.log("Error in logging out", error)
    toast.error( error.response.data.errors ||"Error in logging out")
  }
}


//fetach
     useEffect(()=>{
      const fetchCourse = async() =>{
        try {
            const response =await axios.get("http://localhost:5000/api/v1/course/courses",
              {
                withCredentials:true
              }
            )
    console.log(response.data.courses);
        
          setcourses(response.data.courses)
        } catch (error) {
          console.log("error in fetchCourse ", error)
        }
      };
      fetchCourse()
     },
    []);

    

     //console.log(courses.image.url)

     var settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      initialSlide: 0,
      autoplay: true,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 2,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };

    //console.log(courses)

    

  return (
    
    <div className='bg-gradient-to-r from-black to-blue-950'>
     <div className=  ' text-white container mx-auto '>
      {/* Header */}
      <header className='flex items-center justify-between  p-6'>
    <div className='flex  items-center space-x-2'>
      <img src={logo} alt='' className='w-10 h-10 rounded-full' />
      <h1 className='text-2xl text-orange-500 font-bold'>CourseRahul</h1>
    </div>


    <div className='space-x-4'>
    { isLoggedIn? (



        <button onClick={handleLogout}
          className='bg-transparent text-white py-2 px-4 border border-white rounded'>Logout</button>
    
    ):(
    <>
      <Link to={"/login"} className='bg-transparent text-white py-2 px-4 border border-white rounded'>Login</Link>
    <Link to={"/signup"}className='bg-transparent text-white py-2 px-4 border border-white rounded'>Signup</Link>
    </>)
    
    }
    </div>
      </header>
      {/*Main section*/}
      <section className='text-center py-20'>
        <h1 className='text-4xl font-semibold text-orange-500'>CourseRahul</h1>
        <br />
        <p className='text-gray-500'>Sharpen your skills with course crafted by experts.</p>
        
        <div className='space-x-4 mt-8'>
          <Link to={"/courses"} className='bg-green-500 text-white py-3 px-4 rounded font-semibold hover:bg-white duration-300 hover:text-black'>Explore Courses</Link>
          <Link to={"https://www.youtube.com"} className='bg-white  text-black py-3 px-4 rounded font-semibold hover:bg-green-500 duration-300 hover:text-white'>Course videos</Link>
        </div>
        
      </section>
      <section className='p-10'>

      <Slider  className='' {...settings}>
        {
          courses.map((course) =>(
            
            <div key={course._id} className='p-4'>
              <div className='relative flex-shrink-0 w-92 transition-transform duration-300 transform hover:scale-105'>
                <div className='bg-gray-900 rounded-lg overflow-hidden'>
                  <img className='h-32 w-full contain-content' src={course.image.url} alt="" />
                  <div className='p-6 text-center'>
                    <h2 className='text-xl font-bold text-white'>{course.title}</h2>
                    <button className='mt-4 bg-orange-500 text-white py-2 px-4 rounded-full hover:bg-blue-500 duration-300'>Enroll Now</button>
                  </div>
                </div>
              </div>
            </div>
          ))
        }
      </Slider>
     
     
      </section>

      {/*footer */}
      <hr />
    
      <footer className='my-8'>
        <div className='grid grid-cols-1 md:grid-cols-3'>
        <div className='flex flex-col items-center md:items-start'>
        <div className='flex  items-center space-x-2'>
        <img src={logo} alt='' className='w-10 h-10 rounded-full' />
      <h1 className='text-2xl text-orange-500 font-bold'>CourseRahul</h1>
    </div>

  
<div className='mt-3 ml-2 md:ml-8'>
          <p className='mb-2'>Follow us</p>
          <div className='flex space-x-4'>
            <a href=""><FaFacebook className='hover:text-blue-400  text-2xl duration-300'/></a>
            <a href=""><FaInstagramSquare  className='hover:text-pink-600 text-2xl duration-300'/></a>
            <a href=""><FaXTwitter className='hover:text-blue-600 text-2xl duration-300' /></a>
          </div>
        </div>
</div>
        <div className='items-center flex flex-col'>
          <h3 className='text-lg font-semibold mb-3 mr-10'>connects</h3>
          <ul className=' space-y-2 text-gray-400'>
            <li className='hover:text-white cursor-pointer duration-300'>Youtube -coding</li>
            <li className='hover:text-white cursor-pointer duration-300'>telegram -Rahul</li>
            <li className='hover:text-white cursor-pointer duration-300'>Github -Rahul</li>
          </ul>
        </div>
        <div>
        <div className='items-center flex flex-col'>
          <h3 className='text-lg font-semibold mb-3 mr-10'>copyright &#169; 2025</h3>
          <ul className=' space-y-2 text-gray-400'>
            <li className='hover:text-white cursor-pointer duration-300'>Terms & Conditions</li>
            <li className='hover:text-white cursor-pointer duration-300'>Privacy Policy</li>
            <li className='hover:text-white cursor-pointer duration-300'>Refund & Cancellation</li>
          </ul>
        </div>
        </div>
        </div>
      </footer>
     </div>
    </div>
  )
}
