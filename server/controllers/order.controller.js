import razorpay from "razorpay"
import Course from "../models/course.model.js";
import dotenv from "dotenv";
import User from "../models/user.model.js";
import crypto from "crypto";
dotenv.config();

const RazorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET
})

export const razorpayOrder = async (req, res) => {
  try {
   const {courseId} = req.body;
   const course = await Course.findById(courseId);
   if(!course){
    return res.status(404).json({
      success: false,
      message: "Course is not found"
    })
   }

   const options = {
    amount: course.price * 100,
    currency: "INR",
   receipt: courseId.toString(),
    notes: {
        courseId: courseId,
        courseTitle: course.title,
      },
   }
   const order = await RazorpayInstance.orders.create(options);
   res.status(200).json({
    success: true,
    order
   })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}



export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, courseId, userId } = req.body;

    // Generate expected signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Payment verification failed",
      });
    }

    // ✅ Payment verified → now update user & course
    const user = await User.findById(userId);
    if (!user.enrolledCourses.includes(courseId)) {
      user.enrolledCourses.push(courseId); // make sure this matches schema
    }
    await user.save();

    const course = await Course.findById(courseId).populate("lectures");
    if (!course.enrolledStudents.includes(userId)) {
      course.enrolledStudents.push(userId);
    }
    await course.save();

    return res.status(200).json({
      success: true,
      message: "Payment verified and enrollment successful",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `verifyPayment error: ${error.message}`,
    });
  }
};




// export const verifyPayment = async (req,res) => { try { const {courseId, userId , razorpay_order_id} = req.body; const orderInfo = await RazorpayInstance.orders.fetch(razorpay_order_id); if(orderInfo.status !== "paid"){ return res.status(400).json({ success: false, message: "Payment is not successful" }) } if(orderInfo.status === 'paid'){ const user = await User.findById(userId); if(!user.enrolledCourses.includes(courseId)){ user.courses.push(courseId); } await user.save(); const course = await Course.findById(courseId).populate("lectures"); if(!course.enrolledStudents.includes(userId)){ course.enrolledStudents.push(userId); } await course.save(); return res.status(200).json({ success: true, message: "Payment is verified and enrollment successful" }) } } catch (error) { return res.status(500).json({ success: false, message: `verifyPayment error: ${error.message}` }) } }