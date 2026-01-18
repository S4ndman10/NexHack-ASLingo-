import json
import requests

# Load ASL data
with open("data/asl_samples-2.json", "r") as f:
    data = json.load(f)

# Pick a sample
sample = data[10]

response = requests.post(
    "http://127.0.0.1:5000/predict",
    json={"vec": sample["vec"]}
)

print("True label:", sample["label"])
print("Server response:", response.json())
