import { connectors, streams } from "@roboflow/inference-sdk";

// Grab video & canvas elements
const video = document.getElementById("video");
const canvas = document.getElementById("overlay");
const ctx = canvas.getContext("2d");

// Start webcam
async function startCamera() {
  const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
  video.srcObject = stream;

  // Wait for metadata so we know video dimensions
  await new Promise((resolve) => {
    video.onloadedmetadata = () => resolve();
  });

  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  startRoboflowStream();
}

// Connect webcam to Roboflow via your server proxy
async function startRoboflowStream() {
  // Proxy endpoint (server adds API key)
  const connector = connectors.withProxyUrl("/api/init-webrtc");

  // Your Roboflow workspace & workflow
  const wrtcParams = {
    workspaceName: "sign-language-igzel-nghdm",
    workflowId: "1",
    imageInputName: "image",
    streamOutputNames: [],
    dataOutputNames: ["predictions"]
  };

  // Start streaming
  const rfConnection = await streams.useStream(video, connector, {
    wrtcParams,
    onData: (data) => {
      // `data.predictions` contains keypoints / bounding boxes
      if (data.predictions) drawKeypoints(data.predictions);
    }
  });
}

// Draw keypoints overlay
function drawKeypoints(predictions) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  predictions.forEach((pred) => {
    if (!pred.x || !pred.y) return;
    const x = pred.x * canvas.width;
    const y = pred.y * canvas.height;

    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, 2 * Math.PI);
    ctx.fill();
  });
}

// Start everything
startCamera();
