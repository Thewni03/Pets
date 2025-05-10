import express from 'express'
import { doctorList, loginDoctor, appointmentsVet, appointmentComplete, appointmentCancel, doctorDashboard } from '../controllers/doctorController.js'
import authVet from '../middlewares/authVet.js'

const doctorRouter = express.Router()

doctorRouter.get('/list', doctorList)
doctorRouter.post('/login', loginDoctor)
doctorRouter.get('/appointments', authVet, appointmentsVet)
doctorRouter.post('/complete-appointment', authVet, appointmentComplete)
doctorRouter.post('/cancel-appointment', authVet, appointmentCancel)
doctorRouter.get('/dashboard', authVet, doctorDashboard)

export default doctorRouter