import Tesseract from "tesseract.js";

const run = async () => {
  const result = await Tesseract.recognize(
    "./test.png",
    "eng",
    {
      logger: m => console.log(m.status),
    }
  );

  console.log("OCR OUTPUT:");
  console.log(result.data.text);
};

run();
