import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

const app = express();
app.use(express.json());

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';
if (!GEMINI_API_KEY) {
  console.warn('WARNING: GEMINI_API_KEY is not set. AI features will not work.');
}

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

// Rate limiting: simple in-memory per-IP cooldown
const rateLimitMap = new Map<string, number>();
const RATE_LIMIT_MS = 2000;

function rateLimit(req: express.Request, res: express.Response): boolean {
  const ip = req.ip || 'unknown';
  const now = Date.now();
  const last = rateLimitMap.get(ip) || 0;
  if (now - last < RATE_LIMIT_MS) {
    res.status(429).json({ error: 'Too many requests. Please wait a moment.' });
    return true;
  }
  rateLimitMap.set(ip, now);
  return false;
}

// POST /api/chat
app.post('/api/chat', async (req, res) => {
  if (rateLimit(req, res)) return;

  const { message } = req.body;
  if (!message || typeof message !== 'string' || message.length > 2000) {
    return res.status(400).json({ error: 'Invalid message.' });
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: message,
      config: {
        systemInstruction: `You are the Aegis AI Assistant, an expert in AI-driven health and safety solutions. 
          Your goal is to help users understand Aegis AI & Safety's services and AI implementation strategies.
          
          Key Knowledge:
          - Services: H&S Applications (Incident Reporting, Compliance Tracking, Audit Automation), AI Implementation (Computer Vision, Predictive Analytics, NLP), Lifecycle Management (Strategy, Design, Deployment, Optimization).
          - New Feature: AI-Driven Risk Assessment (Predictive analysis of hazards and mitigation strategies based on user input).
          - New Feature: Personalized Safety Training (AI-generated training modules with interactive quizzes and progress tracking).
          - Research: Rooted in IEEE research (IEEE 7000, 7001, 2846) for transparency and ethical AI.
          - Industry Focus: Mining, Construction, Logistics, and Healthcare.
          - Tone: Professional, authoritative, helpful, and safety-focused.
          - Location: Based in Sudbury, Ontario, Canada.
          
          Always prioritize safety and ethical AI implementation in your answers. If you don't know something specific about a user's company, offer to connect them with a human safety expert via the contact form.`,
      },
    });

    res.json({ text: response.text || "I'm sorry, I couldn't process that request." });
  } catch (err) {
    console.error('Chat API error:', err);
    res.status(500).json({ error: 'Failed to generate response.' });
  }
});

// POST /api/risk-assessment
app.post('/api/risk-assessment', async (req, res) => {
  if (rateLimit(req, res)) return;

  const { taskDescription, industry } = req.body;
  if (!taskDescription || typeof taskDescription !== 'string' || taskDescription.length > 5000) {
    return res.status(400).json({ error: 'Invalid task description.' });
  }
  if (!industry || typeof industry !== 'string') {
    return res.status(400).json({ error: 'Invalid industry.' });
  }

  const prompt = `Perform a comprehensive health and safety risk assessment for the following task in the ${industry} industry:
      
      Task/Workplace Description: ${taskDescription}
      
      Please provide the report in a structured JSON format with the following keys:
      - "summary": A brief overview of the risk level.
      - "hazards": An array of objects, each with "type" (e.g., Physical, Chemical, Biological), "description", "severity" (Low, Medium, High), and "immediate_action" (only for High severity hazards, otherwise null).
      - "mitigations": An array of specific, actionable mitigation strategies.
      - "ppe_requirements": A list of required Personal Protective Equipment.
      - "regulatory_notes": Any relevant IEEE or safety standards that apply.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING },
            hazards: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  type: { type: Type.STRING },
                  description: { type: Type.STRING },
                  severity: { type: Type.STRING, enum: ['Low', 'Medium', 'High'] },
                  immediate_action: { type: Type.STRING, nullable: true },
                },
                required: ['type', 'description', 'severity'],
              },
            },
            mitigations: { type: Type.ARRAY, items: { type: Type.STRING } },
            ppe_requirements: { type: Type.ARRAY, items: { type: Type.STRING } },
            regulatory_notes: { type: Type.STRING },
          },
          required: ['summary', 'hazards', 'mitigations', 'ppe_requirements', 'regulatory_notes'],
        },
      },
    });

    const result = JSON.parse(response.text || '{}');
    res.json(result);
  } catch (err) {
    console.error('Risk Assessment API error:', err);
    res.status(500).json({ error: 'Failed to generate risk assessment.' });
  }
});

// POST /api/training
app.post('/api/training', async (req, res) => {
  if (rateLimit(req, res)) return;

  const { role, industry, risks } = req.body;
  if (!role || typeof role !== 'string' || role.length > 200) {
    return res.status(400).json({ error: 'Invalid role.' });
  }
  if (!industry || typeof industry !== 'string') {
    return res.status(400).json({ error: 'Invalid industry.' });
  }
  if (!risks || typeof risks !== 'string' || risks.length > 5000) {
    return res.status(400).json({ error: 'Invalid risks description.' });
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a personalized safety training module for a ${role} in the ${industry} industry. 
        Focus on these identified risks: ${risks}. 
        The module should be professional, engaging, and highly practical.`,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            objectives: { type: Type.ARRAY, items: { type: Type.STRING } },
            sections: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  content: { type: Type.STRING },
                },
                required: ['title', 'content'],
              },
            },
            quiz: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  question: { type: Type.STRING },
                  options: { type: Type.ARRAY, items: { type: Type.STRING } },
                  correctAnswer: { type: Type.INTEGER },
                  explanation: { type: Type.STRING },
                },
                required: ['question', 'options', 'correctAnswer', 'explanation'],
              },
            },
          },
          required: ['title', 'objectives', 'sections', 'quiz'],
        },
      },
    });

    const data = JSON.parse(response.text || '{}');
    res.json(data);
  } catch (err) {
    console.error('Training API error:', err);
    res.status(500).json({ error: 'Failed to generate training module.' });
  }
});

const PORT = process.env.API_PORT || 3001;
app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});
