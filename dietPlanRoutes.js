import express from 'express';
import { generateDietPlan } from '../controllers/dietPlanController.js';

const dietPlanRouter = express.Router();
dietPlanRouter.post("/generate-diet-plan", generateDietPlan);

export default dietPlanRouter;