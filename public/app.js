// ====== APP.JS ======

// Get HTML elements
const video = document.getElementById("video");
const canvas = document.getElementById("overlay");
const ctx = canvas.getContext("2d");

// Replace with your publishable key from Roboflow
const PUBLISHABLE_KEY = "YOUR_PUBLISHABLE_KEY_HERE";

// Initialize Roboflow
const rf = new Roboflow({ apiKey: PUBLISHABLE_KEY });

// Start webcam
async function startCamera() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { width: 640, height: 480 },
      audio: false
    });

    video.srcObject = stream;
    await new Promise(resolve => (video.onloadedmetadata = resolve));

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    video.play();

    // Start inference once webcam is ready
    startRoboflow();
  } catch (err) {
    console.error("Webcam error:", err);
    alert("Cannot access webcam: " + err.message);
  }
}

// Load Roboflow model and start detection loop
async function startRoboflow() {
  try {
    const model = await rf.load({
      model: "sign-language-igzel-nghdm",
      version: 1
    });

    console.log("Roboflow model loaded!");

    const predictLoop = async () => {
      try {
        const predictions = await model.detect(video);

        drawPredictions(predictions);

        requestAnimationFrame(predictLoop);
      } catch (err) {
        console.error("Detection error:", err);
        requestAnimationFrame(predictLoop);
      }
    };

    predictLoop();
  } catch (err) {
    console.error("Roboflow load error:", err);
  }
}

// Draw keypoints and detected letters
function drawPredictions(predictions) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  let detectedLetter = null;

  predictions.forEach(pred => {
    // Draw keypoints if present
    if (pred.x !== undefined && pred.y !== undefined) {
      const x = pred.x * canvas.width;
      const y = pred.y * canvas.height;
      ctx.fillStyle = "red";
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, Math.PI * 2);
      ctx.fill();
    }

    // Grab class (letter) if present
    if (pred.class) detectedLetter = pred.class;
  });

  // Overlay detected letter
  if (detectedLetter) {
    ctx.fillStyle = "yellow";
    ctx.font = "48px sans-serif";
    ctx.fillText(detectedLetter, 20, 50);
  }
}

// Start everything
startCamera();
