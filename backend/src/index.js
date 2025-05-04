import express from "express";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("welcome to home page");
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
