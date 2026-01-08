import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

export const generateDietPlan = async (req, res, next) => {
  try {
    const { species, breed, weight_kg, age_years } = req.body;

    if (!species || !breed || !weight_kg || !age_years) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const prompt = `Generate a structured diet plan for a ${species}, breed ${breed}, weight ${weight_kg}kg, and age ${age_years} years in JSON format.`;
    const result = await model.generateContent(prompt);

    if (!result?.response?.candidates?.[0]) {
      return res.status(500).json({ error: "AI did not return a valid response" });
    }

    const content = result.response.candidates[0].content;
    let dietPlan = typeof content === 'string' ? tryParseJson(content) : content;

    res.status(200).json({ diet_plan: dietPlan });
  } catch (error) {
    next(error);
  }
};

function tryParseJson(content) {
  try {
    const jsonRegex = /```json\n([\s\S]*?)\n```/;
    const match = content.match(jsonRegex);
    return JSON.parse(match ? match[1] : content);
  } catch {
    return { content }; // Fallback if parsing fails
  }
}