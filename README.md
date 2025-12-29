# 🧠 MedDocAI — Backend

The MedDocAI backend powers the core intelligence of the application.  
It processes uploaded medical documents and generates **clear AI-based explanations** along with **professionally structured PDF reports**.

The system is built with a strong focus on **privacy, reliability, and scalability**.

---

## ⚙️ What This Backend Does

- 📄 Accepts medical document uploads (PDF, PNG, JPG)
- 🔍 Extracts text from digital PDFs
- 🧠 Uses OCR for scanned or handwritten documents
- 🤖 Generates structured AI explanations
- 📑 Creates multi-page, professional PDF reports
- 🔐 Processes files temporarily without permanent storage

---

## 🛠️ Tech Stack

- 🟢 Node.js
- 🚀 Express.js
- 📤 Multer (file uploads)
- 📄 pdf-parse (PDF text extraction)
- 🔤 Tesseract.js (OCR)
- 🤖 Groq AI API
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

## 🔐 Privacy First

* ❌ No user accounts
* ❌ No database storage
* ✅ Files processed temporarily
* ✅ Stateless request-based design

---

## 🧠 System Design Highlights

* 📄 Text-first extraction for digital PDFs
* 🔤 OCR fallback for scanned documents
* 🧩 Section-wise AI explanations
* 📑 Flow-based PDF rendering with auto pagination

This ensures the system works reliably for **short and long documents**.

---

## 👨‍💻 Developer

Shashwat Singh

---

## ⚠️ Disclaimer

This backend generates AI-based explanations for educational and informational purposes only and does not provide medical advice or diagnosis.


Just tell me what’s next.
```
