import uploadOnCloudinary from "../configs/cloudinary.js";
import Course from "../models/course.model.js";
import Lecture from "../models/lecture.model.js";
import User from "../models/user.model.js";

// ---------------------- COURSE CONTROLLERS ----------------------

export const createCourse = async (req, res) => {
  try {
    const { title, category } = req.body;

    if (!title || !category) {
      return res.status(400).json({
        success: false,
        message: "Title and category are required",
      });
    }

    const course = await Course.create({
      title,
      category,
      creator: req.userId,
    });

    return res.status(201).json({
      success: true,
      message: "Course created successfully",
      course,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Create course error: ${error.message}`,
    });
  }
};

export const getPublishedCourses = async (req, res) => {
  try {
    const courses = await Course.find({ isPublished: true }).populate('lectures');

    if (!courses.length) {
      return res.status(404).json({
        success: false,
        message: "No published courses found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Courses fetched successfully",
      courses
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Get published courses error: ${error.message}`,
    });
  }
};

export const getCreatorCourses = async (req, res) => {
  try {
    const userId = req.userId;
    const courses = await Course.find({ creator: userId });

    if (!courses.length) {
      return res.status(404).json({
        success: false,
        message: "No courses found for this creator",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Creator courses fetched successfully",
      courses,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Get creator courses error: ${error.message}`,
    });
  }
};

export const editCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { title, subTitle, description, category, level, isPublished, price } = req.body;

    let thumbnail;
    if (req.file) {
      thumbnail = await uploadOnCloudinary(req.file.path);
    }

    let course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course does not exist",
      });
    }

    const updateData = {};
    if (title) updateData.title = title;
    if (subTitle) updateData.subTitle = subTitle;
    if (description) updateData.description = description;
    if (category) updateData.category = category;
    if (level) updateData.level = level;
    if (typeof isPublished !== "undefined") updateData.isPublished = isPublished;
    if (price) updateData.price = price;
    if (thumbnail) updateData.thumbnail = thumbnail;

    course = await Course.findByIdAndUpdate(courseId, updateData, { new: true });

    return res.status(200).json({
      success: true,
      message: "Course updated successfully",
      course,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Failed to edit course: ${error.message}`,
    });
  }
};

export const getCourseById = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course does not exist",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Course fetched successfully",
      course,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Get course by id error: ${error.message}`,
    });
  }
};

export const removeCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course does not exist",
      });
    }

    await Course.findByIdAndDelete(courseId);

    return res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Removing course error: ${error.message}`,
    });
  }
};

// ---------------------- LECTURE CONTROLLERS ----------------------

export const createLecture = async (req, res) => {
  try {
    const { lectureTitle } = req.body;
    const { courseId } = req.params;

    if (!lectureTitle || !courseId) {
      return res.status(400).json({
        success: false,
        message: "Lecture title and CourseID are required",
      });
    }

    const lecture = await Lecture.create({ lectureTitle });
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course does not exist",
      });
    }

    course.lectures.push(lecture._id);
    await course.save();
    await course.populate("lectures");

    return res.status(201).json({
      success: true,
      message: "Lecture created successfully",
      lecture,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Failed to create lecture: ${error.message}`,
    });
  }
};

export const getCourseLecture = async (req, res) => {
  try {
    const { courseId } = req.params;
    const course = await Course.findById(courseId).populate("lectures");

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course does not exist",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Lectures fetched successfully",
      lectures: course.lectures,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Failed to get course lectures: ${error.message}`,
    });
  }
};

export const editLecture = async (req, res) => {
  try {
    const { lectureId } = req.params;
    const { isPreviewFree, lectureTitle } = req.body;

    const lecture = await Lecture.findById(lectureId);

    if (!lecture) {
      return res.status(404).json({
        success: false,
        message: "Lecture does not exist",
      });
    }

    if (req.file) {
      const videoUrl = await uploadOnCloudinary(req.file.path);
      lecture.videoUrl = videoUrl;
    }

    if (lectureTitle) {
      lecture.lectureTitle = lectureTitle;
    }

    if (typeof isPreviewFree !== "undefined") {
      lecture.isPreviewFree = isPreviewFree;
    }

    await lecture.save();

    return res.status(200).json({
      success: true,
      message: "Lecture edited successfully",
      lecture,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Failed to edit lecture: ${error.message}`,
    });
  }
};

export const removeLecture = async (req, res) => {
  try {
    const { lectureId } = req.params;
    const lecture = await Lecture.findByIdAndDelete(lectureId);

    if (!lecture) {
      return res.status(404).json({
        success: false,
        message: "Lecture does not exist",
      });
    }

    await Course.updateOne(
      { lectures: lectureId },
      { $pull: { lectures: lectureId } }
    );

    return res.status(200).json({
      success: true,
      message: "Lecture deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Failed to remove lecture: ${error.message}`,
    });
  }
};


//get creator 

export const getCreatorById = async (req,res) => {
  try {
    const {userId} = req.body;

    const user = await User.findById(userId).select("-password");

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
      message: `Get creator by id error: ${error.message}`,
    })
  }
}