import express from "express";
import dotenv from "dotenv";
import "express-async-errors";
import notesRoutes from "./routes/notesRoutes.js";
import asyncNotesRoutes from "./routes/asyncNotesRoutes.js";
import { connectDB } from "../config/db.js";
import rateLimiter from "../middleware/rateLimiter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Load env variables

// Middleware
app.use(express.json());
app.use(rateLimiter); // ใช้ rateLimiter middleware

// Simple Custom Middleware
app.use((req, res, next) => {
  console.log(`Req method is: ${req.method} & URL is: ${req.url}`);
  next();
});

connectDB();

app.use("/api/notes", notesRoutes);
app.use("/api/async-notes", asyncNotesRoutes);

// 404 handler สำหรับดักจับเส้นทางที่ไม่ตรงกับ route ใดๆ
app.use("*", (req, res, next) => {
  const err = new Error(`Route ${req.originalUrl} not found`);
  err.status = 404;
  throw err;
});

// Error middleware: ฟังก์ชัน 4 พารามิเตอร์ (err, req, res, next) คือ global error handler
app.use((err, req, res, next) => {
  // ถ้า response ถูกส่งไปแล้ว ให้ใช้ default error handler ของ Express
  if (res.headersSent) {
    return next(err);
  }

  console.error("Unhandled error:", err);
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal server error";
  res.status(status).json({ message });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
