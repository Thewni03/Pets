import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import crypto from 'crypto'
import adminRouter from './routes/adminRoute.js'
// import path, { dirname }  from 'path'
// import { fileURLToPath } from 'url';
import doctorRouter from './routes/doctorRoute.js'
import userRouter from './routes/userRoute.js'
import petRouter from './routes/petRoute.js'
import payhereRouter from './routes/payhereRoute.js'
import paymentRoutes from './routes/paymentRoutes.js';


//app config
const app = express()
//const __dirname = dirname(fileURLToPath(import.meta.url));
//app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

//middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors())

//API endpoints
app.use('/api/admin', adminRouter) //localhost:4000/api/admin/add-doctor
app.use('/api/doctor', doctorRouter)
app.use('/api/user', userRouter)
app.use('/api/pet', petRouter)
app.use('/api/payhere', payhereRouter)
app.use('/api', paymentRoutes);


app.get('/',(req,res)=>{
    res.send('API working')
})

app.listen(port, ()=>console.log('Server started',port))