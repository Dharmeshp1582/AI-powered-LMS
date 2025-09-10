import express from 'express'
import isAuth from '../middlewares/isAuth.middleware.js'
import { getCurrentUser, updateProfile } from '../controllers/user.controller.js'
import { upload } from '../middlewares/multer.js'

const userRouter = express.Router()

userRouter.get('/getcurrentuser',isAuth,getCurrentUser)

userRouter.post('/profile',isAuth,upload.single('photoUrl'),updateProfile);

export default userRouter;