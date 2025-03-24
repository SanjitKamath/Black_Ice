import numpy as np
import tensorflow as tf
import pandas as pd
from tensorflow.keras.models import load_model
from sklearn.preprocessing import StandardScaler

# Load the trained malware classifier
model = load_model("malware_classifier.h5")

# Binary cross-entropy loss (since it's a binary classifier)
loss_object = tf.keras.losses.BinaryCrossentropy()

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

# Load malware dataset (same dataset used in training)
data = pd.read_csv("malware_dataset.csv")

# Preprocessing (ensure it's the same as in training)
non_numeric_cols = [col for col in data.columns if data[col].dtype == 'object']
if non_numeric_cols:
    data = data.drop(columns=non_numeric_cols)

# Assume last column is the label (0 = benign, 1 = malware)
X = data.iloc[:, :-1].values
y = data.iloc[:, -1].values

# Normalize features using StandardScaler (same as training)
scaler = StandardScaler()
X = scaler.fit_transform(X)

# Select a test sample
test_sample = np.expand_dims(X[0], axis=0).astype(np.float32)
test_label = np.array([[y[0]]], dtype=np.float32)  # Must match loss function's format

# Test with different epsilon values
epsilon_values = [10.0]
for epsilon in epsilon_values:
    perturbation = create_adversarial_pattern(test_sample, test_label)
    adversarial_example = test_sample + epsilon * perturbation
    adversarial_example = np.clip(adversarial_example, -1, 1)  # Ensure values stay in a valid range

    # Make predictions
    original_prediction = (model.predict(test_sample) > 0.5).astype(int)
    adversarial_prediction = (model.predict(adversarial_example) > 0.5).astype(int)

    print("======================================================================================================================================================================================")
    print(f"Epsilon: {epsilon}")
    print("Adversarial Attack Results:")
    print(f"Original Prediction: {original_prediction[0][0]} (Correct Label: {test_label[0][0]})")
    print(f"After Attack Prediction: {adversarial_prediction[0][0]}")
    print("======================================================================================================================================================================================")
    print("\n")