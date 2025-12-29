import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import pdfParse from "pdf-parse";

import { pdfToImages, runOCR } from "../ocr/ocrUtils.js";
import { analyzeMedicalText } from "../utils/groqAI.js";
import { generateMedicalPDF } from "../utils/pdfGenerator.js";

const router = express.Router();

const upload = multer({
  dest: "uploads/",
  limits: { files: 3 },
});

router.post("/", upload.any(), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false });
    }

    let finalText = "";

    for (const file of req.files) {
      const tempPath = file.path;
      const pdfPath = `${tempPath}.pdf`;

      fs.renameSync(tempPath, pdfPath);
      console.log("Processing PDF:", pdfPath);

      const buffer = fs.readFileSync(pdfPath);
      const parsed = await pdfParse(buffer);
      let extractedText = parsed.text?.trim();

      if (!extractedText) {
        console.log("No embedded text found → running OCR");

        const ocrDir = path.join(
          "uploads",
          `ocr_${Date.now()}_${Math.random().toString(36).slice(2)}`
        );

        await pdfToImages(pdfPath, ocrDir);
        extractedText = await runOCR(ocrDir);

        fs.rmSync(ocrDir, { recursive: true, force: true });
      }

      finalText += "\n\n" + extractedText;
      fs.unlinkSync(pdfPath);
    }

    const aiExplanation =
      finalText.length > 50 ? await analyzeMedicalText(finalText) : "";

    let patientName = "Not available";
    const match = finalText.match(/patient name[:\-]?\s*(.*)/i);
    if (match && match[1]) patientName = match[1].trim();

    const documentName = req.files[0]?.originalname || "Unknown";

    const { fileName } = generateMedicalPDF({
      extractedText: finalText,
      aiExplanation,
      patientName,
      documentName,
    });

    console.log("PDF GENERATED:", fileName);

    return res.json({
      success: true,
      extractedText: finalText,
      aiExplanation,
      pdfId: fileName,
    });

  } catch (err) {
    console.error("Analyze route error:", err);
    return res.status(500).json({ success: false });
  }
});

export default router;
