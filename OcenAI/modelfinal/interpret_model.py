import joblib
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.inspection import permutation_importance
import matplotlib.pyplot as plt

def interpret_random_forest(csv_path, model_path="model.pkl", encoder_path="label_encoder.pkl"):
    """
    Loads the trained RandomForest model & dataset, then:
     1) Prints the built-in feature importances from the Random Forest
     2) Computes and prints permutation importances
     3) Optionally, plots the sorted permutation importances
    """

    # 1. Load data
    df = pd.read_csv(csv_path)
    print(f"Dataset loaded: {df.shape} rows, {df.shape[1]} columns")

    # 2. Separate features and target
    X = df.drop(columns=["filiere"])
    y = df["filiere"]

    # 3. Encode target
    label_encoder = LabelEncoder()
    y_encoded = label_encoder.fit_transform(y)

    # 4. Train/test split (the same ratio as in train_model.py if you want consistency)
    X_train, X_test, y_train, y_test = train_test_split(
        X, y_encoded, test_size=0.2, random_state=42, stratify=y_encoded
    )

    # 5. Load the trained model & label encoder from disk
    model = joblib.load(model_path)
    loaded_label_encoder = joblib.load(encoder_path)
    print("Model and label encoder loaded successfully.")

    # 6. Built-in feature importances
    #    (Each feature's relative importance in the final vote of the forest.)
    if hasattr(model, "feature_importances_"):
        importances = model.feature_importances_
        features = X.columns
        # Sort them
        indices = np.argsort(importances)[::-1]

        print("\n=== Random Forest Built-in Feature Importances ===")
        for rank, idx in enumerate(indices, start=1):
            print(f"{rank:2d}. {features[idx]} = {importances[idx]:.4f}")
    else:
        print("\nThe loaded model does not have feature_importances_ attribute.")

    # 7. Permutation importance (more reliable measure of each feature’s impact)
    print("\nCalculating permutation importances on the test set...")
    r = permutation_importance(
        model, X_test, y_test, n_repeats=5, random_state=42, n_jobs=-1
    )

    # Sort permutation importance by mean
    perm_sorted_idx = r.importances_mean.argsort()[::-1]

    print("\n=== Permutation Importances (Mean ± STD) ===")
    for rank, idx in enumerate(perm_sorted_idx, start=1):
        feat_name = X.columns[idx]
        mean_import = r.importances_mean[idx]
        std_import = r.importances_std[idx]
        print(f"{rank:2d}. {feat_name} = {mean_import:.4f} ± {std_import:.4f}")

    # 8. Optional: Plot the permutation importances (top 15 features for clarity)
    top_n = 15
    top_indices = perm_sorted_idx[:top_n][::-1]  # reversed for plotting
    plt.figure(figsize=(8, 6))
    plt.barh(range(top_n), r.importances_mean[top_indices],
             xerr=r.importances_std[top_indices], align='center')
    plt.yticks(range(top_n), [X.columns[i] for i in top_indices])
    plt.xlabel("Permutation Importance")
    plt.title(f"Top {top_n} Features (Permutation Importance)")
    plt.tight_layout()
    plt.show()


if __name__ == "__main__":
    # Change if you have different file names
    CSV_PATH = "modelfinal/dataset_synth_bigfive_extended.csv"
    MODEL_PATH = "modelfinal/model.pkl"
    ENCODER_PATH = "modelfinal/label_encoder.pkl"

    interpret_random_forest(CSV_PATH, MODEL_PATH, ENCODER_PATH)
