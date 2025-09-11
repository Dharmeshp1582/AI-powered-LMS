import React, { useState } from 'react'
import { FaArrowLeftLong } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { serverUrl } from "../../App";
import toast from 'react-hot-toast';
import { ClipLoader } from 'react-spinners';  

const CreateCourses = () => {

  const navigate = useNavigate();
  const [title,setTitle] = useState('');
  const [category,setCategory] = useState('');
  const [loading,setLoading] = useState(false);

  const handleCreateCourse = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(serverUrl + "/api/course/create",{title,category},{withCredentials: true})
      console.log(res.data);
      toast.success(res.data.message);
      setLoading(false);
      navigate("/courses")
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10 '>
    <div className='max-w-xl w-[600px] mx-auto p-6 bg-white shadow-md rounded-md mt-10 relative '>
     <FaArrowLeftLong className='w-[22px] h-[22px] absolute top-[8%] left-[5%] cursor-pointer text-black' onClick={()=> navigate('/courses')}/>
     <h2 className='text-2xl font-semibold text-center mb-6'>Create Course</h2>

     <form className='space-y-5'>

      <div>
        <label htmlFor='title' className='block text-sm font-medium text-gray-700 mb-1'>Course Title</label>
        <input onChange={(e) => setTitle(e.target.value)} value={title} type="text" id='title' placeholder='Enter course title' className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[black]'  required/>
      </div>

      <div>
         <label htmlFor='category' className='block text-sm font-medium text-gray-700 mb-1'>Course Category</label>
         <select onChange={(e) => setCategory(e.target.value)} name="category" id="category" className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[black]'>
      <option value="">Select Category</option>
      <option value="App Development">App Development</option>
      <option value="AI/ML">AI/ML</option><option value="AI Tools">AI Tools</option>
      <option value="Data Science">Data Science</option>
      <option value="Data Analytics">Data Analytics</option>
      <option value="Ethical Hacking">Ethical Hacking</option>
      <option value="UI UX Designing">UI UX Designing</option>
      <option value="Web Development">Web Development</option>
      <option value="Others">Others</option>
         </select>
      </div>
      <button className='w-full bg-black text-white py-2 px-4 rounded-md active:bg-[#3a3a3a] transition cursor-pointer' disabled={loading}  onClick={handleCreateCourse}>{loading ? <ClipLoader color='white' size={30} /> :'Create'}</button>
     </form>
    </div>
    </div>
  )
}

export default CreateCourses