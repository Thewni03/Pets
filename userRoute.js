import express from 'express'
import { registerUser, loginUser, getProfile, updateProfile, bookAppointment, getUserAppointments, cancelAppointment } from '../controllers/userController.js'
import authUser from '../middlewares/authUser.js'

const userRouter = express.Router()

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)

userRouter.get('/get-profile', authUser, getProfile)
userRouter.post('/update-profile', authUser, updateProfile)
userRouter.post('/book-appointment', authUser, bookAppointment)
userRouter.post('/my-appointments', authUser, getUserAppointments);
userRouter.post('/cancel-appointment', authUser, cancelAppointment)






export default userRouter