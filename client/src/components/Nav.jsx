import React, { useState } from 'react'
import logo from "../assets/logo.png" 
import { IoPersonCircle } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import { setUserData } from '../redux/userSlice'
import {RxHamburgerMenu} from 'react-icons/rx'
import { RxCross2 } from "react-icons/rx";
import { serverUrl } from '../App'

const Nav = () => {
  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [show,setShow] = useState(false);
  const [showHam,setShowHam] = useState(false);

  const handleLogout = async () => {
    try {
      const res = await axios.get(serverUrl + "/api/auth/logout", { withCredentials: true });
      dispatch(setUserData(null));
      toast.success("Logout successful");
      console.log(res.data);
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  return (
    <div>
    <div className='w-[100%] h-[70px] fixed px-[20px] py-[10px] flex items-center justify-between bg-[#00000047] z-10'>

      {/* Logo Section */}
      <div className='lg:w-[20%] w-[40%] lg:pl-[50px]'>
        <img 
          src={logo} 
          alt="Logo" 
          className='w-[60px] rounded-[5px] border-2 border-white cursor-pointer' 
        />
      </div>

      {/* Right Section */}
      <div className='w-[30%] lg:flex items-center justify-center gap-4 hidden'>
        
        {/* User Avatar / Icon */}
        {!userData && (
          <IoPersonCircle onClick={()=> setShow(!show)} className='w-[50px] h-[50px] fill-black cursor-pointer' />
        ) }
        
         {userData && (
          <div onClick={()=> setShow(!show)} className='w-[50px] h-[50px] rounded-full text-white flex items-center justify-center bg-black border-white cursor-pointer border-2 text-[20px]'>
            {userData?.name?.slice(0, 1).toUpperCase() || "U"}

          </div>
        )}

        {/* Educator Dashboard */}
        {userData?.role === "educator" && (
          <div className='px-[20px] py-[10px] border-2 lg:border-white border-black lg:text-white bg-black text-black rounded-[10px] text-[18px] font-light cursor-pointer'>
            Dashboard
          </div>
        )}

        {/* Auth Buttons */}
        {!userData ? (
          <span onClick={() => navigate("/login")} className='px-[20px] py-[10px] border-2 border-white text-white bg-[#000000d5] rounded-[10px] text-[18px] font-light cursor-pointer'>
            Login
          </span>
        ) : (
          <span onClick={handleLogout} className='px-[20px] py-[10px] border-2 border-white text-black bg-white rounded-[10px] text-[18px] font-light cursor-pointer'>
            Logout
          </span>
        )}
{ show &&
        <div className='absolute top-[110%] right-[15%] flex items-center flex-col justify-center gap-2 text-[16px] rounded-md bg-white px-[15px] py-[10px] border-[2px] border-black hover:border-white hover:text-white cursor-pointer hover:bg-black '>
<span className='bg-black text-white px-[30px] py-[10px] rounded-2xl hover:bg-gray-600 '>My Profile</span>
<span className='bg-black text-white px-[30px] py-[10px] rounded-2xl hover:bg-gray-600'>My Courses</span>
        </div>}
      </div>
        <RxHamburgerMenu className='w-[30px] h-[30px] lg:hidden fill-black cursor-pointer' onClick={()=> setShowHam(!showHam)} />
        <div className={` fixed top-0 left-0 w-[100vw] h-[100vh] bg-[#000000d6] flex items-center justify-center flex-col gap-5 z-10 lg:hidden ${showHam ? "translate-x-0 transition duration-600" : "translate-x-[-100%] transition duration-600"}`}>
        <RxCross2 color='white' className='w-[35px] h-[35px] fill-white absolute top-5 right-[4%] cursor-pointer' onClick={()=> setShowHam(!showHam)} />
         {!userData && (
          <IoPersonCircle className='w-[50px] h-[50px] fill-black cursor-pointer' />
        ) }
        
         {userData && (
          <div className='w-[50px] h-[50px] rounded-full text-white flex items-center justify-center bg-black border-white cursor-pointer border-2 text-[20px]'>
            {userData?.name?.slice(0, 1).toUpperCase() || "U"}

          </div>
        )}

          <div className='w-[180px] h-[60px] flex items-center justify-center border-2 border-white lg:border-black text-white bg-black lg:text-black rounded-[10px] text-[18px] font-light cursor-pointer'>
            My Profile
          </div>
        
        <div className='w-[180px] h-[60px] flex items-center justify-center border-2 border-white lg:border-black text-white bg-black lg:text-black rounded-[10px] text-[18px] font-light cursor-pointer'>
            My Courses
          </div>


        {userData?.role === "educator" && (
          <div className='w-[180px] h-[60px] flex items-center justify-center border-2 border-white lg:border-black text-white bg-black lg:text-black rounded-[10px] text-[18px] font-light cursor-pointer'>
            Dashboard
          </div>
        )}

        {!userData ? (
          <span onClick={() => navigate("/login")} className='w-[180px] h-[60px] flex items-center justify-center border-2 border-white lg:border-black text-white bg-black lg:text-black rounded-[10px] text-[18px] font-light cursor-pointer'>
            Login
          </span>
        ) : (
          <span onClick={handleLogout} className='w-[180px] h-[60px] flex items-center justify-center border-2 border-white lg:border-black text-white bg-black lg:text-black rounded-[10px] text-[18px] font-light cursor-pointer'>
            Logout
          </span>
        )}
        </div>

        
    </div>
    </div>
  )
}

export default Nav
