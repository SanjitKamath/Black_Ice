import numpy as np
import pandas as pd
import tensorflow as tf
import joblib
from sklearn.model_selection import train_test_split
from pgd_attack import pgd_attack  # custom PGD attack script

# Load defended model & scaler
# For now, we use the same model as in training — replace with defended model if available
defended_model = tf.keras.models.load_model("./malware_classifier_pe_only.keras")
scaler = joblib.load("./scaler_pe_only.save")

# Load dataset
file_path = "./malware_dataset.csv"
data = pd.read_csv(file_path)

# Encode labels: malware → 1, benign → 0
data['classification'] = data['classification'].str.strip().str.lower()
y = data['classification'].apply(lambda x: 1 if x == 'malware' else 0).values

# Select numeric features
X = data.drop(columns=['hash', 'classification'])
X = X.select_dtypes(include=[np.number])
X = scaler.transform(X)

# Test set
_, X_test, _, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Feature squeezing
def feature_squeeze(sample, precision=2):
    return np.round(sample, decimals=precision)

# Pick a malware sample
for i in range(len(X_test)):
    if y_test[i] == 1:
        test_sample = X_test[i]
        label = y_test[i]
        break

# Attack
adv_sample = pgd_attack(defended_model, test_sample, label)
squeezed_adv = feature_squeeze(adv_sample)

# Predictions
original_pred = defended_model.predict(test_sample[np.newaxis])[0][0]
adv_pred = defended_model.predict(squeezed_adv[np.newaxis])[0][0]

print(f"🛡 Original Prediction: {original_pred:.4f} → {'Malware' if original_pred > 0.5 else 'Benign'}")
print(f"🛡 PGD + Feature Squeezing Prediction: {adv_pred:.4f} → {'Malware' if adv_pred > 0.5 else 'Benign'}")
