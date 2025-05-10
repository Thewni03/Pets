import dotenv from 'dotenv'
dotenv.config()
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import userRouter from './routes/userRoutes.js';
import ticketrouter from './routes/ticketRoutes.js';


const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:5175', 'http://localhost:5174'], // frontend URL
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
})); // CORS

app.use(express.json()); 

//connect db
connectDB();

//call the user models: router -> controller -> models
app.use('/api/user', userRouter)
app.use('/api/tickets', ticketrouter)


//start server
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}` );
});