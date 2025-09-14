const express = require('express');
const cors = require('cors'); //To like uk connect frontend and backend
require('dotenv').config(); //This is required to like read the gemini api key 
const { GoogleGenerativeAI } = require('@google/generative-ai'); //To connect with gemini model

 
const app = express();
const port = 3001;
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);  //Setting up the ai to get ready to use for work
 
//Now middlewares
app.use(cors());
app.use(express.json());

//API 
app.post('/api/analyze', async (req, res) => {
    try {
        const { choiceA, choiceB } = req.body;
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const prompt = `
            You are a wise and logical decision-making assistant. Your task is to analyze a user's choice based on a clear set of rules.

            **Rule #1: The Law of Regrets.** Your primary directive is to recommend the option with the higher "Regret Score". This score represents the user's gut feeling about which option they would regret missing out on more.

            **Rule #2: The Tie-Breaker.** If, and ONLY if, the regret scores are identical, you must perform a deep analysis of the user's written pros and cons to break the tie. In this case, your recommendation should be based on which option has the stronger arguments in its favor.

            Here is the user's data:
            - **Option A: "${choiceA.name}"**
              - Pros: "${choiceA.pros}"
              - Cons: "${choiceA.cons}"
              - Regret Score (if NOT chosen): ${choiceA.regretScore}/10

            - **Option B: "${choiceB.name}"**
              - Pros: "${choiceB.pros}"
              - Cons: "${choiceB.cons}"
              - Regret Score (if NOT chosen): ${choiceB.regretScore}/10

            Analyze the data according to the rules and provide your recommendation in HTML format.
            Your response MUST start with an <h3> tag containing the recommended choice.
            This must be followed by a <p> tag explaining your reasoning, making it clear whether the decision was based on the regret score or the tie-breaker analysis of the pros and cons.
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

// --- START SERVER ---
app.listen(port, () => {
    console.log(`🧠 AI Decision Backend is running on http://localhost:${port}`);
});