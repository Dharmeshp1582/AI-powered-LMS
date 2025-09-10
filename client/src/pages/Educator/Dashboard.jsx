import React from 'react'
import { FaArrowLeftLong } from 'react-icons/fa6';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  
  const {userData} = useSelector((state) => state.user);
  const navigate = useNavigate();

  return (
    <div className='flex min-h-screen bg-gray-100'>
    <FaArrowLeftLong className='w-[22px] h-[22px] absolute top-[10%] left-[10%] cursor-pointer text-black' onClick={()=> navigate('/')}/>
      <div className='w-full px-6 py-10 bg-gray-50 space-y-10'>
          {/* main section */}
        <div className='max-w-5xl mx-auto bg-white rounded-xl shadow-md p-6 flex flex-col md:flex-row items-center gap-6'>
       <img src={userData?.photoUrl || userData?.name.slice(0,1).toUpperCase()} alt="Educator" className='w-28 h-28 rounded-full object-cover border-2 border-black shadow-md' />
       <div className='text-center md:text-left space-y-1'>
   <h1 className='text-2xl font-bold text-gray-800'>Welcome, {userData?.name || "Educator"} 👋 </h1>
   <h1 className='text-xl font-semibold text-gray-800'>Total Earning : 0</h1>
   <p className='text-sm text-gray-600'>{userData?.description || "Start Creating Courses Now"}</p>
   <h1 className='px-[10px] text-center py-[10px] border-2 border-black bg-black text-white rounded-[10px] text-[15px] font-light flex items-center justify-center mt-2 cursor-pointer  hover:bg-white hover:text-black' onClick={()=> navigate("/courses")}>Create Course</h1>
       </div>
        </div>

        {/* Graph section */}
        <div>

        </div>
      </div>
    </div>
  )
}

export default Dashboard