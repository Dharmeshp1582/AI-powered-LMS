import React, { useState } from 'react'
import google from '../assets/google.jpg'
import { IoEye, IoEyeOutline } from 'react-icons/io5';
import {useNavigate} from 'react-router-dom'

const Login = () => {
  const [show,setShow] = useState(false);
  const navigate = useNavigate() 
  
    return (
      <div className='bg-[#dddbdb] w-[100vw] h-[100vh] flex items-center justify-center gap-3 '>
         <form className='w-[90%] md:w-200 h-150 bg-white shadow-xl rounded-2xl flex '>
         {/* Left div  */}
        <div className='md:w-[50%] w-[100%] h-[100%] flex flex-col items-center justify-center gap-3 '>
          <div>
            <h1 className='font-semibold text-black text-2xl'>Welcome Back</h1>
            <h2 className='text-[#999797] text-[18px]'>Login In to your account</h2>
          </div>
  
            <div className='flex flex-col gap-1 w-[80%] items-start justify-center px-3'>
      <label htmlFor='email' className='font-semibold'>Email</label>
      <input type="email" id='email' placeholder='Your Email' className='border-1 w-[100%] h-[35px] border-[#e7e6e6] text-[15px] px-[20px] '/>
          </div>
  
  
           <div className='flex flex-col gap-1 w-[80%] items-start justify-center px-3 relative'>
      <label htmlFor='password' className='font-semibold'>Password</label>
      <input type={show ? "text" : "password"} id='password' placeholder='Your Password' className='border-1 w-[100%] h-[35px] border-[#e7e6e6] text-[15px] px-[20px] '/>
      {show ? (
      <IoEyeOutline onClick={() => setShow(!show)} className='absolute w-[20px] h-[20px] cursor-pointer right-[5%] bottom-[10%]'/>
      ) : (<IoEye onClick={() => setShow(!show)} className='absolute w-[20px] h-[20px] cursor-pointer right-[5%] bottom-[10%] '/>)}
          </div>

          <button className='w-[80%] h-[40px] bg-black text-white cursor-pointer flex items-center justify-center  rounded-[5px]'>Login</button>

          <span className='text-[13px] cursor-pointer text-[#585757]'>Forget your password ?</span>
          <div className='w-[80%] flex items-center gap-2'>
          <div className='w-[25%] h-[0.5px] bg-[#c4c4c4] '></div>
          <div className='w-[50%] text-[15px] text-[#6f6f6f] flex items-center justify-center '>Or continue</div>
          <div className='w-[25%] h-[0.5px] bg-[#c4c4c4]'></div>
          </div>
     <div className='w-[80%] h-[40px] border-1 border-black rounded-[5px] flex items-center justify-center'>
   <img src={google} alt="" className='w-[25px]' />
   <span className='text-[18px] text-gray-500'>oogle</span>
     </div>
     <div className='text-[#6f6f6f]'>
 Does not have an account ? <span className='underline underline-offset-1 text-black cursor-pointer' onClick={() => navigate('/signup')}>Signup</span>
   </div>
        </div>
  
        {/* Right div */}
        <div className=' w-[50%] h-[100%] rounded-r-2xl bg-black md:flex items-center justify-center flex-col hidden'>
           <img className="h-full" src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/leftSideImage.png" alt="leftSideImage" />
           {/* <span className='text-white text-2xl'>Dharmesh Patel</span> */}
        </div>
         </form>
      </div>
    )
}

export default Login