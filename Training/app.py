from flask import Flask, request, jsonify, send_from_directory
import numpy as np
import joblib

# 1️⃣ Create app FIRST
app = Flask(__name__)

# 2️⃣ Load model + encoder
model = joblib.load("models/asl_model.joblib")
label_encoder = joblib.load("models/label_encoder.joblib")

# 3️⃣ Routes AFTER app exists
@app.route("/")
def index():
    return send_from_directory(".", "index1.html")

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json

    if not data or "vec" not in data:
        return jsonify({"error": "Missing vec"}), 400

    vec = np.array(data["vec"]).reshape(1, -1)

    pred = model.predict(vec)[0]
    label = label_encoder.inverse_transform([pred])[0]

    return jsonify({"prediction": label})

if __name__ == "__main__":
    import threading
    import time
    import webbrowser

    def open_browser():
        time.sleep(1)
        webbrowser.open("http://127.0.0.1:5000/")

    threading.Thread(target=open_browser, daemon=True).start()
    app.run(debug=False, use_reloader=False)
