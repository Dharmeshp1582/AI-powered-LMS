import React, {  useEffect, useState } from 'react'
import { FaArrowLeftLong } from 'react-icons/fa6'
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setLectureData } from '../../redux/lectureSlice';
import axios from 'axios';
import { serverUrl } from '../../App';
import toast from 'react-hot-toast';
import { ClipLoader } from 'react-spinners';
import { FaEdit } from 'react-icons/fa';

const CreateLecture = () => {

   const {courseId} = useParams();
  const navigate = useNavigate();
  const [lectureTitle, setLectureTitle] = useState('');
  const [loading,setLoading] = useState(false)

  const dispatch = useDispatch();
  const {lectureData} = useSelector((state) => state.lecture);

  const handleCreateLecture = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(serverUrl + `/api/course/createlecture/${courseId}`,{lectureTitle},{withCredentials: true})
      console.log(res.data);
      dispatch(setLectureData([...lectureData,res.data.lecture]))
      setLoading(false);
      toast.success(res.data.message);
      setLectureTitle('');
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
      setLoading(false);
    }
  }

  useEffect(() => {
     const getCourseLectures = async () => {
       try {
        const res = await axios.get(serverUrl + `/api/course/courselecture/${courseId}`,{withCredentials: true})
        dispatch(setLectureData(res.data.lectures))
        console.log(res.data)
       } catch (error) {
        console.log(error)
       }
     }
     getCourseLectures();
  },[courseId, dispatch])

  return (
    <div className='min-h-screen bg-gray-100 flex items-center justify-center p-4'>

    <div className='bg-white shadow-xl rounded-xl w-full max-w-2xl p-6'>

  {/* Header */}
     <div className='mb-6'>
       <h1 className='text-2xl font-semibold text-gray-800 mb-1'>
       Let's Add Course Lecture
       </h1>
       <p className='text-sm text-gray-500'>Enter the title and add your video lectures to enhance your course content</p>
     </div>

     {/* Input area */}
   <input onChange={(e) => setLectureTitle(e.target.value)} value={lectureTitle} type="text" className='w-full border border-gray-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-black mb-4' placeholder='eg. Introduction to mern stack' />
  {/* button  */}

  <div className='flex gap-4 mb-6'>
    <button className='flex items-center gap-2 px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 text-sm font-medium' onClick={() => navigate(`/editcourse/${courseId}`)}>
      <FaArrowLeftLong />Back to Course
    </button>
    <button className='px-5 py-2 rounded-md bg-black text-white hover:bg-white hover:text-black border-2 border-black transition-all text-sm font-medium shadow cursor-pointer' disabled={loading} onClick={handleCreateLecture}> {loading ? <ClipLoader color='white' size={20} /> : "+ Create Lecture"}</button>
  </div>
    
    {/* lecture list  */}

    <div className='space-y-2'>

   {lectureData?.map((lecture,index) => (
  <div key={index} className='bg-gray-100 rounded-md flex justify-between items-center p-3 text-sm font-medium text-gray-700'>
    <span>Lecture - {index + 1}: {lecture.lectureTitle}</span>
    <FaEdit className='text-gray-500 hover:text-gray-700 cursor-pointer' onClick={() => navigate(`/editlecture/${courseId}/${lecture._id}`)} />
  </div>
))}


    </div>
    </div>

    </div>
  )
}

export default CreateLecture