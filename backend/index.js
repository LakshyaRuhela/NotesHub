import express from "express";
import dotenv from "dotenv";
import connectDb from "./utils/connectDB.js";
import authRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();
// connecting with frontend
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  }),
);
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.json({ messgage: "NotesHub backend running" });
});

// routers
app.use("/api/auth", authRouter);

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
  connectDb(); // connect DB
});
