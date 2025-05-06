import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cookieParser())

app.get("/", (req, res) => {
  res.send("welcome to home page");
});

app.use("/api/v1/auth", authRoutes);

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
