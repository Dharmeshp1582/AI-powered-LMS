import React from 'react'
import logo from '../assets/logo.png'
import { useNavigate } from 'react-router-dom';

const Footer = () => {

  const navigate = useNavigate();

  return (
    <div className='bg-black text-gray-300 py-10 px-6'>
       <div className='max-w-7xl mx-auto flex lg:items-center items-start justify-center gap-[40px] lg:gap-[150px] flex-col lg:flex-row '>
       

       <div className='lg:w-[40%] md:w-[50%] w-[100%]'>
        <img src={logo} alt="" className='h-10 mb-3 border-1 rounded-[5px]' />
        <h2 className='text-xl font-bold text-white mb-3'>Virtual Learning</h2>
        <p className='text-sm'>AI-Powered Learning Platform to help you learn and grow.learn anywhere, anytime and anything.</p>
       </div>


       <div className='lg:w-[30%]  md:w-[100%]'>
        <div className='text-white font-semibold mb-2'>
   Quick links
        </div>

        <ul className='text-sm space-y-1'>
          <li className='mb-2 hover:text-white  cursor-pointer' onClick={()=>navigate('/')}>Home</li>
          <li className='mb-2 hover:text-white  cursor-pointer' onClick={()=>navigate('/mycourses')}>My Courses</li>
          <li className='mb-2 hover:text-white  cursor-pointer' onClick={()=>navigate('/allcourses')}>All Courses</li>
          <li className='mb-2 hover:text-white  cursor-pointer' onClick={()=>navigate('/profile')}>My Profile</li>
        </ul>
       </div>
       
       
        <div className='lg:w-[30%]  md:w-[100%]'>
        <div className='text-white font-semibold mb-2'>
   Category
        </div>

        <ul className='text-sm space-y-1'>
          <li className='mb-2 hover:text-white  cursor-pointer'>Web Development</li>
          <li className='mb-2 hover:text-white  cursor-pointer'>App Development</li>
          <li className='mb-2 hover:text-white  cursor-pointer'>AI/ML Development</li>
          <li className='mb-2 hover:text-white  cursor-pointer'>And More</li>
        </ul>
       </div>
       </div>


      <div className='border-t border-gray-700 mt-10 pt-5 text-sm
text-center  text-gray-500'>© {new Date().getFullYear()} 
<span className='ml-1'>Virtual Courses. All rights reserved.</span>
</div>
    </div>
  )
}

export default Footer