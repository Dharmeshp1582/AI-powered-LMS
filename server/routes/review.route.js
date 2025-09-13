import express from 'express'
import isAuth from '../middlewares/isAuth.middleware.js'
import { createReview, getReviews } from '../controllers/review.controller.js'

const reviewRouter = express.Router()

reviewRouter.post('/createreview',isAuth,createReview)
reviewRouter.get('/getreview',getReviews)



export default reviewRouter