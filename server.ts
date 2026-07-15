import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Gemini Setup
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY || "",
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });

  // API Route: AI Explanation
  app.post("/api/explain", async (req, res) => {
    try {
      const { grammarPoint, question, wrongAnswer, correctAnswer } = req.body;
      
      const prompt = `You are a friendly English grammar tutor on 'GrammarQuest'. 
      A student is studying '${grammarPoint}'. 
      They were asked: '${question}'
      The correct answer is: '${correctAnswer}'
      
      Please provide a brief, encouraging explanation (in both English and Chinese) why the correct answer is right and why their choice was a common mistake. Keep it under 100 words.`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
      });
      
      res.json({ explanation: response.text });
    } catch (error) {
      console.error("AI Error:", error);
      res.status(500).json({ error: "Failed to get AI explanation" });
    }
  });

  // API Route: Fetch Sheet Data
  app.get("/api/sheets/grammar", async (req, res) => {
    try {
      const accessToken = req.headers.authorization?.split(" ")[1];
      if (!accessToken) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const spreadSheetId = "1P-1BVtkAOYskH6EirLxGBf2ZikhADtw_qgbIOD7ih34";
      const range = "Sheet1!A2:N100"; // Adjust range based on expected data

      const response = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${spreadSheetId}/values/${range}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || "Failed to fetch sheets");
      }

      const data = await response.json();
      res.json(data.values || []);
    } catch (error: any) {
      console.error("Sheets Error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
