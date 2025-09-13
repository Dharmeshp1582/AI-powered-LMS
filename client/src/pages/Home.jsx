import React from 'react'
import Nav from '../components/Nav'
import home from '../assets/home1.jpg'
import {SiViaplay} from 'react-icons/si'
import ai from '../assets/ai.png'
import ai1 from '../assets/searchAi.png'
import Logos from '../components/Logos'
import ExploreCourses from '../components/ExploreCourses'
import ScrollEffect from '../components/ScrollEffect'
import CardPage from '../components/CardPage'
import { useNavigate } from 'react-router-dom'
import About from '../components/About'
import Footer from '../components/Footer'
import ReviewPage from '../components/ReviewPage'

const Home = () => {
 
  const navigate = useNavigate()

  return (
    <div className='w-[100%] overflow-hidden'>
    <div className='w-[100%] lg:h-[140vh] h-[70vh] relative'>
      <Nav />
      <img src={home} alt="" className='object-cover md:object-fill w-[100%] lg:h-[100%] h-[50vh]' />

      <span className='lg:text-[70px] absolute md:text-[40px] lg:top-[10%] top-[15%] w-[100%] flex items-center justify-center text-white font-bold text-[20px]'>Grow Your skills to advance</span>
      <span className='lg:text-[70px] absolute md:text-[40px] lg:top-[18%] top-[20%] w-[100%] flex items-center justify-center text-white font-bold text-[20px]'>Your career path</span>

      <div className='absolute lg:top-[30%] top-[75%] md:top-[80%] w-[100%] flex items-center justify-center gap-3 flex-wrap '>
    <button className='px-[20px] py-[10px] border-2 lg:border-white border-black lg:text-white text-black text-[18px] rounded-[10px] font-light flex gap-2 cursor-pointer' onClick={()=> navigate("/allcourses")}>View all courses <SiViaplay className='w-[30px] h-[30px] lg:fill-white fill-black ' /></button>
    <button className='px-[20px] py-[10px]  lg:bg-white bg-black lg:text-black text-white text-[18px] rounded-[10px] font-light flex gap-2 cursor-pointer items-center '>Search with AI <img src={ai} alt="" className='w-[30px] h-[30px] rounded-full hidden lg:block ' /> <img src={ai1} alt="" className='w-[35px] h-[35px] rounded-full lg:hidden block ' /> </button>
      </div>
    </div>
    <Logos />
    <ExploreCourses />
    <CardPage />
    <ScrollEffect />
    <About />
    <ReviewPage />
    <Footer />
    </div>
  )
}

export default Home