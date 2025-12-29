import express from "express";
import fs from "fs";
import path from "path";

const router = express.Router();

router.get("/:fileName", (req, res) => {
  const fileName = req.params.fileName;
  const filePath = path.join(process.cwd(), "uploads", fileName);

  console.log("DOWNLOAD REQUEST:", fileName);

  if (!fs.existsSync(filePath)) {
    console.log("❌ FILE NOT FOUND:", filePath);
    return res.status(404).send("File not found");
  }

  console.log("✅ FILE FOUND — DOWNLOADING");

  res.download(filePath, fileName);
});

export default router;
