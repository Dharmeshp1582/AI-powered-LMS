import axios from 'axios';
import React, { useState } from 'react'
import { FaArrowLeftLong } from 'react-icons/fa6'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { serverUrl } from '../App';
import { setUserData } from '../redux/userSlice';
import toast from 'react-hot-toast';
import { ClipLoader } from 'react-spinners';

const EditProfile = () => {

  const navigate = useNavigate();
  const {userData} = useSelector((state) => state.user);
  const [name,setName] = useState( userData?.name || "")
  const [email,setEmail] = useState(userData?.email || "")
  const [description,setDescription] = useState(userData?.description || "")
  const [photoUrl,setPhotoUrl] = useState(null);
  const [loading,setLoading] = useState(false);
  const dispatch = useDispatch();

  const formData = new FormData();
  formData.append("name",name);
  formData.append("description",description);
  formData.append("photoUrl",photoUrl);

  const handleEditProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(serverUrl + "/api/user/profile",formData,{withCredentials: true});
      console.log("Data after edit profile: ",res.data);
      toast.success(res.data.message);
      setLoading(false);
      dispatch(setUserData(res.data))
      navigate("/")
    } catch (error) {
      toast.error(error.message)
      setLoading(false);
    }
  }

  return (
    <div className='min-h-screen bg-gray-100 px-4 py-10 flex items-center justify-center'>
      <div className='bg-white rounded-2xl shadow-lg p-8 max-w-xl w-full relative'>
 <FaArrowLeftLong className='w-[22px] h-[22px] absolute top-[8%] left-[5%] cursor-pointer text-black' onClick={()=> navigate('/profile')}/>
    <h2 className='text-2xl font-bold mb-6 text-center text-gray-800'>Edit Profile</h2>
 <form className='space-y-5'>

  <div className='flex flex-col items-center text-center'>
    {userData?.photoUrl ? <img src={userData?.photoUrl} alt="" className='w-20 h-20 rounded-full object-cover border-2 border-black ' /> : <div className='w-20 h-20 rounded-full text-white flex items-center justify-center object-cover border-2 text-[34px] bg-black border-white '>
        {userData?.name.slice(0,1).toUpperCase() }
     </div> } </div>

  <div>
    <label htmlFor='image'  className='text-sm font-semibold text-gray-700'>Select Image</label>
    <input id='image' type="file" name='photoUrl' placeholder='Select Image' accept='image/*' className='w-full px-4 py-2 mt-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-600 cursor-pointer' onChange={(e) => setPhotoUrl(e.target.files[0]) } />
  </div>

   <div>
    <label htmlFor='name'  className='text-sm font-semibold text-gray-700'>UserName</label>
    <input type='text' name='name' placeholder={userData?.name} className='w-full px-4 py-2 mt-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-600 cursor-pointer' onChange={(e) => setName(e.target.value)} value={name} />
  </div>

   <div>
    <label   className='text-sm font-semibold text-gray-700'>Email</label>
    <input id='text' placeholder={userData?.email} className='w-full px-4 py-2 mt-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-600 cursor-pointer' readOnly />
  </div>

<div>
    <label   className='text-sm font-semibold text-gray-700'>Description</label>
    <textarea id='text' placeholder='Tell About Yourself' rows={3} name='description' className='w-full px-4 py-2 mt-1 border border-gray-600 rounded-md resize-none focus:ring-2 focus:ring-[black] ' onChange={(e) => setDescription(e.target.value)} value={description}  />
  </div>
     <button onClick={handleEditProfile} className='w-full bg-black active:bg-[#454545] text-white py-2 rounded-md font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-600 cursor-pointer duration-300 '>{loading ? <ClipLoader color="white" size={30} /> : "Update Changes"}</button>
 </form>
      </div>
    </div>
  )
}

export default EditProfile