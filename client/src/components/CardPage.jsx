import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Card from './Card'

const CardPage = () => {
  const { courseData } = useSelector((state) => state.course)
  console.log("courseData in CardPage:", courseData)

  const [popularCourses, setPopularCourses] = useState([])

  useEffect(() => {
    if (Array.isArray(courseData)) {
      setPopularCourses(courseData.slice(0, 6))
    } else {
      setPopularCourses([])
    }
  }, [courseData])

  return (
    <div className='relative flex items-center justify-center flex-col'>
      <h1 className='md:text-[30px] font-semibold text-center mt-[30px] px-[20px]'>
        Our Popular Courses
      </h1>
      <span className='lg:w-[50%] md:w-[80%] text-[15px] text-center mt-[30px] mb-[30px] px-[20px]'>
        Explore top-rated Courses designed to boost your skills, enhance careers,
        and unlock opportunities in tech, AI, business and beyond.
      </span>

      <div className='w-[100%] min-h-[50vh] flex items-center justify-center flex-wrap gap-[50px] lg:p-[50px] md:p-[30px] p-[10px] mb-[20px]'>
        {popularCourses.length > 0 ? (
          popularCourses.map((course) => (
            <Card
              key={course._id}
              thumbnail={course.thumbnail}
              title={course.title}
              category={course.category}
              price={course.price}
              id={course._id} reviews={course.reviews}
            />
          ))
        ) : (
          <p className='text-gray-500'>No courses available</p>
        )}
      </div>
    </div>
  )
}

export default CardPage
