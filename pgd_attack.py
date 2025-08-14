import numpy as np
import tensorflow as tf

loss_object = tf.keras.losses.BinaryCrossentropy()

def pgd_attack(model, input_data, input_label, epsilon=0.3, alpha=0.01, num_iter=40):
    """
    Projected Gradient Descent (PGD) attack for adversarial sample generation.
    """
    adv_example = tf.convert_to_tensor(input_data[np.newaxis], dtype=tf.float32)
    input_label = tf.convert_to_tensor([[input_label]], dtype=tf.float32)

    for _ in range(num_iter):
        with tf.GradientTape() as tape:
            tape.watch(adv_example)
            prediction = model(adv_example)
            loss = loss_object(input_label, prediction)

        gradient = tape.gradient(loss, adv_example)
        perturbation = alpha * tf.sign(gradient)
        adv_example = adv_example + perturbation

        # Clip perturbation to epsilon ball
        delta = tf.clip_by_value(adv_example - input_data[np.newaxis], -epsilon, epsilon)
        adv_example = input_data[np.newaxis] + delta

        # Ensure values remain in valid range after scaling
        adv_example = tf.clip_by_value(adv_example, -1.0, 1.0)

    return adv_example.numpy()[0]
