import React, { use, useState } from 'react'
import google from '../assets/google.jpg'
import {IoEyeOutline, IoEye} from 'react-icons/io5'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { serverUrl } from '../App';
import toast from 'react-hot-toast';
import {ClipLoader} from 'react-spinners'
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../utils/firebase';

const Signup = () => {

  const [show,setShow] = useState(false);
  const navigate = useNavigate()
  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [role,setRole] = useState("student")
  const [loading,setLoading] = useState(false)
  const dispatch = useDispatch()



  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
   try {
    const res = await axios.post(
  serverUrl + "/api/auth/signUp",
  { name, email, password, role },
  { withCredentials: true }
);

toast.success("User created successfully");
setLoading(false);
navigate("/login");

dispatch(setUserData(res.data))
   } catch (error) {
    toast.error(error.message)
    setLoading(false);
   }
  }

  const googleSignup = async () => {
    try {
      const res = await signInWithPopup(auth,provider)
      
      const user = res.user;

      const name = user.displayName;
      const email = user.email;

      const res2 = await axios.post(serverUrl + "/api/auth/googleauth", {name,email,role},{withCredentials: true});
      toast.success("User created successfully");
      navigate("/");
      dispatch(setUserData(res2.data))
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  return (
    <div className='bg-[#dddbdb] w-[100vw] h-[100vh] flex items-center justify-center gap-3 '>
       <form className='w-[90%] md:w-200 h-150 bg-white shadow-xl rounded-2xl flex '>
       {/* Left div  */}
      <div className='md:w-[50%] w-[100%] h-[100%] flex flex-col items-center justify-center gap-3 '>
        <div>
          <h1 className='font-semibold text-black text-2xl'>Let's get started</h1>
          <h2 className='text-[#999797] text-[18px]'>Create an account</h2>
        </div>
        <div className='flex flex-col gap-1 w-[80%] items-start justify-center px-3'>
    <label htmlFor='name' className='font-semibold'>Name</label>
    <input onChange={(e) => setName(e.target.value)} value={name} type="text" id='name' placeholder='Your name' className='border-1 w-[100%] h-[35px] border-[#e7e6e6] text-[15px] px-[20px] '/>
        </div>

          <div className='flex flex-col gap-1 w-[80%] items-start justify-center px-3'>
    <label htmlFor='email' className='font-semibold'>Email</label>
    <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" id='email' placeholder='Your Email' className='border-1 w-[100%] h-[35px] border-[#e7e6e6] text-[15px] px-[20px] '/>
        </div>


         <div className='flex flex-col gap-1 w-[80%] items-start justify-center px-3 relative'>
    <label htmlFor='password' className='font-semibold'>Password</label>
    <input onChange={(e) => setPassword(e.target.value)} value={password} type={show ? "text" : "password"} id='password' placeholder='Your Password' className='border-1 w-[100%] h-[35px] border-[#e7e6e6] text-[15px] px-[20px] '/>
    {show ? (
    <IoEyeOutline onClick={() => setShow(!show)} className='absolute w-[20px] h-[20px] cursor-pointer right-[5%] bottom-[10%]'/>
    ) : (<IoEye onClick={() => setShow(!show)} className='absolute w-[20px] h-[20px] cursor-pointer right-[5%] bottom-[10%] '/>)}
        </div>

        <div className='flex md:w-[50%] w-[70%] items-center justify-between '>
       <span className={`${role === "student" && "border-black "} px-[10px] py-[5px] border-[2px] border-[#e7e6e6] rounded-xl hover:border-black cursor-pointer `} onClick={() => setRole("student") }>student</span>
       <span className={`px-[10px] py-[5px] border-[2px] border-[#e7e6e6] rounded-xl hover:border-black cursor-pointer ${role === "educator" && "border-black "}`} onClick={() => setRole("educator")}>educator</span>
        </div>

        <button onClick={handleSignup} className='w-[80%] h-[40px] bg-black text-white cursor-pointer flex items-center justify-center  rounded-[5px]' disabled={loading}>{loading ? <ClipLoader color='white' size={30} /> : "Sign Up"}</button>
        <div className='w-[80%] flex items-center gap-2'>
        <div className='w-[25%] h-[0.5px] bg-[#c4c4c4] '></div>
        <div className='w-[50%] text-[15px] text-[#6f6f6f] flex items-center justify-center '>Or continue</div>
        <div className='w-[25%] h-[0.5px] bg-[#c4c4c4]'></div>
        </div>
   <div className='w-[80%] h-[40px] border-1 border-black rounded-[5px] flex items-center justify-center cursor-pointer' onClick={googleSignup}>
 <img src={google} alt="" className='w-[25px]' />
 <span className='text-[18px] text-gray-500'>oogle</span>
   </div>
   <div className='text-[#6f6f6f]'>
 Already have an account ? <span className='underline underline-offset-1 text-black cursor-pointer' onClick={() => navigate('/login')}>Login</span>
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

export default Signup