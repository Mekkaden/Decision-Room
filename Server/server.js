const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const port = 3001;
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.use(cors());
app.use(express.json());

app.post('/api/analyze', async (req, res) => {
    try {
        const { choiceA, choiceB } = req.body;
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
       // Inside your app.post('/api/analyze'...) function in server.js

// Inside your app.post('/api/analyze'...) function in server.js

const prompt = `
    You are a wise and sophisticated decision-making assistant with a strong ethical framework. Your task is to provide a nuanced and safe recommendation.

    **Prime Directive (Rule #0):** Before any other analysis, you MUST perform a sanity check on the user's choices. If an option is clearly self-harming, dangerous, illegal, or logically absurd (e.g., "cut my leg off," "jump off a bridge"), you must OVERRIDE all other rules. In this case, you must NOT recommend the harmful option. Instead, your response should gently refuse to choose, explain that the premise of the choice is dangerous or nonsensical, and advise the user to seek help if appropriate.

    If, and only if, both choices are reasonable and safe, proceed with the following weighted analysis:

    **Rule #1: The Law of Regrets (Approx. 90% Weight).** The user's "Regret Score" is the most critical piece of data. It represents their gut feeling. A higher score indicates a stronger desire to not miss out on that option. This should be the dominant factor in your final decision.

    **Rule #2: Qualitative Analysis (Approx. 10% Weight).** The pros and cons provide essential context. Analyze the *significance* of these points. This analysis should serve to validate or slightly temper the primary factor, especially if the regret scores are close.

    Here is the user's data:
    - **Option A: "${choiceA.name}"**
      - Pros: "${choiceA.pros}"
      - Cons: "${choiceA.cons}"
      - Regret Score (if NOT chosen): ${choiceA.regretScore}/10

    - **Option B: "${choiceB.name}"**
      - Pros: "${choiceB.pros}"
      - Cons: "${choiceB.cons}"
      - Regret Score (if NOT chosen): ${choiceB.regretScore}/10

    Provide your final recommendation in HTML format.
    Your response MUST start with an <h3> tag and end with a </p> tag.
    Do NOT include ANY other text, conversational filler, or markdown formatting like "\`\`\`html" before or after the HTML content.
`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const aiRecommendationHtml = response.text();
        
        res.json({ recommendation: aiRecommendationHtml });

    } catch (error) {
        console.error("Error during AI analysis:", error);
        res.status(500).json({ error: "An error occurred while communicating with the AI." });
    }
});

app.listen(port, () => {
    console.log(`🧠 AI Decision Backend is running on http://localhost:${port}`);
});
