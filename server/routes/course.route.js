import express from 'express'
import { createCourse, editCourse, getCourseById, getCreatorCourses, getPublishedCourses, removeCourse } from '../controllers/course.controller.js'
import isAuth from '../middlewares/isAuth.middleware.js';
import { upload } from '../middlewares/multer.js';
const courseRouter = express.Router()

courseRouter.post('/create',isAuth,createCourse);
courseRouter.get('/getpublished',getPublishedCourses);
courseRouter.get('/getcreator',isAuth,getCreatorCourses);
courseRouter.post('/editcourse/:courseId',isAuth,upload.single('thumbnail'),editCourse);
courseRouter.get('/getcoursebyid/:courseId',isAuth, getCourseById);
courseRouter.delete('/removecourse/:courseId',isAuth,removeCourse);

export default courseRouter