import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeftLong } from 'react-icons/fa6';

const Profile = () => {


  const {userData} = useSelector((state) => state.user);
  const navigate = useNavigate();

  return (
    <div className='min-h-screen bg-gray-100 px-4 py-10 flex items-center justify-center'>
      <div className='bg-white shadow-lg rounded-2xl p-8 max-w-xl w-full relative'>
      <FaArrowLeftLong className='w-[22px] h-[22px] absolute top-[8%] left-[5%] cursor-pointer text-black' onClick={()=> navigate('/')}/>
       <div className='flex flex-col text-center items-center justify-center'>
     {userData?.photoUrl ? <img src={userData?.photoUrl} alt="" className='w-20 h-20 rounded-full object-cover border-2 border-black ' /> : <div className='w-20 h-20 rounded-full text-white flex items-center justify-center object-cover border-2 text-[34px] bg-black border-white '>
        {userData?.name.slice(0,1).toUpperCase() }
     </div> }

     <h2 className='text-2xl font-bold mt-4 text-gray-800'>{userData?.name}</h2>
     <p className='text-sm text-gray-500'>{userData?.role.toUpperCase()}</p>
       </div>

       <div className='mt-6 space-y-4 px-8'>
         <div className='text-sm flex items-center justify-start gap-1'>
          <span className='font-semibold text-gray-700'>Email:</span> <span className=''>{userData?.email}</span>
         </div>

          <div className='text-sm flex items-center justify-start gap-1'>
          <span className='font-semibold text-gray-700'>Bio:</span> <span className=''>{userData?.description}</span>
         </div>

          <div className='text-sm flex items-center justify-start gap-1'>
          <span className='font-semibold text-gray-700'>Enrolled Courses:</span> <span className=''>{userData?.enrolledCourses.length}</span>
         </div>
       </div>
       <div className='mt-6 flex justify-center gap-4'>
        <button className='px-4 py-2 bg-black text-white rounded-lg active:bg-[#4b4b4b] cursor-pointer transition' onClick={()=> navigate('/editprofile')}>Edit Profile</button>
       </div>
      </div>
    </div>
  )
}

export default Profile