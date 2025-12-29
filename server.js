import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import analyzeRoute from "./routes/analyzeRoute.js";
import downloadRoute from "./routes/downloadRoute.js";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use("/api/download", downloadRoute);

/* 🔴 REQUIRED FOR PDF DOWNLOAD */
app.use("/uploads", express.static("uploads"));

app.use("/api/analyze", analyzeRoute);

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});



