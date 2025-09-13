import React from 'react'
import { FaArrowLeftLong } from 'react-icons/fa6';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import {Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';

const Dashboard = () => {
  
  const {userData} = useSelector((state) => state.user);
  const navigate = useNavigate();
  const {creatorCourseData} = useSelector((state) => state.course);

  const courseProgressData = creatorCourseData.map((course) => ({name: course?.title?.slice(0, 10) + "...",
   lectures: course?.lectures?.length || 0,
  })) || [];

  const EnrollData = creatorCourseData.map((course) => ({name: course?.title?.slice(0, 10) + "...",
   enrolledStudents: course?.enrolledStudents?.length || 0,
  })) || [];

  const totalEarning = creatorCourseData?.reduce((sum,course)=>{
    const studentCount = course.enrolledStudents?.length || 0;
    const courseRevenue = course.price ? course.price * studentCount : 0;
    return sum + courseRevenue;
  },0) || 0

  return (
    <div className='flex min-h-screen bg-gray-100'>
    <FaArrowLeftLong className='w-[22px] h-[22px] absolute top-[10%] left-[10%] cursor-pointer md:left-[5%] text-black' onClick={()=> navigate('/')}/>
      <div className='w-full px-6 py-10 bg-gray-50 space-y-10'>
          {/* main section */}
        <div className='max-w-5xl mx-auto bg-white rounded-xl shadow-md p-6 flex flex-col md:flex-row items-center gap-6 '>
       <img src={userData?.photoUrl || userData?.name.slice(0,1).toUpperCase()} alt="Educator" className='w-28 h-28 rounded-full object-cover border-2 border-black shadow-md' />
       <div className='text-center md:text-left space-y-1'>
   <h1 className='text-2xl font-bold text-gray-800'>Welcome, {userData?.name || "Educator"} 👋 </h1>
   <h1 className='text-xl font-semibold text-gray-800'>Total Earning : ₹ {totalEarning}</h1>
   <p className='text-sm text-gray-600'>{userData?.description || "Start Creating Courses Now"}</p>
   <h1 className='px-[10px] text-center py-[10px] border-2 border-black bg-black text-white rounded-[10px] text-[15px] font-light flex items-center justify-center mt-2 cursor-pointer  hover:bg-white hover:text-black' onClick={()=> navigate("/courses")}>Create Course</h1>
       </div>
        </div>

        {/* Graph section */}
        <div className='max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8'>


{/* Course progress charts */}
<div className='bg-white rounded-lg shadow-md p-6'>
<h2 className='text-lg font-semibold mb-4'>Course Progress (Lectures)</h2>

<ResponsiveContainer width="100%" height={300} >
 
 <BarChart data={courseProgressData} >
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="name" />
  <YAxis />
  <Tooltip />
  <Bar dataKey="lectures" fill="black" radius={[5, 5, 0, 0]} barSize={70} />
 </BarChart>
</ResponsiveContainer>
</div>

{/* Enrolled Data */}

<div className='bg-white rounded-lg shadow-md p-6'>
<h2 className='text-lg font-semibold mb-4'>Student Enrollment</h2>

<ResponsiveContainer width="100%" height={300} >
 
 <BarChart data={EnrollData} >
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="name" />
  <YAxis />
  <Tooltip />
  <Bar dataKey="enrolledStudents" fill="black" radius={[5, 5, 0, 0]} barSize={50} />
 </BarChart>
</ResponsiveContainer>
</div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard