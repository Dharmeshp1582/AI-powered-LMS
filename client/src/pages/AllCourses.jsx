import React, { useEffect, useState } from 'react'
import Nav from '../components/Nav'
import { FaArrowLeftLong } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'
import ai from "../assets/searchAi.png"
import { useSelector } from 'react-redux'
import Card from '../components/Card'

const AllCourses = () => {

  const navigate = useNavigate()
  const {courseData} = useSelector((state) => state.course);

  const [category,setCategory] = useState([]);
  const [filterCourses,setFilterCourses] = useState([]);

  const toggleCategory = (e) => {
    if(category.includes(e.target.value)){
      setCategory(prev => prev.filter((item) => item !== e.target.value));
    }else{
      setCategory(prev => [...prev,e.target.value]);
    }
  }


  const applyFilter = () => {
  let courseCopy = courseData?.slice();
  if(category.length > 0){
    const filteredCourses = courseCopy.filter((course) => category.includes(course.category));
    setFilterCourses(filteredCourses);
  } else {
    // No category selected -> show all courses
    setFilterCourses(courseCopy);
  }
}



  useEffect(()=> {
   setFilterCourses(courseData);
  },[courseData])

  useEffect(()=> {
   applyFilter()
  },[category])

  return (
    <div className='flex min-h-screen bg-gray-50'>
    <Nav />

    {/* Sidebar */}
    <aside className='w-[260px] h-screen  bg-[#0f0e0e]  fixed top-0 left-0 p-6 py-[130px] border-r border-gray-200 shadow-md transition-transform duration-300 z-5 hidden md:block'>
      <h2 className='text-xl font-bold flex items-center justify-center gap-2 text-gray-50 mb-6' >
      <FaArrowLeftLong className='text-white cursor-pointer' onClick={()=> navigate('/')} /> Filtered by category</h2>

      <form onSubmit={(e)=>e.preventDefault()} className='space-y-4 text-sm bg-gray-600  border-white text-white border p-[20px] rounded-2xl'>

        <button className='px-[10px] py-[10px] bg-black text-white text-[15px] rounded-[10px] font-light flex gap-2  items-center justify-center cursor-pointer'>Search with AI <img src={ai} alt="" className='w-[30px] h-[30px] rounded-full  lg:block ' /> </button>

        <label htmlFor='' className='flex items-center gap-3 cursor-pointer hover:text-gray-200 transition'>
          <input onChange={toggleCategory } value={"AI/ML"} type="checkbox" className='accent-black w-4 h-4 rounded-md' />AI/ML
        </label>


        
        <label htmlFor='' className='flex items-center gap-3 cursor-pointer hover:text-gray-200 transition'>
          <input onChange={toggleCategory } value={"AI Tools"} type="checkbox" className='accent-black w-4 h-4 rounded-md' />AI Tools
        </label>



        
        <label htmlFor='' className='flex items-center gap-3 cursor-pointer hover:text-gray-200 transition'>
          <input onChange={toggleCategory } value={"Data Science"} type="checkbox" className='accent-black w-4 h-4 rounded-md' />Data Science
        </label>



        
        <label htmlFor='' className='flex items-center gap-3 cursor-pointer hover:text-gray-200 transition'>
          <input onChange={toggleCategory } value={"Data Analytics"} type="checkbox" className='accent-black w-4 h-4 rounded-md' />Data Analytics
        </label>


        
        <label htmlFor='' className='flex items-center gap-3 cursor-pointer hover:text-gray-200 transition'>
          <input onChange={toggleCategory } value={"Ethical Hacking"} type="checkbox" className='accent-black w-4 h-4 rounded-md' />Ethical Hacking
        </label>


        <label htmlFor='' className='flex items-center gap-3 cursor-pointer hover:text-gray-200 transition'>
          <input onChange={toggleCategory } value={"UI/UX Designing"} type="checkbox" className='accent-black w-4 h-4 rounded-md' />UI/UX Designing
        </label>

        
        <label htmlFor='' className='flex items-center gap-3 cursor-pointer hover:text-gray-200 transition'>
          <input onChange={toggleCategory } value={"App Development"} type="checkbox" className='accent-black w-4 h-4 rounded-md' />App Development
        </label>

         <label htmlFor='' className='flex items-center gap-3 cursor-pointer hover:text-gray-200 transition'>
          <input onChange={toggleCategory } value={"Web Development"} type="checkbox" className='accent-black w-4 h-4 rounded-md' />Web Development
        </label>


        
        <label htmlFor='' className='flex items-center gap-3 cursor-pointer hover:text-gray-200 transition'>
          <input onChange={toggleCategory } value={"Others"} type="checkbox" className='accent-black w-4 h-4 rounded-md' />Others
        </label>
      </form>
    </aside>

    <main className='w-full transition-all duration-300 py-[130px] md:pl-[300px] flex items-start justify-center md:justify-start flex-wrap gap-6 px-[10px] '>
  {
    filterCourses?.map((course,item) => (
      <Card key={item} thumbnail={course.thumbnail} title={course.title} category={course.category} price={course.price} id={course._id} />
    ))
  }
    </main>

    </div>
  )
}

export default AllCourses