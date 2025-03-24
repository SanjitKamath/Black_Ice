import numpy as np
import tensorflow as tf
from tensorflow.keras.models import load_model, clone_model

# Load the trained model
model = load_model("malware_classifier.h5")

# Adversarial Training
def adversarial_training(x_train, y_train):
    def create_adversarial_pattern(input_image, input_label):
        with tf.GradientTape() as tape:
            tape.watch(input_image)
            prediction = model(input_image)
            loss = tf.keras.losses.sparse_categorical_crossentropy(input_label, prediction)
        gradient = tape.gradient(loss, input_image)
        signed_grad = tf.sign(gradient)
        return signed_grad
    
    x_train_adversarial = x_train + 0.1 * create_adversarial_pattern(x_train, y_train)
    history = model.fit(x_train_adversarial, y_train, epochs=5, verbose=1)
    model.save("malware_classifier_defended.h5")
    print("\nAdversarial Training Complete.")
    print(f"Final Training Accuracy: {history.history['accuracy'][-1]:.4f}")

# Feature Squeezing
def feature_squeeze(input_image):
    return tf.round(input_image * 255) / 255

# Ensemble Learning
def ensemble_learning(x_train, y_train):
    model_2 = clone_model(model)
    model_2.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])
    history_2 = model_2.fit(x_train, y_train, epochs=5, verbose=1)
    models = [model, model_2]
    
    def ensemble_predict(models, input_data):
        predictions = [m.predict(input_data) for m in models]
        return np.mean(predictions, axis=0).argmax()
    
    print("\nEnsemble Learning Complete.")
    print(f"Model 2 Final Training Accuracy: {history_2.history['accuracy'][-1]:.4f}")
    return models

print("Defense strategies module loaded and ready.")
