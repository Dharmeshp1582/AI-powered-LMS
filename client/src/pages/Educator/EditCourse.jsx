import React, { useEffect, useRef, useState } from 'react'
import { FaArrowLeftLong } from 'react-icons/fa6'
import { useNavigate, useParams } from 'react-router-dom'
import img from "../../assets/empty.jpg"
import { FaEdit } from 'react-icons/fa'
import axios from 'axios'
import { serverUrl } from '../../App'
import toast from 'react-hot-toast'
import { ClipLoader } from 'react-spinners'
import { useDispatch, useSelector } from 'react-redux'
import { setCourseData } from '../../redux/courseSlice'

const EditCourse = () => {
  const navigate = useNavigate()
  const { courseId } = useParams()
  const thumbRef = useRef(null)

  const [isPublished, setIsPublished] = useState(false)
  const [selectCourse, setSelectCourse] = useState(null)

  const [loading, setLoading] = useState(false) // for fetching
  const [saving, setSaving] = useState(false)   // for editing
  const [removing, setRemoving] = useState(false) // for deleting

  const [title, setTitle] = useState('')
  const [subTitle, setSubTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [level, setLevel] = useState('')
  const [frontendImage, setFrontendImage] = useState(img)
  const [backendImage, setBackendImage] = useState(null)
  const [price, setPrice] = useState('')

  const dispatch = useDispatch()
  const { courseData } = useSelector((state) => state.course)

  // Handle file upload
  const handleThumbnail = (e) => {
    const file = e.target.files[0]
    if (file) {
      setBackendImage(file)
      setFrontendImage(URL.createObjectURL(file))
    }
  }

  // Fetch course by ID
  const getCourseById = async () => {
    setLoading(true)
    try {
      const res = await axios.get(
        `${serverUrl}/api/course/getcoursebyid/${courseId}`,
        { withCredentials: true }
      )
      setSelectCourse(res.data.course || res.data)
    } catch (error) {
      console.log(error)
      toast.error("Failed to load course")
    } finally {
      setLoading(false)
    }
  }

  // Update form state when course is loaded
  useEffect(() => {
    if (selectCourse) {
      setTitle(selectCourse.title || '')
      setSubTitle(selectCourse.subTitle || '')
      setDescription(selectCourse.description || '')
      setCategory(selectCourse.category || '')
      setLevel(selectCourse.level || '')
      setPrice(selectCourse.price || '')
      setFrontendImage(selectCourse.thumbnail || img)
      setIsPublished(selectCourse?.isPublished || false)
    }
  }, [selectCourse])

  // Load course on mount
  useEffect(() => {
    getCourseById()
  }, [])

  const handleEditCourse = async () => {
    setSaving(true)
    const formData = new FormData()
    formData.append('title', title)
    formData.append('subTitle', subTitle)
    formData.append('description', description)
    formData.append('category', category)
    formData.append('level', level)
    if (backendImage) formData.append('thumbnail', backendImage) // only if new image selected
    formData.append('price', price)
    formData.append('isPublished', isPublished)

    try {
      const res = await axios.post(
        `${serverUrl}/api/course/editcourse/${courseId}`,
        formData,
        { withCredentials: true }
      )
      const updateData = res.data.course

      if (Array.isArray(courseData)) {
        let updatedCourses
        if (updateData.isPublished) {
          updatedCourses = courseData.some(c => c._id === courseId)
            ? courseData.map(c => (c._id === courseId ? updateData : c))
            : [...courseData, updateData]
        } else {
          updatedCourses = courseData.filter(c => c._id !== courseId)
        }
        dispatch(setCourseData(updatedCourses))
      } else {
        dispatch(setCourseData([updateData]))
      }

      toast.success(res.data.message)
      navigate('/courses')
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message || error.message)
    } finally {
      setSaving(false)
    }
  }

  const handleRemoveCourse = async () => {
    setRemoving(true)
    try {
      const res = await axios.delete(
        `${serverUrl}/api/course/removecourse/${courseId}`,
        { withCredentials: true }
      )

      if (Array.isArray(courseData)) {
        const filteredCourses = courseData.filter((course) => course._id !== courseId)
        dispatch(setCourseData(filteredCourses))
      }

      toast.success(res.data.message)
      navigate('/courses')
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message || error.message)
    } finally {
      setRemoving(false)
    }
  }

  return (
    <div className='max-w-5xl mx-auto p-6 mt-10 bg-white rounded-lg shadow-md'>
      {/* Top Bar */}
      <div className='flex items-center justify-center gap-[20px] md:justify-between flex-col md:flex-row mb-6 relative'>
        <FaArrowLeftLong
          className='w-[22px] h-[22px] absolute top-[-20%] md:top-[20%] left-[0] cursor-pointer md:left-[2%] text-black'
          onClick={() => navigate('/courses')}
        />
        <h2 className='text-2xl font-semibold md:pl-[60px]'>
          Add Detailed Information About Your Course
        </h2>
        <div className='space-x-2 space-y-2'>
          <button className='bg-black text-white px-4 py-2 border-2 border-black rounded-md cursor-pointer hover:bg-white hover:text-black' onClick={() => navigate(`/createlecture/${courseId}`) }>
            Go to Lecture Page
          </button>
        </div>
      </div>

      {/* Form */}
      <div className='bg-gray-50 p-6 rounded-md'>
        <h2 className='text-lg font-medium mb-4'>Basic Course Details</h2>

        {/* Publish / Remove */}
        <div className='space-x-2 space-y-2 mb-4'>
          {!isPublished ? (
            <button
              className='bg-green-100 text-green-600 px-4 py-2 border-2 border-green-600 rounded-md cursor-pointer hover:bg-green-600 hover:text-white'
              onClick={() => setIsPublished(true)}
            >
              Click to Publish
            </button>
          ) : (
            <button
              className='bg-red-100 text-red-600 px-4 py-2 border-2 border-red-600 rounded-md cursor-pointer hover:bg-red-600 hover:text-white'
              onClick={() => setIsPublished(false)}
            >
              Click to UnPublish
            </button>
          )}
          <button
            className='bg-red-100 text-red-600 px-4 py-2 border-2 border-red-600 rounded-md cursor-pointer hover:bg-red-600 hover:text-white'
            onClick={handleRemoveCourse}
            disabled={removing}
          >
            {removing ? <ClipLoader size={20} color='red' /> : "Remove Course"}
          </button>
        </div>

        <form onSubmit={(e) => e.preventDefault()} className='space-y-6'>
          {/* Title */}
          <div>
            <label htmlFor='title' className='block mb-1 text-sm font-medium text-gray-700'>
              Title
            </label>
            <input
              type='text'
              id='title'
              placeholder='Course Title'
              className='w-full border px-4 py-2 rounded-md'
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </div>

          {/* Subtitle */}
          <div>
            <label htmlFor='subTitle' className='block mb-1 text-sm font-medium text-gray-700'>
              Subtitle
            </label>
            <input
              type='text'
              id='subTitle'
              placeholder='Course Subtitle'
              className='w-full border px-4 py-2 rounded-md'
              onChange={(e) => setSubTitle(e.target.value)}
              value={subTitle}
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor='description' className='block mb-1 text-sm font-medium text-gray-700'>
              Description
            </label>
            <textarea
              id='description'
              placeholder='Enter Your Course Description'
              className='w-full border px-4 py-2 rounded-md resize-none h-32'
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
          </div>

          {/* Category / Level / Price */}
          <div className='flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0'>
            {/* Category */}
            <div className='flex-1'>
              <label htmlFor='category' className='block text-sm font-medium text-gray-700 mb-1'>
                Course Category
              </label>
              <select
                id='category'
                onChange={(e) => setCategory(e.target.value)}
                value={category}
                className='w-full px-4 py-2 border rounded-md bg-white'
              >
                <option value=''>Select Category</option>
                <option value='App Development'>App Development</option>
                <option value='AI/ML'>AI/ML</option>
                <option value='AI Tools'>AI Tools</option>
                <option value='Data Science'>Data Science</option>
                <option value='Data Analytics'>Data Analytics</option>
                <option value='Ethical Hacking'>Ethical Hacking</option>
                <option value='UI UX Designing'>UI UX Designing</option>
                <option value='Web Development'>Web Development</option>
                <option value='Others'>Others</option>
              </select>
            </div>

            {/* Level */}
            <div className='flex-1'>
              <label htmlFor='level' className='block text-sm font-medium text-gray-700 mb-1'>
                Course Level
              </label>
              <select
                id='level'
                onChange={(e) => setLevel(e.target.value)}
                value={level}
                className='w-full px-4 py-2 border rounded-md bg-white'
              >
                <option value=''>Select Level</option>
                <option value='Beginner'>Beginner</option>
                <option value='Intermediate'>Intermediate</option>
                <option value='Advanced'>Advanced</option>
              </select>
            </div>

            {/* Price */}
            <div className='flex-1'>
              <label htmlFor='price' className='block text-sm font-medium text-gray-700 mb-1'>
                Course Price
              </label>
              <input
                id='price'
                type='number'
                placeholder='₹'
                className='w-full px-4 py-2 border rounded-md'
                onChange={(e) => setPrice(e.target.value)}
                value={price}
              />
            </div>
          </div>

          {/* Thumbnail */}
          <div>
            <label htmlFor='thumbnail' className='block mb-1 text-sm font-medium text-gray-700'>
              Course Thumbnail
            </label>
            <input
              type='file'
              hidden
              ref={thumbRef}
              accept='image/*'
              onChange={handleThumbnail}
            />
          </div>

          <div className='relative w-[300px] h-[170px]'>
            <img
              src={frontendImage}
              alt='Course Thumbnail'
              className='w-full h-full border border-black rounded-[5px] object-cover cursor-pointer'
              onClick={() => thumbRef.current.click()}
            />
            <FaEdit
              className='w-[22px] h-[22px] absolute top-[8%] right-[5%] cursor-pointer text-black'
              onClick={() => thumbRef.current.click()}
            />
          </div>

          {/* Action Buttons */}
          <div className='flex items-center justify-start gap-[15px]'>
            <button
              type='button'
              className='bg-[#e9e8e8] hover:bg-red-200 text-black border border-black cursor-pointer px-7 py-2 rounded-md'
              onClick={() => navigate('/courses')}
            >
              Cancel
            </button>
            <button
              type='submit'
              className='bg-black text-white border border-black cursor-pointer px-7 py-2 rounded-md hover:bg-white hover:text-black'
              onClick={handleEditCourse}
              disabled={saving}
            >
              {saving ? <ClipLoader size={30} color='white' /> : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditCourse
