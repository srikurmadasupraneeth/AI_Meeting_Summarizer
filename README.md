# AI Meeting Summarizer (Full-Stack Application)

This project is a full-stack **AI-powered meeting notes summarizer and sharer**.  
It allows users to paste or upload a transcript, generate a clean AI summary, edit it, and finally email the summary to multiple recipients.

---

## ✨ Why I Chose These Tools

- **Node.js + Express (Backend)**  
  Simple, lightweight, and perfect for serving a couple of JSON APIs (`/api/summarize` and `/api/email`).

- **Groq API (default AI)**  
  I used Groq because it’s extremely fast and cost-efficient. The app is switchable to OpenAI just by flipping `USE_GROQ` in `.env`.

- **Marked.js (Frontend)**  
  AI often returns in **Markdown** (bullet points, headings, lists). Raw text looked ugly.  
  → Marked converts Markdown into **formatted HTML**, so summaries look clear and easy to skim.

- **Nodemailer (Backend)**  
  Used for sending emails. I added Markdown → HTML conversion before sending, so recipients see proper formatting in their inbox.

- **Bootstrap 5**  
  I know React, but the project specifically asked to keep design **basic** and focus on **functionality**. I used plain HTML + Bootstrap to keep it clean, responsive, and not visually cluttered.

- **dotenv**  
  For safe environment variable management (API keys, SMTP credentials).

---

## ⚙️ How It Works (Step by Step)

1. **Transcript Input**

   - Paste transcript **or upload a `.txt` file**.
   - Add an optional instruction (e.g., “Summarize in bullet points for executives”).

2. **Generate Summary** (AI call)

   - App sends transcript + instruction → Groq/OpenAI → gets back neatly formatted Markdown summary.
   - Markdown is converted to HTML using **Marked.js**.

3. **Edit Summary**

   - Switch to edit mode, tweak text if needed.
   - Save to get nicely formatted version back.

4. **Share via Email**
   - Enter one or multiple recipients.
   - Email is sent using **Nodemailer**.
   - Both **plain text + HTML** versions are included so it looks correct across email clients.

---

## 💻 Tech Stack

- **Backend** → Node.js + Express.js
- **Frontend** → HTML, CSS, Bootstrap, Markdown rendering with Marked.js
- **AI Integration** → Groq API (`llama3`) or OpenAI (`gpt-4o-mini`)
- **Email** → Nodemailer over SMTP (Brevo used in my case)
- **Dev Tools** → dotenv, nodemon

---

## 🚀 Getting Started

### Prerequisites

- Node.js (>= 18)
- API key (Groq or OpenAI)
- SMTP credentials (Brevo, Gmail, SendGrid, etc.)

### Installation
