import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

export function generateMedicalPDF({
  extractedText,
  aiExplanation,
  patientName,
  documentName,
}) {
  const fileName = `MedDocAI_Report_${Date.now()}.pdf`;
  const filePath = path.join("uploads", fileName);

  const doc = new PDFDocument({
    size: "A4",
    margin: 40,
  });

  doc.pipe(fs.createWriteStream(filePath));

  /* ================= WATERMARK (ISOLATED) ================= */
  doc.save(); // 🔒 isolate transform
  doc.opacity(0.06)
    .fontSize(70)
    .rotate(45, { origin: [300, 400] })
    .text("MedDocAI", 120, 350);
  doc.restore(); // 🔓 restore normal state

  /* ================= HEADER BAR ================= */
  doc
    .rect(0, 0, 595, 80)
    .fill("#1e3a8a");

  doc
    .fillColor("white")
    .fontSize(22)
    .text("MedDocAI – Medical Analysis Report", 0, 30, {
      align: "center",
    });

  let y = 110;
  doc.fillColor("black");

  /* ================= PATIENT INFO ================= */
  drawBox(doc, 40, y, 515, 120, "Patient Information");

  doc.fontSize(11);
  doc.text(`Patient Name : ${patientName}`, 60, y + 45);
  doc.text(`Document Name: ${documentName}`, 60, y + 65);
  doc.text(`Generated On : ${new Date().toLocaleString()}`, 60, y + 85);

  y += 160;

  /* ================= EXTRACTED TEXT ================= */
  drawBox(doc, 40, y, 515, 240, "Extracted Medical Findings");

  doc.fontSize(10).text(
    extractedText
      ? extractedText.replace(/OCR RESULT:/gi, "").trim()
      : "No readable medical content found.",
    60,
    y + 45,
    {
      width: 475,
      lineGap: 4,
    }
  );

  /* ================= NEW PAGE ================= */
  doc.addPage();
  y = 40;

  /* ================= AI EXPLANATION ================= */
  drawBox(doc, 40, y, 515, 620, "AI-Based Explanation");

  doc.fontSize(11).text(
    aiExplanation || "No AI explanation available.",
    60,
    y + 45,
    {
      width: 475,
      lineGap: 5,
    }
  );

  /* ================= DISCLAIMER ================= */
  doc
    .fontSize(8)
    .fillColor("gray")
    .text(
      "Disclaimer: This report is generated using artificial intelligence for informational purposes only. It does not constitute medical advice, diagnosis, or treatment. MedDocAI and the developer assume no responsibility for decisions made based on this report.",
      40,
      770,
      {
        width: 515,
        align: "center",
      }
    );

  doc.end();
  return { fileName };
}

/* ================= HELPER FUNCTION ================= */
function drawBox(doc, x, y, w, h, title) {
  doc
    .lineWidth(1)
    .rect(x, y, w, h)
    .stroke();

  doc
    .rect(x, y, w, 30)
    .fill("#f1f5f9");

  doc
    .fillColor("#1e3a8a")
    .fontSize(13)
    .text(title, x + 12, y + 9);

  doc.fillColor("black");
}
