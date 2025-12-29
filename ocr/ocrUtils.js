import Tesseract from "tesseract.js";
import fs from "fs";
import path from "path";
import pdfPoppler from "pdf-poppler";

// --------------------------------------------------
// PDF → Images (via pdf-poppler, Windows safe)
// --------------------------------------------------
export const pdfToImages = async (pdfPath, outputDir) => {
  fs.mkdirSync(outputDir, { recursive: true });

  const options = {
    format: "png",
    out_dir: outputDir,
    out_prefix: "page",
    page: null,
    dpi: 300
};

  await pdfPoppler.convert(pdfPath, options);
};

// --------------------------------------------------
// OCR images → text
// --------------------------------------------------
export const runOCR = async (imageDir) => {
  const files = fs.readdirSync(imageDir).filter(f => f.endsWith(".png"));

  let fullText = "";

  for (const file of files) {
    const imagePath = path.join(imageDir, file);

    const result = await Tesseract.recognize(
      imagePath,
      "eng",
      { logger: m => console.log(m.status) }
    );

    fullText += result.data.text + "\n";
  }

  return fullText;
};
