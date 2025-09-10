import express from 'express'; 
import dotenv from 'dotenv';
import connectDB from './configs/connectDB.js';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import authRouter from './routes/auth.route.js';
import userRouter from './routes/user.route.js';
import courseRouter from './routes/course.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

await connectDB();
app.use(express.json());
app.use(cookieParser())
app.use(cors({
  origin:'http://localhost:5173',credentials:true}
))

app.use("/api/auth",authRouter);
app.use("/api/user",userRouter);
app.use('/api/course',courseRouter);

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));