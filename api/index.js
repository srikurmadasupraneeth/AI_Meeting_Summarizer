import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";
import nodemailer from "nodemailer";
import { marked } from "marked";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// --- AI Config ---
const USE_GROQ = process.env.USE_GROQ === "1";
const GROQ_API_KEY = process.env.GROQ_API_KEY || "";
const OPENAI_API_KEY = process.env.OPENAI_API_KEY || "";
const API_KEY = USE_GROQ ? GROQ_API_KEY : OPENAI_API_KEY;
const GROQ_MODEL = process.env.GROQ_MODEL || "llama3-8b-8192";
const OPENAI_MODEL = process.env.OPENAI_MODEL || "gpt-4o-mini";
const MODEL = USE_GROQ ? GROQ_MODEL : OPENAI_MODEL;
const API_URL = USE_GROQ
  ? "https://api.groq.com/openai/v1/chat/completions"
  : "https://api.openai.com/v1/chat/completions";

// SMTP Config
const SMTP_HOST = process.env.SMTP_HOST || "";
const SMTP_PORT = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : 587;
const SMTP_USER = process.env.SMTP_USER || "";
const SMTP_PASS = process.env.SMTP_PASS || "";
const SMTP_FROM = process.env.SMTP_FROM || SMTP_USER || "no-reply@example.com";

async function summarizeWithAI(
  transcript,
  instruction = "Provide a concise bullet-point summary and list action items."
) {
  const system = `You are an expert meeting notes assistant. Given a raw transcript and a user instruction, produce a clean, structured summary. Use clear headings, bullet points, and include an 'Action Items' section when applicable. Be faithful to the transcript. Keep it crisp and skimmable.`;
  const user = `Instruction:\n${instruction}\n\nTranscript:\n${transcript}`;
  const payload = {
    model: MODEL,
    messages: [
      { role: "system", content: system },
      { role: "user", content: user },
    ],
    temperature: 0.2,
    max_tokens: 1500,
  };
  const resp = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify(payload),
  });
  if (!resp.ok) throw new Error(`AI API error: ${resp.status}`);
  const data = await resp.json();
  return data.choices?.[0]?.message?.content || "";
}

// Routes
app.post("/api/summarize", async (req, res) => {
  try {
    const { transcript, instruction } = req.body || {};
    if (
      !transcript ||
      typeof transcript !== "string" ||
      transcript.trim().length === 0
    ) {
      return res.status(400).json({ error: "Transcript is required." });
    }
    const summary = await summarizeWithAI(transcript, instruction || "");
    res.json({ summary });
  } catch (err) {
    res.status(500).json({ error: err.message || "Summarization failed." });
  }
});

app.post("/api/email", async (req, res) => {
  try {
    const { recipients, subject, body } = req.body || {};
    if (!recipients || !Array.isArray(recipients) || recipients.length === 0) {
      return res
        .status(400)
        .json({ error: "At least one recipient is required." });
    }
    if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
      return res.status(500).json({ error: "SMTP not configured on server." });
    }
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_PORT === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });
    const info = await transporter.sendMail({
      from: SMTP_FROM,
      to: recipients.join(", "),
      subject: subject || "Meeting Summary",
      text: body,
      html: marked.parse(body),
    });
    res.json({ ok: true, info });
  } catch (err) {
    res.status(500).json({ error: err.message || "Email send failed." });
  }
});

// The Vercel handler
export default (req, res) => {
  req.url = req.url.replace(/^\/api\//, "/"); // a rewrite to handle Vercel's path structure
  app(req, res);
};
