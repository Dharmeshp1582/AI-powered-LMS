import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import validator from "validator";
import generateToken from "../configs/token.js";
import sendMail from "../configs/sendMail.js";


export const signUp = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      role
    } = req.body;

    if(!name || !email || !password || !role){
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      })
    }

    const existingUser = await User.findOne({email});
    if(existingUser){
      return res.status(400).json({
        success: false,
        message: "User already exists"
      })
    }
    if(!validator.isEmail(email)){
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email"
      })
    }

    if(password.length < 8){
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters long"
      })
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password:hashedPassword,
      role
    })

    const token = await generateToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
      maxAge: 3 * 24 * 60 * 60 * 1000
    })
    
    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user
    })

  } catch (error) {
   return res.status(500).json({
      success: false,
      message: `Signup error:${error}`
    })
  }
}


export const Login = async (req, res) => {
  try {
    const {email,password} = req.body;

    const user = await User.findOne({email}).select("+password");
    if(!user){
      return res.status(404).json({
        success: false,
        message: "User does not exist"
      })
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
      return res.status(400).json({
        success: false,
        message: "Invalid credentials"
      })
    }

    const token = await generateToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict",
      maxAge: 3 * 24 * 60 * 60 * 1000
    })

    return res.status(200).json({
      success: true,
      message: `Welcome back ${user.name}`,
      user
    })
    
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Login error:${error}`
    })
  }
}

export const logOut = async (req, res) => {
  try {
    await res.clearCookie("token", null);
    return res.status(200).json({
      success: true,
      message: "User logged out successfully"
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Logout error ${error}`
    })
  }
}

export const sendOTP = async (req, res) => {
  try {
    const {email} = req.body;
    const user = await User.findOne({email});
    if(!user){
      return res.status(404).json({
        success: false,
        message: "User does not exist"
      })
    }

    const otp = Math.floor(1000 + Math.random() * 9000).toString(); // Generate a random 4-digit OTP

    user.resetOtp = otp;//push to database
   user.otpExpires = Date.now() + 5 * 60 * 1000; // Set the OTP expiration time to 5 minutes from now
   user.isOtpVerified = false; //default false
   
   await user.save();

   await sendMail(email, otp);

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully"
    })


  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Send OTP error ${error}`
    })
  }
}


export const verifyOTP = async (req,res) => {
  try {
    const {email,otp} = req.body;
    const user = await User.findOne({email});

    if(!user || user.resetOtp !== otp || user.otpExpires < Date.now()) {
      return res.status(404).json({
        success: false,
        message: "Invalid OTP"
      })
    }

    user.isOtpVerified = true; 
     user.resetOtp = undefined;
   user.otpExpires = undefined; 
    
   await user.save();

    return res.status(200).json({
      success: true,
      message: "OTP verified successfully"
    })

  }catch(error){
    return res.status(500).json({
      success: false,
      message: `Verify OTP error ${error}`
    })
  }}    

export const resetPassword = async (req,res) => {
  try {
    const {email,password} = req.body;
    const user = await User.findOne({email});

    if(!user || !user.isOtpVerified){
      return res.status(404).json({
        success: false,
        message: "OTP verification is required"
      })
    }
   
    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    user.isOtpVerified = false;
    
    await user.save();
    return res.status(200).json({
      success: true,
      message: "Password reset successfully"
    })

  }catch(error){
    return res.status(500).json({
      success: false,
      message: `Reset Password error ${error}`
    })
  }
}


export const googleAuth = async (req,res) => {
  try {
    const {email,name,role} = req.body;

    const user = await User.findOne({email});
    if(!user){
      const user = await User.create({name,email,role});
    }
      const token = await generateToken(user._id);

      res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "Strict",
        maxAge: 3 * 24 * 60 * 60 * 1000
      })

      return res.status(200).json({
        success: true,
        user
      })
    
  } catch (error) {
    
    return res.status(500).json({
      success: false,
      message: `Google Auth error ${error}`
    })
  }
}