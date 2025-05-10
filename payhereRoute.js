import express from 'express';
import { payhereNotify } from '../controllers/payhereController.js';

const router = express.Router();

//router.post('/notify', paymentCallback); // PayHere will POST here
router.post("/notify", payhereNotify)

export default router;
