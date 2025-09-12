import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import {Toaster} from 'react-hot-toast'
import getCurrentUser from './customHooks/getCurrentUser'
import { useSelector } from 'react-redux'
import Profile from './pages/Profile'
import ForgetPassword from './pages/ForgetPassword'
import EditProfile from './pages/EditProfile'
import Courses from './pages/Educator/Courses'
import Dashboard from './pages/Educator/Dashboard'
import CreateCourses from './pages/Educator/CreateCourses'
import getCreatorCourse from './customHooks/getCreatorCourse'
import EditCourse from './pages/Educator/EditCourse'
import getPublishedCourse from './customHooks/getPublishedCourse'
import AllCourses from './pages/AllCourses'
import CreateLecture from './pages/Educator/CreateLecture'
import EditLecture from './pages/Educator/EditLecture'
import ViewCourses from './pages/ViewCourses'
import ScrollToTop from './components/ScrollToTop'

export const serverUrl = "http://localhost:8000"
const App = () => {
    getCurrentUser();
    getCreatorCourse();
    getPublishedCourse();
    const {userData} = useSelector((state) => state.user);

  return (
   <>
   <Toaster/>
   <ScrollToTop />
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/signup' element={!userData ? <Signup/> : <Navigate to="/"/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/profile' element={userData ? <Profile/> : <Navigate to="/signup"/>} />
      <Route path='/forget' element={!userData ? <ForgetPassword/> : <Navigate to="/signup"/>} />
      <Route path='/editprofile' element={userData ? <EditProfile/> : <Navigate to="/signup"/>} />
      <Route path='/dashboard' element={userData?.role === "educator" ? <Dashboard/> : <Navigate to="/signup"/>} />
      <Route path='/courses' element={userData?.role === "educator" ? <Courses/> : <Navigate to="/signup"/>} />
      <Route path='/createcourse' element={userData?.role === "educator" ? <CreateCourses/> : <Navigate to="/signup"/>} />
      <Route path='/editcourse/:courseId' element={userData?.role === "educator" ? <EditCourse/> : <Navigate to="/signup"/>} />
      <Route path='/allcourses' element={userData ? <AllCourses/> : <Navigate to="/signup"/>} />
      <Route path='/createlecture/:courseId' element={userData?.role === "educator" ? <CreateLecture/> : <Navigate to="/signup"/>} />

      <Route path='/editlecture/:courseId/:lectureId' element={userData?.role === "educator" ? <EditLecture/> : <Navigate to="/signup"/>} />
      <Route path='/viewcourse/:courseId' element={userData?.role === "educator" ? <ViewCourses/> : <Navigate to="/signup"/>} />
    </Routes>
   </>
  )
}

export default App