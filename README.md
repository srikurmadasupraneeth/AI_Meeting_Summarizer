# 🤖 AI Meeting Summarizer

This is a full-stack web application that leverages a large language model to summarize meeting transcripts and share the results via email. It's built with a simple, functional design, focusing on core features: summarizing, editing, and sharing.

## ✨ Features

  - **Summarize Transcripts**: Upload a `.txt` file or paste raw text from meeting notes or call transcripts.
  - **Custom AI Instructions**: Guide the AI's output with a custom prompt, such as "Highlight action items" or "Summarize for executives in bullet points."
  - **Editable Summaries**: The generated summary is fully editable.
  - **Email Sharing**: Send the final, edited summary to one or more recipients directly from the application.
  - **Flexible AI Backend**: Easily switch between **Groq** (default) and **OpenAI** by changing an environment variable.
  - **Markdown Rendering**: The AI-generated summaries are automatically formatted with headings, lists, and bold text for easy readability.

## ⚙️ Tech Stack

### **Backend**

  - **Node.js**: The runtime environment for the server.
  - **Express.js**: A minimalist web framework used to build the REST API.
  - **Groq SDK** or **Node-fetch**: For making API calls to the chosen LLM.
  - **Nodemailer**: Handles sending emails via an SMTP service.
  - **dotenv**: Manages environment variables for secure API keys and credentials.
  - **marked**: A Markdown parser to convert the AI's response into HTML.

### **Frontend**

  - **HTML5 & CSS3**: The basic structure and styling of the user interface.
  - **Bootstrap 5**: Provides a clean, responsive, and functional layout without extensive custom CSS.
  - **JavaScript (Vanilla)**: Handles all client-side logic, including API calls and DOM manipulation.

## 🚀 Getting Started

Follow these steps to set up and run the application locally.

### Prerequisites

  - **Node.js**: Ensure you have a recent version installed (Node.js 18 or higher is recommended).
  - **API Key**: You'll need an API key from either [Groq](https://console.groq.com/keys) or [OpenAI](https://platform.openai.com/api-keys).
  - **SMTP Credentials**: To enable the email feature, you'll need SMTP credentials from a provider like Brevo (Sendinblue), Gmail, Mailgun, etc.

### Installation

1.  **Clone the repository:**

    ```bash
    https://github.com/srikurmadasupraneeth/AI_Meeting_Summarizer
    cd ai-meeting-summarizer
    ```

2.  **Install the dependencies:**

    ```bash
    npm install
    ```

### Configuration

1.  **Create a `.env` file** in the root directory.

    ```bash
    touch .env
    ```

2.  **Add the following variables** to your `.env` file, replacing the placeholder values with your actual credentials.

    ```
    # To use Groq (Recommended for speed)
    USE_GROQ=1
    GROQ_API_KEY="your_groq_api_key_here"
    GROQ_MODEL="llama3-8b-8192"

    # To use OpenAI instead, comment out the Groq variables above and uncomment these
    # USE_GROQ=0
    # OPENAI_API_KEY="your_openai_api_key_here"
    # OPENAI_MODEL="gpt-4o-mini"

    # SMTP Credentials for Email Sharing
    # Example using Brevo (Sendinblue)
    SMTP_HOST="smtp-relay.brevo.com"
    SMTP_PORT=587
    SMTP_USER="your-brevo-username"
    SMTP_PASS="your-brevo-api-key"
    SMTP_FROM="your-verified-sender-email@example.com"
    ```

### Running the Application

  - **Development Mode**: Uses `nodemon` to automatically restart the server on file changes.

    ```bash
    npm run dev
    ```

  - **Production Mode**: Starts the server normally.

    ```bash
    npm start
    ```

The application will be accessible at `https://ai-meeting-summarizer-puzi.onrender.com/`.

## 📸 Screenshots
<img width="1470" height="956" alt="Screenshot 2025-08-17 at 7 52 23 AM" src="https://github.com/user-attachments/assets/a299368b-b1c4-4249-99cf-4de45534f2cf" />
<img width="1470" height="956" alt="Screenshot 2025-08-17 at 7 52 33 AM" src="https://github.com/user-attachments/assets/83507880-24a9-46c8-881b-5febc0f05a18" />
<img width="1470" height="956" alt="Screenshot 2025-08-17 at 7 52 51 AM" src="https://github.com/user-attachments/assets/f81305dd-b0dc-4e12-9788-9e674ea581f9" />
<img width="1470" height="956" alt="Screenshot 2025-08-17 at 7 52 58 AM" src="https://github.com/user-attachments/assets/656b419a-c6a5-48ee-a650-98fa48bdf342" />
<img width="1470" height="956" alt="Screenshot 2025-08-17 at 7 53 32 AM" src="https://github.com/user-attachments/assets/f7a2ccca-fcce-4003-8f06-49366f209bf5" />



## 📝 Project Structure

  - `api/`: Contains the backend Node.js and Express server logic.
      - `index.js`: The main server file.
  - `public/`: Holds all static frontend files.
      - `index.html`: The main user interface.
      - Other assets like CSS and JavaScript files (if any).
  - `.env`: Your environment variables (should be kept private).
  - `package.json`: Lists all project dependencies and scripts.
  - `README.md`: This documentation file.

-----

### **Author**

*Srikurmadasu Praneeth.*
