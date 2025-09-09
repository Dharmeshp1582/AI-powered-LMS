import express from 'express'
import { googleAuth, Login, logOut, resetPassword, sendOTP, signUp, verifyOTP } from '../controllers/auth.controller.js'

const authRouter = express.Router()

authRouter.post('/signup',signUp)
authRouter.post('/login',Login)
authRouter.get('/logout',logOut)
authRouter.post('/sendotp',sendOTP)
authRouter.post('/verifyotp',verifyOTP)
authRouter.post('/resetpassword',resetPassword)
authRouter.post('/googleauth',googleAuth)

export default authRouter;