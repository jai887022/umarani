import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;

// Initialize Gemini Client safely
let ai: GoogleGenAI | null = null;
const apiKey = process.env.GEMINI_API_KEY;

if (apiKey) {
  try {
    ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
    console.log("Gemini client successfully initialized.");
  } catch (err) {
    console.error("Failed to initialize Gemini Client:", err);
  }
} else {
  console.log("GEMINI_API_KEY is not defined. The app will run in mock AI mode.");
}

// API Route for Canva Support Chatbot in Tamil
app.post("/api/chat", async (req, res) => {
  const { messages, userMessage } = req.body;
  
  if (!userMessage) {
    return res.status(400).json({ error: "No message provided" });
  }

  // System instruction for the Canva tutor in Tamil
  const systemInstruction = 
    "You are Kavitha, a friendly and passionate Tamil graphic design expert and coach for the " +
    "'Canva Masterclass in Tamil' (₹499). You reply in an encouraging and highly energetic " +
    "manner. Use simple language blending proper Tamil script (தமிழ்), Romanized Tamil (Tanglish), " +
    "and simple English. Emphasize how Canva can help them earn money online as a freelancer, or " +
    "grow their business. Tell them the course covers Social Media, Posters, Reels editing, Logo " +
    "designing, and Canva Pro features for just ₹499 with lifetime access and completion certificates. " +
    "Keep answers precise, interactive, and under 3 sentences.";

  if (ai) {
    try {
      // Reconstruct conversation history if provided
      const chatHistory = messages ? messages.map((m: any) => ({
        role: m.sender === 'user' ? 'user' : 'model',
        parts: [{ text: m.text }]
      })) : [];

      // Add user's latest query
      const contents = [
        ...chatHistory,
        { role: 'user', parts: [{ text: userMessage }] }
      ];

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: contents,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.8,
        }
      });

      const reply = response.text || "மன்னிக்கவும், என்னால் பதில் அளிக்க முடியவில்லை. (Sorry, I couldn't respond. Please try again!)";
      return res.json({ reply });
    } catch (err: any) {
      console.error("Gemini API error:", err);
      // Fallback with user-friendly error response containing Tamil explanation
      return res.json({ 
        reply: "Sorry, I faced a minor connection issue. But let me tell you: This Canva Masterclass is taught in 100% Tamil, offers 40+ HD videos, and costs only ₹499!" 
      });
    }
  } else {
    // Elegant mock response in Tamil/Tanglish when API key is missing
    const lowerMessage = userMessage.toLowerCase();
    let mockReply = "";

    if (lowerMessage.includes("price") || lowerMessage.includes("amount") || lowerMessage.includes("cost") || lowerMessage.includes("499") || lowerMessage.includes("காசு") || lowerMessage.includes("விலை")) {
      mockReply = "இந்த Canva Course-இன் விலை வெறும் ₹499 மட்டுமே! 🚀 இதில் Lifetime Access, 10+ Modules, மற்றும் Completion Certificate கிடைக்கும்!";
    } else if (lowerMessage.includes("syllabus") || lowerMessage.includes("topic") || lowerMessage.includes("what will") || lowerMessage.includes("என்ன")) {
      mockReply = "இந்த கோர்ஸில் Social Media Posts, Reels, YouTube Thumbnails, Logo design, Business cards, மற்றும் Canva Pro tips-விவரமாக கற்றுத்தரப்படும்! 🎨";
    } else if (lowerMessage.includes("tamil") || lowerMessage.includes("மொழி") || lowerMessage.includes("english")) {
      mockReply = "ஆமாம்! இது முழுக்க முழுக்க எளிய தமிழில் (Simple Tamil & Tanglish) நடத்தப்படும், அதனால் வடிவமைப்பு அனுபவம் இல்லாதவர்களும் சுலபமாக கற்கலாம்! 😊";
    } else if (lowerMessage.includes("earn") || lowerMessage.includes("money") || lowerMessage.includes("freelance") || lowerMessage.includes("வேலை")) {
      mockReply = "நிச்சயமாக! Canva மூலம் Logo, Social Media Poster போன்றவற்றை செய்து Fiverr, Freelancer தளங்களில் நல்ல வருமானம் சம்பாதிக்கலாம். அதற்கான Guidance-ம் கோர்ஸில் உள்ளது! 💰";
    } else {
      mockReply = "வணக்கம்! நான் கவிதா, உங்கள் Canva AI Tutor. இந்த ₹499 Canva கோர்ஸில் சேர்ந்தால், நீங்கள் ஒரு பிரொபஷனல் டிசைனராக மாறலாம்! உங்களுக்கு என்ன சந்தேகம்? கேளுங்கள்! ✨";
    }

    return res.json({ reply: mockReply });
  }
});

// Configure Vite middleware and static serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
