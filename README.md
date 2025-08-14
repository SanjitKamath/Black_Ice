# Black Ice

Black Ice is a machine learning-powered framework for Windows Portable Executable (PE) malware detection, adversarial robustness assessment, and feature engineering. It leverages both classic ML techniques and adversarial defense strategies to identify and defend against malicious software, using static analysis of executable files.

## Features

- **PE Feature Extraction:** Parses executable files (`.exe`, `.dll`) to extract rich header and section metadata, entropy, string statistics, byte histograms, and import/export functions for ML input.
- **Malware Classification:** Trains a neural network classifier using static PE features to distinguish between benign and malicious files.
- **Adversarial Attacks & Defense:** Implements the Projected Gradient Descent (PGD) attack to test classifier robustness and feature squeezing defense to mitigate adversarial evasion.
- **Dataset Analysis & Evaluation:** Provides utilities for preprocessing, scaling, and analyzing malware datasets, as well as visualizing detection performance (e.g., confusion matrix plots).
- **Rich CLI Interaction:** Uses interactive prompts for file analysis and outputs results in both terminal and JSON formats for further automation.

## Getting Started

### Prerequisites

- Python 3.8+
- Required Python packages (see below)

### Installation

Install required packages:

```bash
pip install pandas numpy tensorflow scikit-learn pefile rich matplotlib joblib
```

### Usage

#### 1. Feature Extraction

Extracts PE file features and saves them in JSON format:

```bash
python file_scraper.py
```

You'll be prompted to enter the path to a PE file.

#### 2. Model Training

Train the malware classifier on your dataset:

```bash
python train_model.py
```

- Make sure `malware_dataset.csv` is present in the repo.
- The trained model and scaler are saved as `malware_classifier_pe_only.keras` and `scaler_pe_only.save`.

#### 3. Adversarial Evaluation & Defense

Test robustness against PGD attacks and apply feature squeezing:

```bash
python defence.py
```

- Loads the trained model and scaler.
- Generates adversarial samples and evaluates defense.

#### 4. Performance Evaluation

Visualize detection results:

```bash
python evaluation.py
```

- Displays confusion matrix and other metrics for classifier performance.

## Project Structure

```
Black_Ice/
│
├── file_scraper.py      # PE file feature extraction
├── train_model.py       # Model training script
├── defence.py           # Adversarial attacks & defense
├── evaluation.py        # Confusion matrix & metrics
├── pgd_attack.py        # PGD adversarial sample generation
├── utils.py             # Utility functions for PE parsing
├── Analyze dataset.py   # Dataset column inspection
├── malware_dataset.csv  # Example dataset (not included)
└── README.md            # This file
```

## Example Workflow

1. **Extract features** from a PE file:
    - Generates a JSON summary including header info, section entropy, imports/exports, suspicious strings, and byte histogram.
2. **Train the classifier** on extracted features using `train_model.py`.
3. **Evaluate robustness** with adversarial attacks (`pgd_attack.py`) and apply feature squeezing defense.
4. **Analyze results** with confusion matrix and accuracy metrics.

## Key Algorithms

- **PE Feature Extraction:** Uses `pefile` to parse header and section fields, collecting both structural and statistical features.
- **Malware Classifier:** A feedforward neural network built with TensorFlow/Keras, trained on static features.
- **PGD Attack:** Generates adversarial examples to probe model vulnerabilities.
- **Feature Squeezing:** Rounds sample feature values to reduce adversarial effect.
- **Evaluation:** Standard ML metrics and visualizations (e.g., confusion matrix).

