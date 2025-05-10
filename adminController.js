import validator from 'validator'
import bcrypt from 'bcrypt'
import doctorModel from "../models/doctorModel.js"
import jwt from 'jsonwebtoken'
import { v2 as cloudinary } from 'cloudinary'
import appointmentModel from '../models/appointmentModel.js'
import userModel from '../models/userModel.js'

// API for adding doctors

const addDoctor = async (req, res) => {
    try{
        const{name, email, password, speciality,degree, experience, about, fees } = req.body
        const imageFile = req.file

        //verify data
        if(!name || !email || !password || !speciality || !degree || !experience || !about || !fees ){
            return res.json({success:false, message:"Missing details"})
        }

        //validating email
        if(!validator.isEmail(email)){
            return res.json({success:false, message:"Please enter a valid email"})
        }

        //validating pwd
        if(password.length < 8){
            return res.json({success:false, message:"Please enter a strong password"})
        }

        //hashing pwd
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        //upload image to cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type:"image"})
        const imageUrl = imageUpload.secure_url

        //save data to db
        const doctorData = {
            name,
            email,
            image: imageUrl,
            password:hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            date:Date.now()
        }

        const newDoctor = new doctorModel(doctorData)
        await newDoctor.save()

        res.json({success:true, message:"Doctor added"})

    } catch(error){
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

// API for admin login
const loginAdmin = async (req, res) => {
    try{
        const {email, password} = req.body
        
        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            const token = jwt.sign(email+password, process.env.JWT_SECRET)
            res.json({success: true, token})
        } else {
            res.json({success: false, message: error.message})
        }

    } catch(error){
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

//API to get all doctors list in admin dashboard
const allDoctors = async (req, res) => {
    try {
        const doctors = await doctorModel.find({}).select('-password')
        res.json({success:true, doctors})
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

//API to get all appointment list
const appointmmentsAdmin = async(req,res) => {
    try {
        const appointments = await appointmentModel.find({})
        res.json({success:true, appointments})
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

//API for appointment cancellation
const appointmentCancel = async (req, res) => {
    try {
        const { appointmentId} = req.body

        const appointmentData = await appointmentModel.findById(appointmentId)

        await appointmentModel.findByIdAndUpdate(appointmentId, {canceled: true})

        //releasing doctor slot
        const {docId, slotDate, slotTime} = appointmentData

        const doctorData = await doctorModel.findById(docId)

        let slots_booked = doctorData.slots_booked

        slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime)

        await doctorModel.findByIdAndUpdate(docId, {slots_booked})

        res.json({success: true, message: 'Appointment cancelled'})

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

//API to get dashboard data 
const adminDashboard = async (req,res) => {
    try {
        const doctors = await doctorModel.find({})
        const users = await userModel.find({})
        const appointments = await appointmentModel.find({})

        const dashData = {
            doctors: doctors.length,
            appointments: appointments.length,
            users : users.length,
            latestAppointments: appointments.reverse().slice(0,5)
        }
        
        res.json({success:true,dashData})

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}


export {addDoctor, loginAdmin, allDoctors, appointmmentsAdmin, appointmentCancel, adminDashboard }