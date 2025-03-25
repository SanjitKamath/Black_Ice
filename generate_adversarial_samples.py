import numpy as np
import tensorflow as tf
import pandas as pd
from tensorflow.keras.models import load_model
from sklearn.preprocessing import StandardScaler

# Load the trained malware classifier
model = load_model("malware_classifier.h5")

# Check expected input shape
expected_features = model.input_shape[-1]  # Expected number of features

# Binary cross-entropy loss (since it's a binary classifier)
loss_object = tf.keras.losses.BinaryCrossentropy()

#Uses FGSM (Fast Gradient Sign Method) to generate an adversarial example
def create_adversarial_pattern(input_data, input_label):
    input_data = tf.Variable(input_data, dtype=tf.float32)  # Convert to TensorFlow variable
    input_label = tf.convert_to_tensor(input_label, dtype=tf.float32)

    with tf.GradientTape() as tape:
        tape.watch(input_data)
        prediction = model(input_data, training=False)
        loss = loss_object(input_label, prediction)

    # Compute gradients and perturb input
    gradient = tape.gradient(loss, input_data)
    signed_grad = tf.sign(gradient)

    print(f"Gradient range: min={gradient.numpy().min()}, max={gradient.numpy().max()}")  # Debugging
    return signed_grad.numpy()  # Convert back to NumPy for further processing

# Load malware dataset
data = pd.read_csv('malware_dataset.csv')

# Convert 'classific' column to numeric labels (1 for malware, 0 for benign)
data["classification"] = data["classification"].map({"malware": 1, "benign": 0})

# Drop non-numeric columns (e.g., 'hash' which is useless for ML)
data = data.drop(columns=["hash"], errors="ignore")

# Extract features and labels
X = data.drop(columns=["classification"]).values  # Features
y = data["classification"].values  # Labels

# Ensure feature count matches model input
if X.shape[1] != expected_features:
    print(f"⚠️ Feature count mismatch! Dataset has {X.shape[1]} features, but model expects {expected_features}.")
    X = X[:, :expected_features]  # Trim extra features (if needed)

# Check if malware samples exist
unique_labels, label_counts = np.unique(y, return_counts=True)
print("Unique labels in y:", unique_labels, "Counts:", label_counts)

if 1 not in unique_labels:
    print("❌ No malware samples found! Selecting a random sample instead.")
    test_idx = np.random.randint(0, len(X))
else:
    # Select a malware sample
    malware_indices = np.where(y == 1)[0]
    test_idx = malware_indices[0]  # Choose the first malware sample

print(f" Selected sample index: {test_idx}, Label: {y[test_idx]}")

# Normalize features using StandardScaler (same as training)
scaler = StandardScaler()
X = scaler.fit_transform(X)

# Select test sample and correct label
test_sample = np.expand_dims(X[test_idx], axis=0).astype(np.float32)
test_label = np.array([[y[test_idx]]], dtype=np.float32)  # Format for loss function

#Generates an adversarial example by adding the perturbation scaled by epsilon
# Test with different epsilon values
epsilon_values = [10.0]
for epsilon in epsilon_values:
    perturbation = create_adversarial_pattern(test_sample, test_label)
    adversarial_example = test_sample + epsilon * perturbation
    adversarial_example = np.clip(adversarial_example, -1, 1)  # Keep values valid

    # Make predictions
    original_prediction = (model.predict(test_sample) > 0.5).astype(int)
    adversarial_prediction = (model.predict(adversarial_example) > 0.5).astype(int)

    print("====================================================================================================")
    print(f"Epsilon: {epsilon}")
    print("Adversarial Attack Results:")
    print(f"Original Prediction: {original_prediction[0][0]} (Correct Label: {test_label[0][0]})")
    print(f"After Attack Prediction: {adversarial_prediction[0][0]}")
    # Prediction value 1 indicates a malware file, while 0 indicates a benign (non-malicious) file.
    print("====================================================================================================\n")
