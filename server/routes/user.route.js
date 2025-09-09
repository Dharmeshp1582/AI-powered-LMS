import express from 'express'
import isAuth from '../middlewares/isAuth.middleware.js'
import { getCurrentUser } from '../controllers/user.controller.js'

const userRouter = express.Router()

userRouter.get('/getcurrentuser',isAuth,getCurrentUser)

export default userRouter;