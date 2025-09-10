import React from 'react'
import {MdCastForEducation, MdSupport} from 'react-icons/md'
import { SiOpenaccess } from 'react-icons/si'
import { FaSackDollar, FaUsers } from 'react-icons/fa6'
import {BiSupport} from 'react-icons/bi'

const Logos = () => {
  return (
    <div className='w-[100vw] min-h-[90px] flex items-center justify-center flex-wrap gap-4 md:mb-[50px] '>
        <div className='flex items-center justify-center gap-2  px-5 py-3 rounded-3xl bg-gray-200 cursor-pointer'>
        <MdCastForEducation className='w-[25px] h-[25px] fill-black text-[#' />
        20K+ online Courses
        </div>

        <div className='flex items-center justify-center gap-2  px-5 py-3 rounded-3xl bg-gray-200 cursor-pointer'>
        <SiOpenaccess className='w-[25px] h-[25px] fill-black text-[#03394b]' />
        Lifetime Access
        </div>

        <div className='flex items-center justify-center gap-2  px-5 py-3 rounded-3xl bg-gray-200 cursor-pointer'>
        <FaSackDollar className='w-[25px] h-[25px] fill-black text-[#03394b]' />
        Value for Money
        </div>

        <div className='flex items-center justify-center gap-2  px-5 py-3 rounded-3xl bg-gray-200 cursor-pointer'>
        <BiSupport className='w-[25px] h-[25px] fill-black text-[#03394b]' />
        Lifetime support
        </div>

        <div className='flex items-center justify-center gap-2  px-5 py-3 rounded-3xl bg-gray-200 cursor-pointer'>
        <FaUsers className='w-[25px] h-[25px] fill-black text-[#03394b]' />
        Community support
        </div>
    </div>
  )
}

export default Logos