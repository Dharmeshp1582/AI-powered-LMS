import React from 'react'
import { FaArrowLeftLong } from 'react-icons/fa6';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const MyEnrolledCourses = () => {

    const {userData} = useSelector((state) => state.user);
    const navigate = useNavigate(); 

  return (
    <div className='min-h-screen w-full px-4 py-9 bg-gray-50'>
    <FaArrowLeftLong className='w-[22px] h-[22px] absolute top-[3%] left-[5%] cursor-pointer md:left-[5%]  md:top-[6%] text-black' onClick={()=> navigate('/')}/>
       <h1 className='text-3xl text-center font-bold text-gray-800 mb-6'>
    My Enrolled Courses
       </h1>

       {
        userData?.enrolledCourses.length === 0 ? (
  <p className='text-gray-500 text-center w-full '>You have not enrolled in any course</p>
        ) : (<div className='flex items-center justify-center flex-wrap gap-[30px]'>
  {
    userData?.enrolledCourses.map((course,index) => (
       <div key={index} className='bg-white shadow-md overflow-hidden rounded-2xl border'>
    <img src={course?.thumbnail} alt="" className='w-full h-40 object-cover' />
    <div className='p-4'>
   <h2 className='text-lg font-semibold text-gray-900'>{course?.title}</h2>
   <p className='text-sm text-gray-600 mb-2'>{course?.category}</p>
   <p className='text-sm text-gray-600 mb-2'>{course?.level}</p>
   <h1 className='px-[10px] text-center py-[10px] border-2 border-black bg-black text-white rounded-[10px] text-[15px] font-light flex items-center gap-2 justify-center mt-[10px] hover:bg-gray-200 hover:text-black cursor-pointer ' onClick={()=> navigate(`/viewlecture/${course?._id}`)}>Watch Now</h1>
    </div>
       </div>
  ))}
        </div>)
       }
    </div>
  )
}

export default MyEnrolledCourses