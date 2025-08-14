import numpy as np
import pandas as pd
import tensorflow as tf
import joblib
from sklearn.model_selection import train_test_split
from sklearn.metrics import confusion_matrix, ConfusionMatrixDisplay
import matplotlib.pyplot as plt

# Load model & scaler
model = tf.keras.models.load_model("./malware_classifier_pe_only.keras")
scaler = joblib.load("./scaler_pe_only.save")

# Load dataset
file_path = "./malware_dataset.csv"
data = pd.read_csv(file_path)

# Encode labels
data['classification'] = data['classification'].str.strip().str.lower()
y = data['classification'].apply(lambda x: 1 if x == 'malware' else 0).values

# Select numeric features (same as train_model.py)
X = data.drop(columns=['hash', 'classification'])
X = X.select_dtypes(include=[np.number])
X = scaler.transform(X)

# Train/test split (same split ratio as training)
_, X_test, _, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Predictions
y_pred_probs = model.predict(X_test)
y_pred = (y_pred_probs >= 0.5).astype(int).flatten()

# Confusion Matrix
cm = confusion_matrix(y_test, y_pred)
disp = ConfusionMatrixDisplay(confusion_matrix=cm, display_labels=["Benign", "Malware"])
disp.plot(cmap=plt.cm.Blues)
plt.title("Malware Detection Confusion Matrix")
plt.show()
