package org.example.futureengineers.Utils.Files;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Base64;
import java.util.InvalidPropertiesFormatException;
import java.util.List;

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


    // les type d'image autorisée
    private static final List<String> TYPES_AUTORISEES = List.of("image/jpeg", "image/png");

    public static final String IMAGES_DIR = "src/main/resources/images";


    public static String convertImageToBase64(MultipartFile file) throws IOException {

        // Vérifier si le fichier existe
        if (file == null || file.isEmpty())
            throw new IllegalArgumentException("Le fichier 'image' est vide ou non existant !");

        // verifier si le ficher est une image ?
        if ( !TYPES_AUTORISEES.contains(file.getContentType()) )
            throw new InvalidPropertiesFormatException("le fichier passé n'est pas du type .jpeg ou .png !");

        // ajouter les entêtes dencodage
        String base64Header = "data:"+ file.getContentType() +";base64,";
        // Convertir les bytes en Base64
        return base64Header + Base64.getEncoder().encodeToString(file.getBytes());
    }

    public static void decodeBase64ToImage(String base64, String outputPath) throws IOException {

        byte[] imageBytes = Base64.getDecoder().decode(base64);

        try (FileOutputStream fileOutputStream = new FileOutputStream(new File(outputPath))) {
            fileOutputStream.write(imageBytes);
        }
    }
}
