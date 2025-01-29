import numpy as np
import pandas as pd

def generate_synthetic_dataset(n_per_filiere=16676, random_state=42):
    """
    Génère un dataset synthétique avec ~10,000 lignes (6 filières x 1667 = 10,002).
    - 50 colonnes Big Five (10 questions par dimension)
    - 12 colonnes Motivation
    - 12 colonnes Intérêts
    - 5 colonnes Influence familiale
    - 1 colonne "filiere" (label)
    """
    np.random.seed(random_state)
    
    # Définition des moyennes "globales" par filière,
    # autour desquelles on va générer les réponses (1 à 5).
    # Pour Big Five, on considère que la filière a un profil
    # (min, max) pour la MOYENNE, et on va générer chaque question
    # autour de cette moyenne globale.
    filiere_profiles = {
        "Informatique": {
            "extraversion": (2.0, 3.0),   # moyenne ~2.0-3.0 sur 1-5
            "ouverture": (3.5, 4.5),
            "conscienciosite": (3.5, 4.5),
            "stabilite_emotionnelle": (2.5, 3.5),
            "agreabilite": (2.5, 3.5)
        },
        "Industriel": {
            "extraversion": (3.0, 4.0),
            "ouverture": (3.0, 4.0),
            "conscienciosite": (4.0, 5.0),
            "stabilite_emotionnelle": (3.5, 4.5),
            "agreabilite": (3.0, 4.0)
        },
        "Cybersécurité": {
            "extraversion": (2.0, 3.0),
            "ouverture": (4.0, 5.0),
            "conscienciosite": (4.0, 5.0),
            "stabilite_emotionelle": (3.5, 4.5),  # Petite coquille corrigée ci-dessous
            "stabilite_emotionnelle": (3.5, 4.5),
            "agreabilite": (2.0, 3.0)
        },
        "Réseaux": {
            "extraversion": (2.5, 3.5),
            "ouverture": (3.0, 4.0),
            "conscienciosite": (4.0, 5.0),
            "stabilite_emotionnelle": (2.5, 3.5),
            "agreabilite": (3.0, 4.0)
        },
        "Environnement": {
            "extraversion": (3.0, 4.0),
            "ouverture": (4.0, 5.0),
            "conscienciosite": (2.5, 3.5),
            "stabilite_emotionnelle": (3.5, 4.5),
            "agreabilite": (4.0, 5.0)
        },
        "Électrique": {
            "extraversion": (2.0, 3.0),
            "ouverture": (3.0, 4.0),
            "conscienciosite": (4.0, 5.0),
            "stabilite_emotionnelle": (3.5, 4.5),
            "agreabilite": (2.5, 3.5)
        }
    }
    
    # Moyennes pour la motivation (12 questions) par filière
    # Valeurs entre 1 et 5
    motivation_centers = {
        "Informatique":       [5, 2, 5, 3, 2, 5, 2, 4, 2, 3, 4, 5],
        "Industriel":         [3, 3, 4, 5, 5, 3, 4, 4, 3, 4, 4, 2],
        "Cybersécurité":      [5, 1, 4, 2, 2, 5, 2, 5, 3, 3, 5, 5],
        "Réseaux":            [4, 2, 3, 3, 4, 4, 3, 4, 3, 4, 3, 3],
        "Environnement":      [2, 5, 3, 4, 3, 2, 4, 3, 5, 4, 3, 2],
        "Électrique":         [4, 2, 3, 2, 3, 4, 3, 3, 2, 5, 3, 4],
    }
    
    # Centres d'intérêt (12 questions)
    interests_centers = {
        "Informatique":       [5, 2, 3, 2, 1, 2, 2, 5, 2, 1, 5, 2],
        "Industriel":         [2, 5, 2, 2, 1, 1, 5, 2, 1, 1, 2, 1],
        "Cybersécurité":      [3, 1, 5, 2, 1, 1, 1, 2, 5, 1, 2, 1],
        "Réseaux":            [2, 1, 2, 5, 1, 1, 2, 4, 1, 1, 2, 1],
        "Environnement":      [1, 1, 1, 1, 5, 1, 2, 1, 1, 5, 1, 2],
        "Électrique":         [1, 1, 1, 1, 1, 5, 1, 1, 1, 1, 1, 5],
    }
    
    # Influence familiale (5 questions)
    # On définit un centre pour chaque filière (entre 1 et 5)
    fam_influence_bias = {
        "Informatique": [3, 3, 3, 2, 2],
        "Industriel":   [3, 4, 3, 3, 3],
        "Cybersécurité":[2, 2, 3, 2, 1],
        "Réseaux":      [3, 3, 3, 3, 3],
        "Environnement":[2, 2, 4, 3, 3],
        "Électrique":   [3, 3, 3, 3, 2]
    }
    
    # Préparation du dictionnaire où on stocke les données
    data = {"filiere": []}
    
    # 50 colonnes Big Five (10 questions par dimension)
    big_five_traits = ["extraversion", "ouverture", "conscienciosite", "stabilite_emotionnelle", "agreabilite"]
    for trait in big_five_traits:
        for q_num in range(1, 11):
            data[f"{trait}_{q_num}"] = []
    
    # Motivation 12 questions
    for i in range(1, 13):
        data[f"motivation_{i}"] = []
    
    # Intérêts 12 questions
    for i in range(1, 13):
        data[f"interest_{i}"] = []
    
    # Influence familiale 5 questions
    for i in range(1, 6):
        data[f"fam_{i}"] = []
    
    # Génération des échantillons
    for filiere, profile_ranges in filiere_profiles.items():
        for _ in range(n_per_filiere):
            # --- Big Five (50 réponses) ---
            # Pour chaque trait, on génère 10 valeurs (1-5) autour d'une moyenne
            mean_extr = np.random.uniform(*profile_ranges["extraversion"])
            mean_ouvr = np.random.uniform(*profile_ranges["ouverture"])
            mean_cons = np.random.uniform(*profile_ranges["conscienciosite"])
            mean_stab = np.random.uniform(*profile_ranges["stabilite_emotionnelle"])
            mean_agre = np.random.uniform(*profile_ranges["agreabilite"])
            
            # Génération de 10 réponses par trait
            for q_num in range(1, 11):
                # extraversion
                val_e = np.clip(mean_extr + np.random.normal(0, 0.7), 1, 5)
                data[f"extraversion_{q_num}"].append(val_e)
                
                # ouverture
                val_o = np.clip(mean_ouvr + np.random.normal(0, 0.7), 1, 5)
                data[f"ouverture_{q_num}"].append(val_o)
                
                # conscienciosite
                val_c = np.clip(mean_cons + np.random.normal(0, 0.7), 1, 5)
                data[f"conscienciosite_{q_num}"].append(val_c)
                
                # stabilite_emotionnelle
                val_s = np.clip(mean_stab + np.random.normal(0, 0.7), 1, 5)
                data[f"stabilite_emotionnelle_{q_num}"].append(val_s)
                
                # agreabilite
                val_a = np.clip(mean_agre + np.random.normal(0, 0.7), 1, 5)
                data[f"agreabilite_{q_num}"].append(val_a)
            
            # --- Motivation (12 réponses) ---
            moti_centers = motivation_centers[filiere]
            for i_m, m_center in enumerate(moti_centers, start=1):
                val_m = m_center + np.random.normal(0, 1)
                val_clamped_m = np.clip(val_m, 1, 5)
                data[f"motivation_{i_m}"].append(val_clamped_m)
            
            # --- Intérêts (12 réponses) ---
            intr_centers = interests_centers[filiere]
            for i_i, i_center in enumerate(intr_centers, start=1):
                val_i = i_center + np.random.normal(0, 1)
                val_clamped_i = np.clip(val_i, 1, 5)
                data[f"interest_{i_i}"].append(val_clamped_i)
            
            # --- Influence familiale (5 réponses) ---
            fam_center = fam_influence_bias[filiere]
            for i_f, fc in enumerate(fam_center, start=1):
                val_f = fc + np.random.normal(0, 1)
                val_clamped_f = np.clip(val_f, 1, 5)
                data[f"fam_{i_f}"].append(val_clamped_f)
            
            # Label filiere
            data["filiere"].append(filiere)
    
    df = pd.DataFrame(data)
    return df


if __name__ == "__main__":
    # On fixe n_per_filiere=1667 => environ 10k lignes au total
    df_synth = generate_synthetic_dataset(n_per_filiere=16676, random_state=42)
    print(df_synth.head())
    print(f"\nTaille du dataset : {df_synth.shape} (attendu ~10,002 lignes)")
    
    # Sauvegarder en CSV
    df_synth.to_csv("modelfinal/dataset_synth_bigfive_extended.csv", index=False)
    print("Dataset sauvegardé sous 'dataset_synth_bigfive_extended.csv'.")
