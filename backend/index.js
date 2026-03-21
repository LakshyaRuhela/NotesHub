import express from "express";
import dotenv from "dotenv";
import connectDb from "./utils/connectDb.js";
import authRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./routes/user.route.js";
import notesRouter from "./routes/generate.route.js";
import pdfRouter from "./routes/pdf.route.js";
import creditRouter from "./routes/credits.route.js";
import { stripeWebhook } from "./controllers/credits.controller.js";
dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

// webhook route as here as it want raw data not json data
app.post(
  "/api/credits/webhook",
  express.raw({ type: "application/json" }),
  stripeWebhook,
);

// connecting with frontend
app.use(
  cors({
    origin: "https://noteshub-ai-frontend-ck2g.onrender.com",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  }),
);

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.json({ messgage: "NotesHub backend running" });
});

// routers routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/notes", notesRouter);
app.use("/api/pdf", pdfRouter);
app.use("/api/credit", creditRouter);

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
  connectDb(); // connect DB
});
