import appointmentModel from "../models/appointmentModel.js";
import crypto from "crypto"
// PayHere returns payment status via this callback
const paymentCallback = async (req, res) => {
    try {
        const { order_id, status_code } = req.body;

        // Assuming appointment ID is used as order_id
        const appointment = await appointmentModel.findById(order_id);

        if (!appointment) {
            return res.status(404).json({ success: false, message: "Appointment not found" });
        }

        if (status_code === "2") {
            appointment.payment = true;
            await appointment.save();
            return res.status(200).json({ success: true, message: "Payment confirmed" });
        } else {
            return res.status(400).json({ success: false, message: "Payment failed or pending" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

const payhereNotify = async (req, res) => {
    try {
        const {
            merchant_id,
            order_id,
            payhere_amount,
            payhere_currency,
            status_code,
            md5sig
        } = req.body;

        const merchant_secret = process.env.PAYHERE_SECRET; // 🔒 Use env variable only

        // Recreate signature
        const localMd5 = crypto.createHash("md5").update(merchant_secret).digest("hex");
        const generatedSig = crypto
            .createHash("md5")
            .update(
                merchant_id +
                order_id +
                payhere_amount +
                payhere_currency +
                status_code +
                localMd5
            )
            .digest("hex")
            .toUpperCase();

        if (md5sig !== generatedSig) {
            return res.status(400).json({ success: false, message: "Invalid signature" });
        }

        if (status_code === "2") {
            // Payment success - update appointment
            await appointmentModel.findByIdAndUpdate(order_id, {
                 payment: true }
            );

            return res.status(200).json({ success: true });
        } else {
            return res.status(200).json({ success: false, message: "Payment not successful" });
        }
    } catch (error) {
        console.error("Notify error:", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
  }
export { paymentCallback, payhereNotify };
