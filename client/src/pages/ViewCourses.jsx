import React, { useEffect, useState } from 'react'
import { FaArrowLeftLong, FaLock, FaStar } from 'react-icons/fa6'
import { useNavigate, useParams } from 'react-router-dom';
import img from '../assets/empty.jpg'
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedCourse } from '../redux/courseSlice';
import { FaPlayCircle } from 'react-icons/fa';
import axios from 'axios';
import { serverUrl } from '../App';
import Card from '../components/Card';
import toast from 'react-hot-toast';

const ViewCourses = () => {

  const navigate = useNavigate();
  const {courseData} = useSelector((state) => state.course);
  const {courseId} = useParams();
  
  const {selectedCourse} = useSelector((state) => state.course);
  const dispatch = useDispatch();
  const [selectedLecture, setSelectedLecture] = useState(null);
  const [creatorData, setCreatorData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [creatorCourses, setCreatorCourses] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const {userData} = useSelector((state) => state.user);

  const fetchCourseData = async () => {
    courseData?.map(course => {
      if (course._id === courseId) {
        dispatch(setSelectedCourse(course));
        console.log("Selected course data:", course);

        return null;
      }
    })
  }


  useEffect(()=>{
  if (creatorData?._id) {
    const creatorCourse = courseData?.filter(course => course.creator === creatorData._id && course._id !== courseId);
    setCreatorCourses(creatorCourse);
  }
}, [creatorData, courseData, courseId]);


  useEffect(()=>{
    const handleCreator = async () => {
      if(selectedCourse?.creator){
      try {
        const result = await axios.post(serverUrl + "/api/course/creator",{userId: selectedCourse?.creator},{withCredentials: true});
        console.log("creator data:",result.data)
        setCreatorData(result.data) 
      } catch (error) {
        console.log(error)
      }
    }
    }
    handleCreator();
  },[selectedCourse])


  const handleEnroll = async (courseId, userId) => {
  try {
    const orderData = await axios.post(
      serverUrl + "/api/order/razorpay-order",
      { courseId, userId },
      { withCredentials: true }
    );

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: orderData.data.order.amount,
      currency: "INR",
      name: "VIRTUAL COURSES",
      description: "COURSE ENROLLMENT PAYMENT",
      order_id: orderData.data.order.id,
      handler: async function (response) {
        console.log("Razorpay response", response);
        try {
          const verifyPayment = await axios.post(
            serverUrl + "/api/order/verify-payment",{
              ...response,
              courseId,
            userId},{withCredentials: true}
          )
          setIsEnrolled(true);
          toast.success(verifyPayment.data.message);
          
        } catch (error) {
          console.log(error)
          toast.error(error.message)
        }
      }
      
    }

    const razorpay = new window.Razorpay(options);
    razorpay.open();

    console.log("order data", orderData);

  } catch (error) {
    console.log(error);
    toast.error("Something went wrong while enrolling the course");
  }
};


const checkEnrollment = () => {
    const verify = userData?.enrolledCourses?.some(c => 
    (typeof c === 'string' ? c : c._id).toString() === courseId?.toString()
    );
    if(verify){
       setIsEnrolled(true);
    }

  }

    useEffect(()=>{
    fetchCourseData();
    checkEnrollment();
  },[courseData,courseId,userData]);


  return (
    <div className='min-h-screen bg-gray-50 p-6'>
   <div className='max-w-6xl mx-auto bg-white shadow-md rounded-xl p-6 space-y-6 relative'>
  
  {/* Top section */}

  <div className='flex flex-col md:flex-row gap-6'>

{/* Thumbnail */}
<div className='w-full md:w-1/2'>
<FaArrowLeftLong className='w-[22px] h-[22px] cursor-pointer  text-black' onClick={()=> navigate('/')} />
   {selectedCourse?.thumbnail ? <img src={selectedCourse?.thumbnail} alt="" className='rounded-xl w-full object-cover ' /> : <img src={img} alt="" className='rounded-xl w-full object-cover ' />}
</div>

{/* course info  */}

<div className='flex-1 space-y-2 mt-[20px]'>
   <h2 className='text-2xl font-bold'>{selectedCourse?.title || ""}</h2>
   <p className='text-gray-600'>{selectedCourse?.subTitle || ""}</p>

   <div className='flex items-start flex-col justify-between'>

   <div className='text-yellow-500 font-medium flex gap-2'>
     <span className='flex items-center justify-star gap-1'>5<FaStar className='text-yellow-500' /></span>
     <span className='text-gray-400'>(1,200 Reviews)</span>
   </div>

   <div>
       <span className="text-xl font-semibold text-black">₹ {selectedCourse?.price || "NA"}</span>
       <span className='line-through text-sm text-gray-400'>{selectedCourse?.price ? `₹ ${selectedCourse.price + 300}` : "NA"}</span>
   </div>

   <ul className='text-sm text-gray-700 space-y-1 pt-2'>
     <li>✅ 10+ hours of video content</li>
     <li>✅ Lifetime access to course materials</li>
   </ul>

  {!isEnrolled ? <button className='bg-black text-white px-6 py-2 rounded hover:bg-white hover:text-black border-2 border-black cursor-pointer lg:mt-5 mt-3' onClick={()=>handleEnroll(courseId,userData._id)}>Enroll Now</button> : <button className='bg-green-100 text-green-600 px-6 py-2 rounded hover:bg-gray-300 hover:text-black border-2 border-black cursor-pointer lg:mt-5 mt-3' disabled>Watch now</button> }

   </div>
</div>
  </div>

  <div>
    <h2 className='text-xl font-semibold mb-2'>What You'll Learn</h2>
    <ul className='list-disc pl-6 text-gray-700 space-y-1'>
      <li>Learn {selectedCourse?.category ==="Others" ? selectedCourse?.title : selectedCourse?.category} from Beginning</li>
    </ul>
  </div>

  <div>
    <h2 className='text-xl font-semibold mb-2'>Who this course for</h2>
    <p className='text-gray-700'>Beginning , aspiring developers and Professionals looking to upgrade their skills</p>
  </div>

  <div className='flex flex-col md:flex-row gap-6'>
     {/* left side */}
      <div className='bg-white w-full md:w-2/5 p-6 rounded-2xl shadow-lg border border-gray-200'>
    <h2 className='text-xl font-bold mb-1 text-gray-800'>Course Syllabus</h2>
    <p className='text-sm text-gray-500 mb-4'>
      {selectedCourse?.lectures?.length} Lectures
    </p>

    <div className='flex flex-col gap-3'>
   {selectedCourse?.lectures?.map((lecture,index) =>  (
   <button disabled={!lecture.isPreviewFree} onClick={()=>{if(lecture.isPreviewFree){setSelectedLecture(lecture)}}} key={index} className={ `flex items-center gap-3 px-4 py-3 rounded-lg border transition-all duration-200 text-left cursor-pointer ${lecture.isPreviewFree ? "border-gray-300 cursor-pointer hover:bg-gray-100" : "cursor-not-allowed opacity-60 border-gray-200"} ${selectedLecture?.lectureTitle === lecture.lectureTitle ? "bg-gray-100 border-gray-400" : ""}`}>
    <span className='text-lg text-gray-700'>
      {lecture.isPreviewFree ? <FaPlayCircle /> : <FaLock />}
    </span>
    <span className='font-semibold text-gray-800'>{lecture.lectureTitle}</span>
   </button>
  ))}
    </div>
      </div>


     {/* right side / video side */}
     <div className='bg-white w-full md:w-3/5 p-6 rounded-2xl shadow-lg border border-gray-200'>
      

      <div className='aspect-video w-full rounded-lg overflow-hidden mb-4 bg-black flex items-center justify-center'>
          {selectedLecture?.videoUrl ? <video src={selectedLecture?.videoUrl} controls className='w-full h-full object-cover border-1 border-black' /> : <span className='text-white text-small  '>Select a preview lecture to watch</span>}
      </div>
     </div>
  </div>

  {/* for reviews */}
   <div className='mt-8 border-t pt-6'>
  <h2 className='text-xl font-semibold mb-2'>
    Write a Reviews
  </h2>

  <div className='mb-4'>
  <div className='flex gap-1 mb-2'>
    {
      [1,2,3,4,5].map((star) => (
        <FaStar key={star} className='fill-amber-300 cursor-pointer' onClick={() => setSelectedRating(star)} />
      ))
    }
  </div>

  <textarea name="" id="" className='w-full border border-gray-300 rounded-lg p-2 ' placeholder='Write a review here...' rows={3} ></textarea>
  <button className='bg-black text-white mt-3 px-4 py-2 rounded hover:bg-gray-800'>Submit Review</button>
  </div>
   </div>

{/* for creator info */}
   <div className='flex items-center gap-4 pt-4 border-t'>
  {creatorData?.photoUrl ? <img src={creatorData?.photoUrl} alt="" className='w-16 h-16 rounded-full border-1 object-cover border-black ' /> : <img src={img} alt="" className='w-16 h-16 rounded-full border-1 object-cover border-black ' />
  }

<div>
  <h2 className='text-lg font-semibold'>{creatorData?.name}</h2>
  <p className='md:text text-gray-600 text-[12px]'>{creatorData?.description}</p>
  <p className='md:text text-gray-600 text-[12px]'>{creatorData?.email}</p>
</div>
   </div>


   <div>
    <p className='text-xl font-semibold mb-2'>Other Published Courses by the Educator</p>
   </div>

   <div className='w-full transition-all duration-300 py-[20px] flex items-start justify-center lg:justify-start flex-wrap gap-6 lg:px-[80px]'>

   {
    creatorCourses?.map((course,index)=>(
      <Card key={index} thumbnail={course.thumbnail} title={course.title} category={course.category} price={course.price} id={course._id}  />
    ))
   }

   </div>
   </div>
    </div>
  )
}

export default ViewCourses