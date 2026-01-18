import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.static("public"));

// try port 3000, fallback to 0 (random free port)
const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${server.address().port}`);
});
