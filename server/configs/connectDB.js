import mongoose from "mongoose";

const connectDB = async () => {

  try {
    const db = await mongoose.connect(process.env.MONGODB_URL);
    console.log("Mongodb connected successfully");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

export default connectDB