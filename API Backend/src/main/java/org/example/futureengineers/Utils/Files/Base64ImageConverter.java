package org.example.futureengineers.Utils.Files;

import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.Base64;

@Service
public class Base64ImageConverter {

    public String convertImageToBase64(String filePath) throws IOException {
        File file = new File(filePath);

        // Vérifier si le fichier existe
        if (!file.exists()) {
            throw new IllegalArgumentException("Fichier introuvable : " + filePath);
        }

        // Lire le fichier image en tant que tableau de bytes
        FileInputStream fis = new FileInputStream(file);
        byte[] imageBytes = fis.readAllBytes();
        fis.close();

        // Convertir les bytes en Base64
        return Base64.getEncoder().encodeToString(imageBytes);
    }
}
