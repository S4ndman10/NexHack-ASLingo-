import json
import numpy as np
import joblib

from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score

# Load ASL samples
with open("data/asl_samples-2.json", "r") as f:
    data = json.load(f)

# Build X and y
X = []
y = []

for sample in data:
    X.append(sample["vec"])
    y.append(sample["label"])

X = np.array(X)
y = np.array(y)

# Encode labels
label_encoder = LabelEncoder()
y_encoded = label_encoder.fit_transform(y)

# Train / test split
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y_encoded,
    test_size=0.2,
    random_state=42,
    stratify=y_encoded
)

# Train model
model = LogisticRegression(max_iter=5000)
model.fit(X_train, y_train)

# Evaluate
y_pred = model.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
print("Test accuracy:", accuracy)

# Save model + encoder
joblib.dump(model, "models/asl_model.joblib")
joblib.dump(label_encoder, "models/label_encoder.joblib")

print("Model saved to models/")
