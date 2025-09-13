import Course from "../models/course.model.js";
import Review from "../models/review.model.js";


export const createReview = async (req,res) => {
  try {
    const {rating,comment, courseId} = req.body;
    const userId = req.userId;

    const course = await Course.findById(courseId);

    if(!course){
      return res.status(404).json({
        success: false,
        message: "Course does not exist"
      })
    }

    // console.log("Review attempt:", { courseId, userId });

    const alreadyReviewed = await Review.findOne({course: courseId, user: userId});

    if(alreadyReviewed){
      return res.status(400).json({
        success: false,
        message: "You have already reviewed this course"
      })
    }

    const review = new Review({
      rating,
      comment,
      course: courseId,
      user: userId
    });

    await review.save()

    await course.reviews.push(review._id)
    await course.save()

    return res.status(201).json({
      success: true,
      message: "Review created successfully",
      review
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Failed to Create review error: ${error.message}`
    })
  }
}

export const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({})
      .populate("user", "name photoUrl description").populate("course")
      .sort({ reviewedAt: -1 });

    return res.status(200).json(reviews);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Failed to get reviews error: ${error.message}`
    });
  }
};
