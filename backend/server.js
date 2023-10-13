import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import cookieParser from 'cookie-parser';


// Router Routes
import userRouter from './routes/userRoutes.js';
import globalErrorHandler from './middleware/globalErrorHandler.js';


// Express App
const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: ['http://localhost:3000', 'http://real-estate-app.vercel.app'],
    credentials: true, // to send token from the backend to the frontend
  })
);

const PORT = process.env.PORT || 5000;

// Security key holder
dotenv.config();

// Connect to DB
mongoose
  .connect(process.env.MONGODB)
  .then(() => {
    console.log('Connected to MongoDB!'.blue.bold);
  })
  .catch((err) => {
    console.log(err);
  });

  app.get("/yes", (req, res) => {
    res.send("It is done mane")
  })

// End points
app.use("/api/users", userRouter)

// Global error handler
app.use(globalErrorHandler)

// Listner
app.listen(PORT, () => {
  console.log(`The server started on port ${PORT}`.green.bold)
})