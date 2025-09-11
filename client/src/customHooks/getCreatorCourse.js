import axios from 'axios'
import React, { useEffect } from 'react'
import { serverUrl } from '../App'
import { useDispatch, useSelector } from 'react-redux'
import { setCreatorCourseData } from '../redux/courseSlice'

const getCreatorCourse = () => {

  const dispatch = useDispatch();
  const {userData} = useSelector((state) => state.user);

  return (
    useEffect(() => {
      const creatorCourses = async () => {
        try {
          const res = await axios.get(serverUrl + "/api/course/getcreator", {
            withCredentials: true
          })
          console.log(res.data)
        dispatch(setCreatorCourseData(res.data.courses))

        } catch (error) {
          console.log(error)
        }
      }
      creatorCourses();
    },[userData])
  )
}

export default getCreatorCourse