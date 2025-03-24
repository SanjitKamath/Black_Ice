**PROGRAM 1: train_malware_classifier.py**
This program trains a neural network to classify files as malware or benign based on extracted features.
It loads the dataset, removes non-numeric columns, and normalizes the feature values.
A simple neural network with two hidden layers is trained using binary cross-entropy loss.
The trained model is then saved as malware_classifier.h5 for future use.

**PROGRAM 2: generate_adversarial_samples.py**
This program generates adversarial malware samples to test the model’s robustness.
It loads the trained classifier and uses gradient-based attacks to modify input samples.
The adversarial samples are crafted by adding small perturbations using Fast Gradient Sign Method (FGSM).
The model’s predictions are compared before and after the attack to check its vulnerability.

**PROGRAM 3: defense_strategies.py**
This program implements defense mechanisms to protect the classifier from adversarial attacks.
Adversarial training is performed by retraining the model with adversarial examples.
Feature squeezing is applied to reduce the effect of small adversarial perturbations.
Ensemble learning combines multiple models to improve classification robustness.

**CSV Dataset (malware_dataset.csv)**
The dataset contains features of malware and benign files, used for training the classifier. 
It has multiple numeric columns representing file characteristics like opcode frequency and behavior patterns.
The last column is the label (0 = benign, 1 = malware) indicating the file type. 
The dataset is preprocessed before training, with non-numeric columns removed and values normalized.
