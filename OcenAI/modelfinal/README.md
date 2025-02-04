# README

## 1. Project Overview

This project helps **predict the best major (filière)** for a student based on their answers to a **79-question survey** covering:

- **Big Five** personality traits (50 questions, 10 for each of the 5 traits)  
- **Motivation** (12 questions)  
- **Interests** (12 questions)  
- **Familial influence** (5 questions)

The workflow is:

1. **Generate Synthetic Data** (for testing or demonstration)  
2. **Train a Random Forest** model on that dataset  
3. **Optionally interpret** the trained model (feature importances)  
4. **Run a FastAPI** server that exposes an endpoint to predict the filière for new user responses

In a real production environment, you might replace the synthetic dataset with real data or refine the data generation logic.

---

## 2. File Descriptions

### `datageneration.py`
- **Purpose**: Creates a synthetic dataset (~100k rows) that mimics student responses.  
- **Key Points**:  
  - Each row has **79 feature columns** (Big Five, Motivation, Interests, Family Influence) plus a “filiere” label.  
  - You can modify the `n_per_filiere` parameter or the random noise levels to adjust dataset size and distribution.  
  - Outputs a CSV file called **`dataset_synth_bigfive_extended.csv`**.

### `model.py`
- **Purpose**: Trains a **Random Forest** classifier on the CSV from `datageneration.py`.  
- **Key Points**:  
  - Splits data into train/test sets (80/20).  
  - Encodes the target (`filiere`) using a `LabelEncoder`.  
  - Prints accuracy, classification report, confusion matrix.  
  - **Saves** the trained model and encoder as **`model.pkl`** and **`label_encoder.pkl`**.  
  - Optionally **scales** different feature groups (Big Five, Motivation, Interests, Family) to reflect a custom weighting (e.g. 50% Big Five, 20% Motivation, 20% Interests, 10% Family).

### `interpret_model.py` *(optional)*
- **Purpose**: Analyzes **feature importances** after training.  
- **Key Points**:  
  - Shows **built-in** Random Forest feature importances.  
  - Computes **permutation importances** to measure how each feature affects predictions.  
  - Optionally plots a bar chart of the top features (requires `matplotlib`).

### `api.py` (FastAPI Application)
- **Purpose**: Runs a **FastAPI** service that loads `model.pkl` and `label_encoder.pkl` and exposes a **`POST /predict`** endpoint.  
- **Key Points**:  
  - Expects a JSON body with **79 numeric fields**:  
    - `extraversion_1..10`  
    - `ouverture_1..10`  
    - `conscienciosite_1..10`  
    - `stabilite_emotionnelle_1..10`  
    - `agreabilite_1..10`  
    - `motivation_1..12`  
    - `interest_1..12`  
    - `fam_1..5`  
  - Returns a JSON such as `{"best_major": "Informatique"}`.  
  

### `questionnaire.json` *(optional)*
- **Purpose**: Contains all **79 questions** (Big Five, Motivation, Interests, Family) in a structured JSON format, each with an ID and Likert scale.  
- You can use this for a front-end or reference so you know which questions map to which field names.

---

## 3. Installation and Dependencies

Make sure you have [Python 3.x](https://www.python.org/downloads/) installed. Then install required packages:


pip install -r requirements.txt


## 4. Example for json sent from the backend

{
  "extraversion_1": 2.3,
  "extraversion_2": 3.1,
  "extraversion_3": 2.9,
  "extraversion_4": 1.7,
  "extraversion_5": 4.2,
  "extraversion_6": 2.6,
  "extraversion_7": 3.2,
  "extraversion_8": 2.1,
  "extraversion_9": 4.8,
  "extraversion_10": 3.0,

  "ouverture_1": 4.1,
  "ouverture_2": 4.7,
  "ouverture_3": 3.3,
  "ouverture_4": 4.0,
  "ouverture_5": 2.8,
  "ouverture_6": 3.9,
  "ouverture_7": 4.5,
  "ouverture_8": 4.2,
  "ouverture_9": 4.9,
  "ouverture_10": 3.6,

  "conscienciosite_1": 3.5,
  "conscienciosite_2": 2.2,
  "conscienciosite_3": 4.5,
  "conscienciosite_4": 4.0,
  "conscienciosite_5": 3.7,
  "conscienciosite_6": 2.9,
  "conscienciosite_7": 4.3,
  "conscienciosite_8": 4.1,
  "conscienciosite_9": 3.2,
  "conscienciosite_10": 5.0,

  "stabilite_emotionnelle_1": 3.3,
  "stabilite_emotionnelle_2": 4.1,
  "stabilite_emotionnelle_3": 2.7,
  "stabilite_emotionnelle_4": 3.5,
  "stabilite_emotionnelle_5": 4.0,
  "stabilite_emotionnelle_6": 4.4,
  "stabilite_emotionnelle_7": 2.1,
  "stabilite_emotionnelle_8": 3.9,
  "stabilite_emotionnelle_9": 4.2,
  "stabilite_emotionnelle_10": 3.1,

  "agreabilite_1": 3.8,
  "agreabilite_2": 2.2,
  "agreabilite_3": 4.0,
  "agreabilite_4": 3.4,
  "agreabilite_5": 2.9,
  "agreabilite_6": 3.6,
  "agreabilite_7": 4.3,
  "agreabilite_8": 1.9,
  "agreabilite_9": 4.1,
  "agreabilite_10": 3.2,

  "motivation_1": 4,
  "motivation_2": 3,
  "motivation_3": 5,
  "motivation_4": 2,
  "motivation_5": 4,
  "motivation_6": 3,
  "motivation_7": 2,
  "motivation_8": 5,
  "motivation_9": 3,
  "motivation_10": 4,
  "motivation_11": 1,
  "motivation_12": 5,

  "interest_1": 5,
  "interest_2": 2,
  "interest_3": 3,
  "interest_4": 4,
  "interest_5": 5,
  "interest_6": 1,
  "interest_7": 4,
  "interest_8": 2,
  "interest_9": 5,
  "interest_10": 3,
  "interest_11": 3,
  "interest_12": 4,

  "fam_1": 3,
  "fam_2": 4,
  "fam_3": 2,
  "fam_4": 2,
  "fam_5": 3
}
