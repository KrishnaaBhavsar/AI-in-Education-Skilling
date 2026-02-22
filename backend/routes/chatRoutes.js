const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');

// @route   POST /api/chat
// @desc    Send a message to the AI Concept Coach
router.post('/', async (req, res) => {
  try {
    const { message } = req.body;
    
    // Initialize Gemini with your API key
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    
    // We use gemini-2.5-flash for fast, conversational responses
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // The "System Prompt" to make it act like a tutor
    const prompt = `You are an expert AI Concept Coach helping a final-year Computer Science engineering student. 
    Your goal is to help them understand concepts deeply. 
    Do NOT just give direct answers to problems. Instead, provide clear, stepwise hints, ask guiding questions, and encourage them.
    Keep responses concise and formatted neatly.
    
    The student says: "${message}"`;

    // Call the Gemini API
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    res.json({ text: responseText });
  } catch (err) {
    console.error("Gemini API Error:", err);
    res.status(500).json({ error: "Failed to connect to the AI brain." });
  }
});

module.exports = router;