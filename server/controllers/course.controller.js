import uploadOnCloudinary from "../configs/cloudinary.js";
import Course from "../models/course.model.js";


export const createCourse = async (req, res) => {
  try {
    const {title, category } = req.body;

    if(!title || !category){
      return res.status(400).json({
        success: false,
        message: "Title and category is required"
      })
    }

    const course = await Course.create(
      {
        title,
        description, 
        creator: req.userId
      }
    );

    return res.status(201).json({
      success: true,
      course
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Create course error ${error}`
    })
  }
}

export const getPublishedCourses = async (req, res) => {
  try {
    const courses = await Course.find({ isPublished:true})

    if(!courses){
      return res.status(404).json({
        success: false,
        message: "No course found"
      })
    }
    return res.status(200).json({
      success: true,
      courses
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Get published courses error ${error}`
    })
  }
}

export const getCreatorCourses = async (req, res) => {
try {
  const userId = req.userId;
  const courses = await Course.find({creator: userId});

  if(!courses){
    return res.status(404).json({
      success: false,
      message: "No course found"
    })
  }
  return res.status(200).json({
    success: true,
    courses
  })
} catch (error) {
  return res.status(500).json({
    success: false,
    message: `Get creator courses error ${error}`
  })
}
}

export const editCourse = async (req, res) => {
  try {
    const {courseId} = req.params;

    const {title,subTitle , description, category, level,isPublished , price} = req.body;

    let thumbnail 
    if(req.file){
      thumbnail = await uploadOnCloudinary(req.file.path);
    }

    let course = await Course.findById(courseId);

    if(!course){
      return res.status(404).json({
        success: false,
        message: "Courses does not exist"
      })
    }

    const updateData = {
      title,
      subTitle,
      description,
      category,
      level,
      isPublished,
      price,
      thumbnail
    }

    course = await Course.findByIdAndUpdate(courseId, updateData, {new: true});

    return res.status(200).json({
      success: true,
      course
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Failed to Edit course ${error}`
    })
  }
}

export const getCourseById = async(req, res) => {
  try {
    const {courseId} = req.params;
    const course = await Course.findById(courseId);
    if(!course){
      return res.status(404).json({
        success: false,
        message: "Course does not exist"
      })
    }
    return res.status(200).json({
      success: true,
      course
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Get course by id error ${error}`
    })
  }
}

export const removeCourse = async(req, res) => {
  try {
    const {courseId} = req.params;
    const course = await Course.findById(courseId);

    if(!course){
      return res.status(404).json({
        success: false,
        message: "Course does not exist"
      })
    }

    course = await Course.findByIdAndDelete(courseId, {new: true});

    return res.status(200).json({
      success: true,
      message: "Course deleted successfully"
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Removing course error ${error}`
    })
  }
}