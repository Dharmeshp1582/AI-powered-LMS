import express from 'express'; 
import dotenv from 'dotenv';
import connectDB from './configs/connectDB.js';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.route.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

await connectDB();
app.use(express.json());
app.use(cookieParser())

app.use("/api/auth",authRouter);

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));