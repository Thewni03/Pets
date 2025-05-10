import crypto from 'crypto';
import appointmentModel from '../models/appointmentModel.js';
import { payhereConfig } from '../config/payhereConfig.js';

export const generatePayHereHash = (merchant_id, order_id, amount, currency, merchant_secret) => {
    if (!merchant_secret) {
        throw new Error('Merchant secret is required');
    }
    const secretHash = crypto.createHash('md5').update(merchant_secret).digest('hex').toUpperCase();
    const hashString = merchant_id + order_id + amount + currency + secretHash;
    return crypto.createHash('md5').update(hashString).digest('hex').toUpperCase();
};

export const verifyPayHerePayment = (params, merchant_secret) => {
    const { merchant_id, order_id, payhere_amount, payhere_currency, status_code, md5sig } = params;
    
    const secretHash = crypto.createHash('md5').update(merchant_secret).digest('hex').toUpperCase();
    const local_md5sig = crypto.createHash('md5')
        .update(merchant_id + order_id + payhere_amount + payhere_currency + status_code + secretHash)
        .digest('hex')
        .toUpperCase();
        
    return (local_md5sig === md5sig) && (status_code == 2);
};

export const generatePaymentHash = async (req, res) => {
    try {
        console.log('Received hash generation request with:', req.body);
        const { order_id, amount, currency = 'LKR' } = req.body;
        
        if (!order_id || amount === undefined || amount === null) {
            return res.status(400).json({ error: 'order_id and amount are required' });
        }

        // Convert amount to number and validate
        const amountFormatted = parseFloat(amount).toFixed(2);
        if (isNaN(amountFormatted)) {
            return res.status(400).json({ error: 'Invalid amount format' });
        }

        console.log('Using these values for hash generation:', {
            merchantId: payhereConfig.merchantId,
            order_id,
            amountFormatted,
            currency,
            merchantSecret: payhereConfig.merchantSecret ? '***REDACTED***' : 'MISSING'
        });

        const hash = generatePayHereHash(
            payhereConfig.merchantId, 
            order_id, 
            amountFormatted, 
            currency, 
            payhereConfig.merchantSecret
        );
         console.log('Generated hash:', hash);
        res.json({ hash });
    } catch (error) {
        console.error('Hash generation error:', error);
        res.status(500).json({ error: error.message });
    }
};

export const payhereCallback = async (req, res) => {
    try {
        const isValid = verifyPayHerePayment(req.body, payhereConfig.merchantSecret);
        
        if (isValid) {
            const orderId = req.body.order_id;
            const updated = await appointmentModel.findByIdAndUpdate(orderId, { payment: true });

            if (!updated) {
                return res.status(404).send('Appointment not found');
            }
            console.log('Payment verified and appointment updated:', orderId);
            return res.status(200).send('Payment notification received and verified');

        } else {
            // Payment verification failed
            console.log('Invalid payment notification:', req.body);
            return res.status(400).send('Invalid payment notification');
        }
    } catch (error) {
        console.error('Error processing payment notification:', error);
        res.status(500).send('Error processing payment');
    }
};

