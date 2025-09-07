import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import validator from "validator";
import generateToken from "../configs/token.js";


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
    res.status(500).json({
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