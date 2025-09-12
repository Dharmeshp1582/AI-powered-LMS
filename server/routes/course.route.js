import express from 'express'
import { createCourse, createLecture, editCourse, editLecture, getCourseById, getCourseLecture, getCreatorById, getCreatorCourses, getPublishedCourses, removeCourse, removeLecture } from '../controllers/course.controller.js'
import isAuth from '../middlewares/isAuth.middleware.js';
import { upload } from '../middlewares/multer.js';
const courseRouter = express.Router()


//for courses
courseRouter.post('/create',isAuth,createCourse);
courseRouter.get('/getpublished',getPublishedCourses);
courseRouter.get('/getcreator',isAuth,getCreatorCourses);
courseRouter.post('/editcourse/:courseId',isAuth,upload.single('thumbnail'),editCourse);
courseRouter.get('/getcoursebyid/:courseId',isAuth, getCourseById);
courseRouter.delete('/removecourse/:courseId',isAuth,removeCourse);


//for lectures
courseRouter.post('/createlecture/:courseId',isAuth,createLecture);
courseRouter.get('/courselecture/:courseId',isAuth,getCourseLecture);
courseRouter.post('/editlecture/:lectureId',isAuth,upload.single('videoUrl'),editLecture);
courseRouter.delete('/removelecture/:lectureId',isAuth,removeLecture);
courseRouter.post('/creator',isAuth,getCreatorById)

export default courseRouter