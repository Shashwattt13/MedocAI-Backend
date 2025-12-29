# 🧠 MedDocAI — Backend

The MedDocAI backend powers the core intelligence of the application.  
It processes uploaded medical documents and generates **clear, structured AI-based explanations** along with **professionally formatted PDF reports**.

The system is designed with a strong focus on **privacy, explainability, and real-world usability**.

---

## 🤖 AI at the Core (What Makes MedDocAI Different)

MedDocAI uses **Large Language Models (LLMs)** to transform raw medical text into **human-readable explanations**.

### 🔹 Which AI is Used?
- The backend integrates with **Groq-hosted LLMs**
- Models are optimized for **fast inference and long-text understanding**

### 🔹 How AI Is Used
AI is applied **after** text extraction and OCR:

1. Medical text is extracted from the document
2. OCR is used if the document is scanned or handwritten
3. The extracted text is sent to the AI model
4. The AI generates a **section-wise explanation** in plain language

### 🔹 What the AI Does (and Does NOT Do)

✅ Explains medical content in simple, educational terms  
✅ Structures explanations into numbered sections  
✅ Adds theoretical context for medical terms  
✅ Clearly states document limitations  

❌ Does NOT diagnose  
❌ Does NOT give treatment advice  
❌ Does NOT replace a healthcare professional  

This ensures the system is **ethically safe and medically responsible**.

---

## ⚙️ Core Backend Capabilities

- 📄 Accepts medical document uploads (PDF, PNG, JPG)
- 🔍 Extracts embedded text from digital PDFs
- 🔤 Uses OCR for scanned or handwritten documents
- 🤖 Generates AI explanations in plain language
- 📑 Creates multi-page, professional PDF reports
- 🔐 Processes files temporarily without permanent storage

---

## 🛠️ Tech Stack

- 🟢 Node.js
- 🚀 Express.js
- 📤 Multer (file uploads)
- 📄 pdf-parse (PDF text extraction)
- 🔤 Tesseract.js (OCR)
- 🤖 Groq AI API (LLM inference)
- 📑 PDFKit (PDF generation)

---

## 📂 Project Structure

```

meddocai-backend/
├── routes/
├── utils/
├── uploads/
├── server.js
└── package.json

```

---

## 🔐 Environment Setup

Create a `.env` file in the root directory:

```

GROQ_API_KEY=your_api_key_here
PORT=5000

````

⚠️ Do not commit the `.env` file to GitHub.

---

## 🚀 Run Locally

```bash
npm install
npm run dev
````

Backend will start at:

```
http://localhost:5000
```

---

## 📡 API Endpoint

### 🔎 Analyze Medical Documents

```
POST /api/analyze
```

**Request**

* `multipart/form-data`
* Field name: `documents`
* Supports up to 3 files per request

**Response**

* Extracted medical text
* AI-generated explanation
* Downloadable PDF report

---

## 🔐 Privacy First Design

* ❌ No user accounts
* ❌ No database storage
* ✅ Files processed temporarily
* ✅ Stateless request-based architecture

---

## 🧠 System Design Highlights

* 📄 Text-first extraction for digital PDFs
* 🔤 OCR fallback for scanned documents
* 🧩 Section-wise, explainable AI output
* 📑 Flow-based PDF rendering with automatic pagination

This ensures consistent behavior for **both short and long medical documents**.

---

## 👨‍💻 Developer

Shashwat Singh

---

## ⚠️ Disclaimer

This backend generates AI-based explanations for educational and informational purposes only and does not provide medical advice, diagnosis, or treatment.
