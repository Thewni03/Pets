import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoute.js'
import path, { dirname }  from 'path'
import { fileURLToPath } from 'url';
import doctorRouter from './routes/doctorRoute.js'
import userRouter from './routes/userRoute.js'
import petRouter from './routes/petRoute.js'
import arouter from './routes/admiRoute.js'
import vetRouter from './routes/vetRoute.js'
import dietPlanRouter from './routes/dietPlanRoutes.js';
import fileRouter from './routes/fileRoutes.js';
import imgRouter from './routes/imgRoute.js'
import ticketrouter from './routes/ticketRoutes.js'

//app config
const app = express()

const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

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
app.use('/api/adm', arouter)
app.use('/api/vet', vetRouter)
app.use("/api/diet-plans", dietPlanRouter);
app.use("/api/files", fileRouter);
app.use("/api/img", imgRouter);
app.use('/api/tickets', ticketrouter)

app.get('/',(req,res)=>{
    res.send('API working')
})

app.listen(port, ()=>console.log('Server started',port))
