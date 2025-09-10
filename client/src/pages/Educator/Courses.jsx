import React from 'react'
import { FaArrowLeftLong } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom';
import img from '../../assets/empty.jpg'
import {FaEdit} from 'react-icons/fa6'

const Courses = () => {

  const navigate = useNavigate();

  return (
    <div className='flex min-h-screen bg-gray-100'>
  <div className='w-[100%] min-h-screen p-4 sm:p-6 bg-gray-100 '>
      <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3'>
      <div className='flex items-center justify-center gap-3'>

      <FaArrowLeftLong className='w-[22px] h-[22px] cursor-pointer text-black' onClick={()=> navigate('/dashboard')} />
      <h1>All Created Courses</h1>
      </div>

      <button className='bg-black text-white px-4 py-2 rounded hover:bg-white hover:text-black border-2 border-black cursor-pointer' onClick={()=> navigate('/createcourse')}>Create Course</button>
      </div>

       {/* Table For large screen */}
       <div className='hidden md:block bg-white rounded-xl shadow p-4 overflow-x-auto'>
     <table className='min-w-full text-sm'>
      <thead className='border-b bg-gray-50'>
        <tr>
          <th className='text-left py-3 px-4'>COURSES</th>
          <th className='text-left py-3 px-4'>PRICE</th>
          <th className='text-left py-3 px-4'>STATUS</th>
          <th className='text-left py-3 px-4'>ACTION</th>
        </tr>
      </thead>

      <tbody>
        <tr className='border-b hover:bg-gray-50 transition duration-200'>
          <td className='py-3 px-4 flex items-center gap-4'><img src={img} alt="" className='w-25 h-14 object-cover rounded-md ' /><span>Title</span> </td>
          <td className='py-3 px-4'>₹ NA</td>
          <td className='py-3 px-4'><span className='px-3 py-1 rounded-full text-xs bg-red-100 text-red-600'>Draft</span></td>
          <td className='py-3 px-4'>
             {/* <label className="relative inline-flex items-center cursor-pointer text-gray-900 gap-3">
                    <input onChange={()=> toggleAvailability(item._id)}
                      type="checkbox"
                      className="sr-only peer"
                      checked={Course.isAvailable}
                    />
                    <div className="w-12 h-7 bg-slate-300 rounded-full peer peer-checked:bg-blue-600 transition-colors duration-200"></div>
                    <span className="dot absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform duration-200 peer-checked:translate-x-5 ease-in-out"></span>
                  </label> */}
                  <FaEdit className='w-[20px] h-[20px] cursor-pointer text-black' />
          </td>
        </tr>
      </tbody>
     </table>
       </div>

        {/* For small screen Table */}
      <div className=''>
      </div>
      </div>
    </div>
  )
}

export default Courses