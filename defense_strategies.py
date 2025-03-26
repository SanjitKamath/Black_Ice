import numpy as np
import tensorflow as tf
from tensorflow.keras.models import load_model, clone_model
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Dropout
from tensorflow.keras.optimizers import Adam
from sklearn.preprocessing import StandardScaler
import os

# Enable eager execution to avoid .numpy() errors
tf.config.run_functions_eagerly(True)

# Define paths
original_model_path = "malware_classifier.h5"
defended_model_path = "malware_classifier_defended.h5"

# Generate synthetic dataset
def load_malware_dataset():
    num_samples = 1500
    num_features = 33  # Modify based on malware feature vector size
    x_data = np.random.rand(num_samples, num_features).astype(np.float32)
    y_data = np.random.randint(0, 2, size=(num_samples, 1))  # Ensure correct shape
    return x_data, y_data

x_train, y_train = load_malware_dataset()
x_test, y_test = load_malware_dataset()

# Normalize input features
scaler = StandardScaler()
x_train = scaler.fit_transform(x_train)
x_test = scaler.transform(x_test)

# Create a simple neural network for malware classification
def create_malware_model(input_shape):
    model = Sequential([
        Dense(64, activation='relu', input_shape=(input_shape,)),
        Dropout(0.3),
        Dense(32, activation='relu'),
        Dropout(0.2),
        Dense(1, activation='sigmoid')
    ])
    model.compile(optimizer=Adam(learning_rate=0.001), loss='binary_crossentropy', metrics=['accuracy'])
    return model

# Train and save the model
model = create_malware_model(x_train.shape[1])
model.fit(x_train, y_train, epochs=5, batch_size=16, validation_split=0.2, verbose=1)
model.save(original_model_path)

# Load the trained model
model = load_model(original_model_path)

# Adversarial Training
def adversarial_training(x_train, y_train):
    def create_adversarial_pattern(input_image, input_label):
        with tf.GradientTape() as tape:
            tape.watch(input_image)
            prediction = model(input_image, training=False)
            loss = tf.keras.losses.binary_crossentropy(tf.reshape(input_label, (-1, 1)), prediction)
        gradient = tape.gradient(loss, input_image)
        signed_grad = tf.sign(gradient)
        return signed_grad

    # Convert inputs to tensors
    x_train = tf.convert_to_tensor(x_train, dtype=tf.float32)
    y_train = tf.convert_to_tensor(y_train, dtype=tf.float32)
    y_train = tf.reshape(y_train, (-1, 1))  # Ensure correct shape

    adversarial_noise = create_adversarial_pattern(x_train, y_train)
    x_train_adversarial = x_train + 0.1 * adversarial_noise

    # Convert tensors to NumPy before fitting
    model.fit(x_train_adversarial.numpy(), y_train.numpy(), epochs=5, verbose=1)
    model.save(defended_model_path)
    print("\nAdversarial Training Complete.")

# Feature Squeezing (Reduce precision to remove small perturbations)
def feature_squeeze(x):
    return np.round(x, decimals=2)

# Generate adversarial examples using FGSM
def generate_adversarial_examples(model, x_data, y_data, epsilon=10.0):
    x_data = tf.convert_to_tensor(x_data, dtype=tf.float32)
    y_data = tf.reshape(tf.convert_to_tensor(y_data, dtype=tf.float32), (-1, 1))

    with tf.GradientTape() as tape:
        tape.watch(x_data)
        predictions = model(x_data)
        loss = tf.keras.losses.binary_crossentropy(y_data, predictions)

    gradient = tape.gradient(loss, x_data)
    signed_grad = tf.sign(gradient)
    x_adv = x_data + epsilon * signed_grad
    x_adv = tf.clip_by_value(x_adv, 0, 1)
    return x_adv.numpy()

# Generate adversarial samples
x_test_adv = generate_adversarial_examples(model, x_test, y_test)
x_test_adv_squeezed = feature_squeeze(x_test_adv)

# Evaluate models
original_acc = model.evaluate(x_test, y_test, verbose=0)[1]
original_adv_acc = model.evaluate(x_test_adv, y_test, verbose=0)[1]
original_squeezed_acc = model.evaluate(feature_squeeze(x_test), y_test, verbose=0)[1]

defended_model = None
if os.path.exists(defended_model_path):
    defended_model = load_model(defended_model_path)
    defended_acc = defended_model.evaluate(x_test, y_test, verbose=0)[1]
    defended_adv_acc = defended_model.evaluate(x_test_adv, y_test, verbose=0)[1]
else:
    print("Warning: Defended model not found. The system will run without adversarial defense.")

# Print comparison results
print("\n**Model Performance Comparison**")
print(f"Original Model Accuracy (Clean Data): {original_acc:.4f}")
print(f"Original Model Accuracy (Adversarial Data): {original_adv_acc:.4f} 🚨 (Drop due to attack)")
print(f"Original Model Accuracy (Feature Squeezed): {original_squeezed_acc:.4f}")

if defended_model:
    print(f"Defended Model Accuracy (Clean Data): {defended_acc:.4f}")
    print(f"Defended Model Accuracy (Adversarial Data): {defended_adv_acc:.4f}")
    adv_improvement = defended_adv_acc - original_adv_acc
    print(f"\nImprovement in Adversarial Accuracy: {adv_improvement:.4f}")

print("=================================================================================================================================")

if defended_model:
    y_pred_original = (model.predict(x_test_adv) > 0.5).astype(int).flatten()
    y_pred_defended = (defended_model.predict(x_test_adv) > 0.5).astype(int).flatten()

    adversarial_failures = np.sum(y_pred_original != y_test.flatten())  # Misclassifications by original model
    adversarial_corrections = np.sum((y_pred_original != y_test.flatten()) & (y_pred_defended == y_test.flatten()))  # Corrected by defended model

    print(f"\nNumber of adversarial failures (original model): {adversarial_failures}")
    print(f"Number of adversarial corrections (defended model): {adversarial_corrections}")
    correction_rate = adversarial_corrections / adversarial_failures if adversarial_failures > 0 else 0
    print(f"Correction Rate: {correction_rate:.4f}")

print("Defense strategies module loaded and ready.")
