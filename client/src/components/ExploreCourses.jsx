import React from 'react'
import { FaHackerrank, FaUikit } from 'react-icons/fa6'
import { MdAppShortcut } from 'react-icons/md'
import { SiGoogledataproc, SiOpenaigym, SiViaplay } from 'react-icons/si'
import {TbDeviceDesktopAnalytics} from 'react-icons/tb'
import {AiFillOpenAI} from 'react-icons/ai'
import {BsClipboardData} from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'

const ExploreCourses = () => {

  const navigate = useNavigate()
  return (
    <div className='w-[100vw] min-h-[50vh] lg:h-[50vh] flex flex-col lg:flex-row items-center justify-center gap-4 px-[30px] '>

{/* left side */}
    <div className='w-[100%] lg:w-[350px] lg:h-[100%] h-[400px] flex flex-col items-start justify-center gap-1 md:px-[40px] px-[20px] '>

    <span className='text-[35px] font-semibold'>Explore Courses</span>
    <span className='text-[35px] font-semibold'>Our Courses</span>
    <p className='text-[17px] '>Choose your career path & explore our wide range of specialized courses that helps you grow.</p>
    <button className='px-[20px] py-[10px] border-2 border-black bg-black text-white text-[18px] rounded-[10px] font-light flex gap-2 cursor-pointer mt-[40px]' onClick={()=> navigate("/allcourses")}>Explore Courses <SiViaplay className='w-[30px] h-[30px] fill-white  ' /></button>
    </div>

    {/* right side */}
    <div className='w-[720px] max-w-[90%] lg:h-[300px] md:min-h-[300px] flex items-center justify-center lg:gap-[60px] gap-[50px] flex-wrap mb-[50px] lg:mb-[0px]  '>
    
    <div className='w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center'>
      <div className='w-[100px] h-[90px] bg-[#e6a2e6] rounded-lg flex items-center justify-center'>
        <TbDeviceDesktopAnalytics className='w-[60px] h-[60px]' />
      </div>
      Web Development
    </div>


    <div className='w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center'>
      <div className='w-[100px] h-[90px] bg-[#90c286] rounded-lg flex items-center justify-center'>
        <FaUikit className='w-[60px] h-[60px]' />
      </div>
     UI/UX Designing
    </div>


    <div className='w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center'>
      <div className='w-[100px] h-[90px] bg-[#7596c8] rounded-lg flex items-center justify-center'>
        <MdAppShortcut className='w-[60px] h-[60px]' />
      </div>
      App Development
    </div>

    <div className='w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center'>
      <div className='w-[100px] h-[90px] bg-[#8d8a8d] rounded-lg flex items-center justify-center'>
        <FaHackerrank className='w-[60px] h-[60px]' />
      </div>
     Ethical Hacking
    </div>

    <div className='w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center'>
      <div className='w-[100px] h-[90px] bg-[#b7686a] rounded-lg flex items-center justify-center'>
        <AiFillOpenAI className='w-[60px] h-[60px]' />
      </div>
      AI/ML 
    </div>

    <div className='w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center'>
      <div className='w-[100px] h-[90px] bg-[#f6f5f6] rounded-lg flex items-center justify-center'>
        <SiGoogledataproc className='w-[60px] h-[60px]' />
      </div>
      Data Science
    </div>

    <div className='w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center'>
      <div className='w-[100px] h-[90px] bg-[#4e70dd] rounded-lg flex items-center justify-center'>
        <BsClipboardData className='w-[55px] h-[55px]' />
      </div>
      Data Analytics
    </div>

    <div className='w-[100px] h-[130px] font-light text-[13px] flex flex-col gap-3 text-center'>
      <div className='w-[100px] h-[90px] bg-[#2b282b] rounded-lg flex items-center fill-white text-white justify-center'>
        <SiOpenaigym className='w-[55px] h-[55px]' />
      </div>
      AI Tools
    </div>
    </div>

    </div>
  )
}

export default ExploreCourses