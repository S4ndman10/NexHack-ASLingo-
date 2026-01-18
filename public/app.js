import { connectors, streams } from "@roboflow/inference-sdk";

const video = document.getElementById("video");
const canvas = document.getElementById("overlay");
const ctx = canvas.getContext("2d");

async function startCamera() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { width: 640, height: 480 },
      audio: false
    });

    video.srcObject = stream;

    await new Promise((resolve) => {
      video.onloadedmetadata = () => resolve();
    });

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    video.play();

    startRoboflowStream();
  } catch (err) {
    console.error("Webcam error:", err);
    alert("Cannot access webcam: " + err.message);
  }
}

async function startRoboflowStream() {
  // Connect via your backend proxy
  const connector = connectors.withProxyUrl("/api/init-webrtc");

  const wrtcParams = {
    workspaceName: "sign-language-igzel-nghdm",
    workflowId: "1",
    imageInputName: "image",
    streamOutputNames: [],
    dataOutputNames: ["predictions"]
  };

  await streams.useStream(video, connector, {
    wrtcParams,
    onData: (data) => {
      if (data.predictions) drawPredictions(data.predictions);
    }
  });
}

function drawPredictions(predictions) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  let detectedLetter = null;

  predictions.forEach((pred) => {
    if (pred.x !== undefined && pred.y !== undefined) {
      const x = pred.x * canvas.width;
      const y = pred.y * canvas.height;

      ctx.fillStyle = "red";
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, 2 * Math.PI);
      ctx.fill();
    }

    if (pred.class) detectedLetter = pred.class;
  });

  if (detectedLetter) {
    ctx.fillStyle = "yellow";
    ctx.font = "48px sans-serif";
    ctx.fillText(detectedLetter, 20, 50);
  }
}

// Start everything
startCamera();
