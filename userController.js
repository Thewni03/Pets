import validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import doctorModel from '../models/doctorModel.js'
import appointmentModel from '../models/appointmentModel.js'
import petModel from '../models/petModel.js'
import { generatePayHereHash } from './paymentController.js'

//API to register user
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body
        if (!name || !password || !email) {
            return res.json({success: false, message: "Missing details"})
        }

        if (!validator.isEmail(email)) {
            return res.json({success: false, message: "Enter a valid email"})
        }

        if (password.length < 8) {
            return res.json({success: false, message: "Please Enter a strong password"})
        }

        //hashing pwd
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const userData = {
            name,
            email,
            password: hashedPassword
        }

        const newUser = new userModel(userData)
        const user = await newUser.save()

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)

        res.json({success: true, token})

    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

//API for user login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await userModel.findOne({email})

        if(!user){
            return res.json({success: false, message:"User does not exist"})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(isMatch){
            const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)
            res.json({success: true, token})
        } else {
            res.json({success: false, message: "Invalid credentials"})
        }
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

//API to get user profile data
const getProfile = async (req, res) => {
    try {
        const { userId } = req.body
        const userData = await userModel.findById(userId).select('-password')

        res.json({success: true, userData})
        

    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

//API to update user profile
const updateProfile = async (req, res) => {
    try {
        // console.log("Received Data:", req.body); // Debugging log

        const { userId, name, phone, dob, gender } = req.body;

        // Identify missing fields
        let missingFields = [];
        if (!name) missingFields.push("name");
        if (!phone) missingFields.push("phone");
        if (!dob) missingFields.push("dob");
        if (!gender) missingFields.push("gender");

        if (missingFields.length > 0) {
            return res.status(400).json({ 
                success: false, 
                message: `Missing fields: ${missingFields.join(", ")}`,
                receivedData: req.body // Show what was actually received
            });
        }

        // Ensure userId is valid
        if (!userId) {
            return res.status(400).json({ success: false, message: "User ID is required" });
        }

        // Update the user profile
        const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            { name, phone, dob, gender },
            { new: true, select: "-password" }
        );

        if (!updatedUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.json({ success: true, message: "Profile updated", updatedUser });

    } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};


//API to book appointment
const bookAppointment = async (req, res) => {
    try {
        const { userId, docId, slotDate, slotTime, petId } = req.body
        console.log("Received API Request:", req.body);
    
        const docData = await doctorModel.findById(docId).select('-password')

        if(!docData.available){
            return res.json({success: false, message: 'Doctor not available'})
        }

        let slots_booked = docData.slots_booked

        //checking for slot availability
        if (slots_booked[slotDate]) {
            if(slots_booked[slotDate].includes(slotTime)){
                return res.json({success: false, message: 'Slot not available'})
            } else{
                slots_booked[slotDate].push(slotTime)
            }
        } else {
            slots_booked[slotDate] = []
            slots_booked[slotDate].push(slotTime)
        }

        const userData = await userModel.findById(userId).select('-password')
        const pets = await petModel.find({ ownerId: userId })
        const petInfo = await petModel.findById(petId);
        console.log("Fetched Pet Info:", petInfo);
        if (!petInfo) {
            return res.status(400).json({ success: false, message: "Pet not found" });
        }
        delete docData.slots_booked

        const appointmentData = {
            userId,
            docId,
            petId,
            userData,
            docData,
            petData: petInfo,
            amount: docData.fees,
            slotTime,
            slotDate,
            date: Date.now()
        }

        const newAppointment = new appointmentModel(appointmentData)
        await newAppointment.save()
        
        //save new slots data in docData
        await doctorModel.findByIdAndUpdate(docId, { $set: { slots_booked } });

        res.json({success: true, message: 'Appointment booked', userData, pets, doctor: docData, petData: petInfo})

    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

const getUserAppointments = async (req, res) => {
    try {
        const { userId } = req.body;  // Assuming userId is sent from frontend

        const userAppointments = await appointmentModel.find({ userId });

        if (!userAppointments.length) {
            return res.json({ success: false, message: "No appointments found" });
        }

        res.json({ success: true, appointments: userAppointments });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// const cancelAppointment = async (req, res) => {
//     try {
//         const { appointmentId } = req.body;
        
//         // Find the appointment to cancel
//         const appointment = await appointmentModel.findById(appointmentId);

//         if (!appointment) {
//             return res.json({ success: false, message: "Appointment not found" });
//         }

//         // Find the doctor associated with the appointment
//         const doctor = await doctorModel.findById(appointment.docId);

//         if (!doctor) {
//             return res.json({ success: false, message: "Doctor not found" });
//         }

//         // Log doctor slots before updating
//         // console.log("Before update, doctor slots_booked:", doctor.slots_booked);

//         // Remove the canceled slot from the doctor's booked slots
//         const { slotDate, slotTime } = appointment;
//         if (doctor.slots_booked[slotDate]) {
//             doctor.slots_booked[slotDate] = doctor.slots_booked[slotDate].filter(
//                 (time) => time !== slotTime
//             );
//         }

//         // Log doctor slots after updating
//         doctor.markModified('slots_booked');

//         // Update the doctor model with the updated slots_booked
//         await doctor.save();

//         // Delete the appointment from the appointment collection
//         await appointmentModel.findByIdAndDelete(appointmentId);

//         res.json({ success: true, message: "Appointment canceled and slot freed" })

//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: "Failed to cancel appointment" })
//     }
// }

//API to cancel appointment
const cancelAppointment = async (req, res) => {
    try {
        const {userId, appointmentId} = req.body

        const appointmentData = await appointmentModel.findById(appointmentId)

        //verify appointment user
        if (appointmentData.userId != userId){
            return res.json({success: false, message: 'Unauthorized action'})
        }

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

const initiatePayment = async (req, res) => {
    try {
        const { appointmentId, returnUrl, cancelUrl, notifyUrl } = req.body;

        const appointment = await appointmentModel.findById(appointmentId);
        if (!appointment) {
            return res.status(404).json({ success: false, message: "Appointment not found" });
        }

        const amountFormatted = appointment.amount.toFixed(2);
        const orderId = appointment._id.toString();

        const hash = generatePayHereHash(
            process.env.PAYHERE_MERCHANT_ID,
            orderId,
            amountFormatted,
            "LKR",
            process.env.PAYHERE_MERCHANT_SECRET
        );
        const paymentData = {
            merchant_id: process.env.PAYHERE_MERCHANT_ID,
            return_url: returnUrl,
            cancel_url: cancelUrl,
            notify_url: notifyUrl,
            order_id: orderId,
            items: `Appointment with Dr. ${appointment.docData.name}`,
            amount: amountFormatted,
            currency: "LKR",
            first_name: appointment.userData.name,
            email: appointment.userData.email,
            phone: appointment.userData.phone || "0000000000",
            address: "N/A",
            city: "N/A",
            country: "Sri Lanka",
            hash
        };

        res.json({ success: true, paymentData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};





export { registerUser, loginUser, getProfile, updateProfile, bookAppointment, getUserAppointments, cancelAppointment,initiatePayment }