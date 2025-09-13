import uploadOnCloudinary from "../configs/cloudinary.js";
import User from "../models/user.model.js";


export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password").populate("enrolledCourses");

    if(!user){
      return res.status(404).json({
        success: false,
        message: "User does not exist"
      })
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `getCurrentUser error ${error}`
    })
  }
}

export const updateProfile = async (req, res) => {
  try {
    const userId = req.userId; //getting userId from isAuth middleware
    const {description, name} = req.body;
    let photoUrl;
    if(req.file){
      photoUrl = await uploadOnCloudinary(req.file.path);
    }

    const user = await User.findByIdAndUpdate(userId,{description, name,  photoUrl});
    if(!user){
      return res.status(404).json({
        success: false,
        message: "User does not exist"
      })
    }
    user.description = description;
    user.name = name;
    if(photoUrl){
      user.photoUrl = photoUrl;
    }
    await user.save();
    return res.status(200).json({
      success: true,
      message: "Profile updated successfully"
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      message: `updateProfile error ${error}`
    })
  }
}