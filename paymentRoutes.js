import express from 'express';
import { generatePaymentHash, payhereCallback } from '../controllers/paymentController.js';

const router = express.Router();

router.post('/payhere/generate-hash', generatePaymentHash);
router.post('/payhere/callback', payhereCallback);

export default router;