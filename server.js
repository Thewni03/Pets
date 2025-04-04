import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import adminRouter from './routes/adminRoute.js'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url';
import doctorRouter from './routes/doctorRoute.js'
import userRouter from './routes/userRoute.js'

// App configuration
const app = express()
const __dirname = dirname(fileURLToPath(import.meta.url));

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Set the port
const port = process.env.PORT || 5008

// Connect to the database
connectDB()

// Middleware to parse JSON and URL-encoded data, and enable CORS
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors())

// API routes
app.use('/api/admin', adminRouter)  // e.g., localhost:5008/api/admin/add-doctor
app.use('/api/doctor', doctorRouter)  // e.g., localhost:5008/api/doctor/list
app.use('/api/user', userRouter)  // e.g., localhost:5008/api/user/signup

// Basic route to check if the server is running
app.get('/', (req, res) => {
    res.send('API working')
})

// Start the server
app.listen(port, () => console.log(`Server started on port ${port}`))
