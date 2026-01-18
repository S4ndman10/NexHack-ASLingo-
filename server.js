import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.static("public"));

// Automatically pick a free port if 3000 is busy
const PORT = process.env.PORT || 3000;

const server = app.listen(PORT)
  .on("listening", () => {
    console.log(`Server running at http://localhost:${server.address().port}`);
  })
  .on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      console.warn(`Port ${PORT} in use, trying random free port...`);
      const fallbackServer = app.listen(0, () => {
        console.log(`Server running at http://localhost:${fallbackServer.address().port}`);
      });
    } else {
      console.error("Server error:", err);
    }
  });
