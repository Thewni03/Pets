import validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import doctorModel from '../models/doctorModel.js'
import appointmentModel from '../models/appointmentModel.js'
import petModel from '../models/petModel.js'
import crypto from 'crypto';

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



// API to make payment of appointment using PayHere
const paymentPayHere = async (req, res) => {
    try {
        const { appointmentId } = req.body;
        // Validate appointmentId exists and is valid
        if (!appointmentId) {
            return res.status(400).json({ 
                success: false, 
                message: "Invalid appointment ID" 
            });
        }
        const appointmentData = await appointmentModel.findById(appointmentId);

        // Validate required environment variables
        if (!process.env.PAYHERE_MERCHANT_ID || !process.env.PAYHERE_MERCHANT_SECRET) {
            console.error("Missing PayHere credentials in environment variables");
            return res.status(500).json({ 
                success: false, 
                message: "Payment system configuration error" 
            });
        }

        // Validate required appointment data
        if (!appointmentData.amount || typeof appointmentData.amount !== 'number') {
            return res.status(400).json({ 
                success: false, 
                message: "Invalid appointment amount" 
            });
        }

        if (!appointmentData || appointmentData.canceled) {
            return res.json({ success: false, message: "Appointment cancelled or not found" });
        }

        if (appointmentData.payment) {
            return res.json({ success: false, message: "Payment already completed" });
        }

        // Generate PayHere payment data
        const orderId = `PAYHERE_${Date.now()}`;
        const amount = appointmentData.amount;
        const currency = 'LKR';

        // Generate hash (must be done server-side for security)
        const merchantId = String(process.env.PAYHERE_MERCHANT_ID);
        const secretHash = crypto.createHash('md5')
            .update(String(process.env.PAYHERE_MERCHANT_SECRET))
            .digest('hex')
            .toUpperCase();

        const hashString = [
            merchantId,
            orderId,
            amount.toFixed(2),
            currency,
            secretHash
        ].join('');
       
        const hash = crypto.createHash('md5')
            .update(hashString)
            .digest('hex')
            .toUpperCase();
        

        const paymentData = {
            order_id: orderId,
            items: `Appointment with ${appointmentData.docData.name}`,
            amount: amount.toFixed(2),
            currency: currency,
            hash: hash,
            first_name: appointmentData.userData?.firstName || 'Customer',
            last_name: appointmentData.userData?.lastName || '',
            email: appointmentData.userData?.email || '',
            phone: appointmentData.userData?.phone || '',
            address: appointmentData.userData?.address || 'Not specified',
            city: appointmentData.userData?.city || 'Not specified',
            country: 'Sri Lanka',
            custom_1: appointmentId, // Store appointment ID in custom field
        };

        res.json({ 
            success: true, 
            paymentData,
            message: "Payment initialized successfully" 
        });

    } catch (error) {
        console.error("Payment error:", error);
        res.status(500).json({ 
            success: false, 
            message: "Payment initialization failed",
            error: error.message 
        });
    }
};

// API to verify payment
const verifyPayHere = async (req, res) => {
    try {
        const {
            merchant_id,
            order_id,
            payment_id,
            payhere_amount,
            payhere_currency,
            status_code,
            md5sig,
            custom_1 // Contains our appointmentId
        } = req.body;

        // 1. Log received values for debugging
        console.log("Received from PayHere:", {
            merchant_id,
            order_id,
            payhere_amount,
            payhere_currency,
            status_code,
            md5sig,
            custom_1
        });

        // 2. Validate required fields
        if (!merchant_id || !order_id || !payhere_amount || !status_code || !md5sig) {
            return res.status(400).send("Missing required fields");
        }

        // Format amount to 2 decimal places to match initial hash generation
        const formattedAmount = parseFloat(payhere_amount).toFixed(2);

        // Verify the payment
        const merchant_secret = process.env.PAYHERE_MERCHANT_SECRET;
        const secretHash = crypto
            .createHash('md5')
            .update(merchant_secret)
            .digest('hex')
            .toUpperCase();

        const local_md5sig = crypto
            .createHash('md5')
            .update(
                merchant_id +
                order_id +
                formattedAmount +
                payhere_currency +
                status_code +
                secretHash
            )
            .digest('hex')
            .toUpperCase();

        // 4. Log both hashes for comparison
        console.log("Hash Comparison:", {
            received: md5sig,
            computed: local_md5sig,
            status_code: status_code
        });
        if (local_md5sig === md5sig && status_code == 2) {
            // Payment is verified and successful
            await appointmentModel.findByIdAndUpdate(custom_1, { 
                payment: true,
                paymentId: payment_id,
                paymentDate: new Date()
            });
            
            return res.status(200).send("Payment verified and processed");
        } else {
            // Payment verification failed - log why
            if (local_md5sig !== md5sig) {
                console.log("Hash mismatch - possible tampering or secret mismatch");
            }
            if (status_code != 2) {
                console.log(`Payment not successful - status code: ${status_code}`);
            }
            // Payment verification failed
            return res.status(400).send("Payment verification failed");
        }
    } catch (error) {
        console.error("Payment verification error:", error);
        res.status(500).send("Error processing payment verification");
    }
};


export { registerUser, loginUser, getProfile, updateProfile, bookAppointment, getUserAppointments, cancelAppointment, paymentPayHere, verifyPayHere  }