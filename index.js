import express from "express";
import { InferenceHTTPClient } from "@roboflow/inference-sdk/api";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.static("public"));

// WebRTC init endpoint
app.post("/api/init-webrtc", async (req, res) => {
  const { offer, wrtcParams } = req.body;

  const client = InferenceHTTPClient.init({
    apiKey: process.env.ROBOFLOW_API_KEY
  });

  try {
    const answer = await client.initializeWebrtcWorker({
      offer,
      workspaceName: wrtcParams.workspaceName,
      workflowId: wrtcParams.workflowId,
      config: {
        imageInputName: wrtcParams.imageInputName,
        streamOutputNames: wrtcParams.streamOutputNames,
        dataOutputNames: wrtcParams.dataOutputNames
      }
    });

    res.json(answer);
  } catch (err) {
    console.error("WebRTC init error:", err);
    res.status(500).send(err.message);
  }
});

// Start server
app.listen(3000, () => console.log("Server running at http://localhost:3000"));
