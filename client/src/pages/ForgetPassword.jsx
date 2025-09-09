import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { serverUrl } from '../App'
import toast from 'react-hot-toast'
import { ClipLoader } from 'react-spinners'

const ForgetPassword = () => {

  const [step,setStep] = useState(1)
  const [email,setEmail] = useState("")
  const [otp,setOtp] = useState("")
  const [newPassword,setNewPassword] = useState("")
  const [confirmPassword,setConfirmPassword] = useState("")
  const [loading,setLoading] = useState(false)

  const navigate = useNavigate()

  // for step 1 
  const sendOtp = async () => {
   setLoading(true)
   try {
     const res = await axios.post(serverUrl + "/api/auth/sendotp", {email},{withCredentials: true});
     console.log(res.data);
     setStep(2);
     toast.success(res.data.message);
     setLoading(false);
   } catch (error) {
    toast.error(error.message)
    setLoading(false);
    console.log("send otp error",error);
   }
  }

  //step 2
  const verifyOtp = async () => {
    setLoading(true)
    try {
      const res = await axios.post(serverUrl  + "/api/auth/verifyotp", {email,otp},{withCredentials: true});
      console.log(res.data);
      toast.success(res.data.message);
      setStep(3);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(error.message)
      console.log("verify otp error",error);
    }
  }

  //step 3
  const resetPassword = async () => {
    setLoading(true)
    try {
      if(newPassword !== confirmPassword){
        return toast.error("Password doesn't match");
        setLoading(false);
      }
      const res = await axios.post(serverUrl + "/api/auth/resetpassword", {email,password:newPassword},{withCredentials: true});
      console.log(res.data);
      toast.success(res.data.message);
      setLoading(false);
      navigate("/login")
    } catch (error) {
      setLoading(false);
      toast.error(error.message)
      console.log("reset password error",error);
    }
  }


  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100 px-4'>
    {/* step 1 */}
    
    {step === 1 && <div className='bg-white shadow-md rounded-xl p-8 max-w-md w-full'>
      <h2 className='text-2xl font-bold mb-6 text-center text-gray-800'>
      Forget your Password 
      </h2>
      <form onSubmit={(e) => e.preventDefault()} className='space-y-4'>
      <div>
        <label htmlFor='email' className='block text-sm font-medium text-gray-700'>Enter Your Email:</label>
        <input onChange={(e) => setEmail(e.target.value)} value={email} id='email' type="text" className='mt-1  w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[black] ' placeholder='your@example.com' required/>
      </div>
      <button onClick={sendOtp} className='w-full bg-[black] text-white py-2 rounded-md hover:bg-[#4b4b4b] font-medium cursor-pointer' disabled={loading}>{loading ? <ClipLoader color='white' size={30} /> : 'Send OTP'}</button>
      </form>
      <div onClick={() => navigate("/login")} className='text-sm text-center mt-4 cursor-pointer hover:text-blue-500'>Back to Login</div>
    </div>}

    {/* step 2 */}
    
    {step === 2 && <div className='bg-white shadow-md rounded-xl p-8 max-w-md w-full'>
      <h2 className='text-2xl font-bold mb-6 text-center text-gray-800'>
      Enter OTP 
      </h2>
      <form onSubmit={(e) => e.preventDefault()} className='space-y-4'>
      <div>
        <label htmlFor='otp' className='block text-sm font-medium text-gray-700'>Please Enter the 4 digit code sent to your email</label>
        <input onChange={(e) => setOtp(e.target.value)} value={otp} id='otp' type="text" className='mt-1  w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[black] ' placeholder='* * * *' required/>
      </div>
      <button className='w-full bg-[black] text-white py-2 rounded-md hover:bg-[#4b4b4b] font-medium cursor-pointer' disabled={loading} onClick={verifyOtp}>{loading ? <ClipLoader color='white' size={30} /> : "Verify OTP"}</button>
      </form>
      <div onClick={() => navigate("/login")} className='text-sm text-center mt-4 cursor-pointer hover:text-blue-500'>Back to Login</div>
    </div>}

    {/* step 3 */}
    
    {step === 3 && <div className='bg-white shadow-md rounded-xl p-8 max-w-md w-full'>
      <h2 className='text-2xl font-bold mb-6 text-center text-gray-800'>
      Reset Your Password
      </h2>
      <p className='text-sm text-center text-gray-500 mb-6'>Enter a new password to regain access to your account. </p>
      <form onSubmit={(e) => e.preventDefault()} className='space-y-4'>
      <div>
        <label htmlFor='password' className='block text-sm font-medium text-gray-700'>New Password</label>
        <input onChange={(e) => setNewPassword(e.target.value)} value={newPassword} id='password' type="text" className='mt-1  w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[black] ' placeholder='********' required/>
      </div>
      <div>
        <label htmlFor='password' className='block text-sm font-medium text-gray-700'>Confirm Password</label>
        <input onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} id='password' type="text" className='mt-1  w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[black] ' placeholder='********' required/>
      </div>
      <button onClick={resetPassword} disabled={loading} className='w-full bg-[black] text-white py-2 rounded-md hover:bg-[#4b4b4b] font-medium cursor-pointer'>{loading ? <ClipLoader color='white' size={30} /> : 'Reset Password'}</button>
      </form>
      <div onClick={() => navigate("/login")} className='text-sm text-center mt-4 cursor-pointer hover:text-blue-500'>Back to Login</div>
    </div>}
    </div>
  )
}

export default ForgetPassword