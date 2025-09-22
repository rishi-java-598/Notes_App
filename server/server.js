import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";
import noteRoutes from "./routes/noteRoutes.js";
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";
import cors from 'cors'
import path from 'path';
import { fileURLToPath } from 'url';


dotenv.config();

const app = express();
app.use(express.json());

app.use(cors());
app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "../client/dist"))); // CRA uses 'build'

// For any other route, send index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});


app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
