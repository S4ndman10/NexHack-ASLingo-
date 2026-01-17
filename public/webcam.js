async function startWebcam() {
  const video = document.getElementById("webcam");
  const canvas = document.getElementById("overlay");

  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "user" },
      audio: false
    });

    video.srcObject = stream;

    video.onloadedmetadata = () => {
      video.play();
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
    };

  } catch (err) {
    console.error("Webcam error:", err);
    alert("Could not access webcam");
  }
}

startWebcam();
