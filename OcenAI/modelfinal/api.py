from fastapi import FastAPI, Request
import uvicorn
import joblib
import pandas as pd

app = FastAPI()

# 1. Load the trained model and label encoder
model = joblib.load("model.pkl")  # Your RandomForest or other classifier
label_encoder = joblib.load("label_encoder.pkl")

@app.get("/")
def home():
    return {"message": "Model API is running. Send POST to /predict."}

@app.post("/predict")
async def predict_filiere(request: Request):
    """
    Expects a JSON body with ~79 keys:
      - extraversion_1..10
      - ouverture_1..10
      - conscienciosite_1..10
      - stabilite_emotionnelle_1..10
      - agreabilite_1..10
      - motivation_1..12
      - interest_1..12
      - fam_1..5
    Returns {"best_major": "Informatique"} etc.
    """
    # 2. Parse JSON from request
    user_responses = await request.json()  # dict with the required keys

    # 3. Convert to DataFrame
    # The columns must match the trained model's features exactly
    user_df = pd.DataFrame([user_responses])

    # 4. Predict
    y_pred = model.predict(user_df)

    # 5. Convert numeric label back to filiere name
    predicted_filiere = label_encoder.inverse_transform(y_pred)[0]

    return {"best_major": predicted_filiere}


if __name__ == "__main__":
    # Run the app with uvicorn if you like:
    uvicorn.run(app, host="0.0.0.0", port=8000)
