import pandas as pd
import numpy as np
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
import joblib
import matplotlib.pyplot as plt

# Load dataset
file_path = "./malware_dataset.csv"
data = pd.read_csv(file_path)

# Encode labels: malware -> 1, benign -> 0
data['classification'] = data['classification'].str.strip().str.lower()
y = data['classification'].apply(lambda x: 1 if x == 'malware' else 0).values

# Drop label & non-feature columns (keep only numeric features)
X = data.drop(columns=['hash', 'classification'])
X = X.select_dtypes(include=[np.number])  # Keep only numeric columns

# Check if there are features left
if X.shape[1] == 0:
    raise ValueError("No numeric features found after dropping label/id columns!")

# Normalize features
scaler = StandardScaler()
X = scaler.fit_transform(X)

# Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Class weights for imbalance
class_weights = {
    0: len(y_train) / (2 * np.sum(y_train == 0)),
    1: len(y_train) / (2 * np.sum(y_train == 1))
}

# Build model
model = Sequential([
    Dense(128, activation='relu', input_shape=(X_train.shape[1],)),
    Dense(64, activation='relu'),
    Dense(32, activation='relu'),
    Dense(1, activation='sigmoid')
])
model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])

# Train
history = model.fit(
    X_train, y_train,
    epochs=10,
    batch_size=256,
    validation_data=(X_test, y_test),
    class_weight=class_weights
)

# Save model & scaler
model.save("./malware_classifier_pe_only.keras")
joblib.dump(scaler, "./scaler_pe_only.save")

# Evaluate
loss, accuracy = model.evaluate(X_test, y_test)
print(f"✅ Test Accuracy: {accuracy:.4f}")

# Plot accuracy
plt.figure(figsize=(8, 4))
plt.plot(history.history['accuracy'], label='Train Accuracy')
plt.plot(history.history['val_accuracy'], label='Validation Accuracy')
plt.legend()
plt.title('Model Accuracy')
plt.show()

# Plot loss
plt.figure(figsize=(8, 4))
plt.plot(history.history['loss'], label='Train Loss', color='red')
plt.plot(history.history['val_loss'], label='Validation Loss', color='green')
plt.legend()
plt.title('Model Loss')
plt.show()
