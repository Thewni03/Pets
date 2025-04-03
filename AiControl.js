const axios = require('axios'); // Assuming you're using axios to interact with AI service

exports.getAiResponse = async (req, res) => {
  try {
    // Mock AI response logic, replace with actual AI API request
    const aiResponse = {
      dog: {
        breed: "Labrador",
        weight_kg: 25,
        age_years: 5,
        condition: "Normal",
        activity_level: "Moderate (1-2 hours of daily exercise)"
      },
      diet_plan: {
        daily_calories: 900,
        feeding_schedule: "Twice daily (Morning & Evening)",
        food_type: "Dry Kibble (High Quality)",
        recommendations: [
          "Choose a kibble formulated for adult dogs and appropriate for their activity level.",
          "Ensure the kibble contains a named meat protein as the primary ingredient (e.g., Chicken, Beef, Lamb).",
          "Look for ingredients such as whole grains, vegetables, and fruits.",
          "Avoid kibble with excessive fillers like corn, wheat, and soy."
        ],
        meal_plan: [
          {
            meal_time: "Morning",
            food_amount_grams: 125,
            description: "Dry kibble. Consider adding a small amount of wet food (e.g., 50g) for added moisture.",
            supplements: [
              {
                type: "Glucosamine and Chondroitin",
                dosage: "Follow manufacturer's instructions",
                reason: "Supports joint health, especially important for Labradors."
              }
            ]
          },
          {
            meal_time: "Evening",
            food_amount_grams: 125,
            description: "Dry kibble. Consider adding a small amount of plain, unsweetened yogurt for probiotics.",
            supplements: []
          }
        ]
      }
    };

    // Send the AI response as JSON
    res.json(aiResponse);
  } catch (error) {
    console.error('Error fetching AI response:', error);
    res.status(500).json({ message: 'Error generating AI response' });
  }
};
