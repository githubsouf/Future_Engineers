package org.example.futureengineers.Utils.Files;

import com.fasterxml.jackson.databind.exc.InvalidFormatException;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Pattern;

@Service
public class EmailExtractorService {

        public List<String> extractFirstColumnWithEmails(String filePath) throws IOException {
            // Charger le fichier Excel
            FileInputStream fis = new FileInputStream(new File(filePath));
            Workbook workbook = new XSSFWorkbook(fis);
            Sheet sheet = workbook.getSheetAt(0);

            // Vérifier s'il y a au moins une ligne
            if (sheet.getPhysicalNumberOfRows() == 0) {
                throw new IllegalArgumentException("Le fichier Excel est vide.");
            }

            // Lire chaque colonne
            int totalColumns = sheet.getRow(0).getLastCellNum(); // Nombre total de colonnes
            for (int colIndex = 0; colIndex < totalColumns; colIndex++) {
                int consecutiveEmailCount = 0;
                int startRowIndex = -1; // Pour suivre l'indice de début des 3 emails consécutifs

                // Vérifier les 20 premières lignes de cette colonne
                for (int rowIndex = 0; rowIndex < Math.min(sheet.getPhysicalNumberOfRows(), 20); rowIndex++) {
                    String cellValue = getStringValue(sheet.getRow(rowIndex).getCell(colIndex));

                    if (isEmail(cellValue)) {
                        consecutiveEmailCount++;
                        if (consecutiveEmailCount == 3) {
                            // On a trouvé 3 emails consécutifs
                            startRowIndex = rowIndex - 2; // Première ligne des 3 consécutives
                            break;
                        }
                    } else {
                        consecutiveEmailCount = 0; // Réinitialiser le compteur si une cellule n'est pas un email
                    }
                }

                // Si on a trouvé 3 emails consécutifs, collecter uniquement les cellules avec des emails valides
                if (startRowIndex != -1) {
                    List<String> columnData = new ArrayList<>();
                    for (int rowIndex = startRowIndex; rowIndex < sheet.getPhysicalNumberOfRows(); rowIndex++) {
                        String cellValue = getStringValue(sheet.getRow(rowIndex).getCell(colIndex));
                        if (isEmail(cellValue)) {
                            columnData.add(cellValue); // Ajouter uniquement les emails valides
                        }
                    }
                    // Retourner la première colonne qui vérifie la condition
                    workbook.close();
                    fis.close();
                    return columnData;
                }
            }

            workbook.close();
            fis.close();

            // Si aucune colonne ne vérifie la condition, retourner une liste vide
            return new ArrayList<>();
        }

        // Méthode pour convertir une cellule en chaîne de caractères
        private String getStringValue(Cell cell) {
            if (cell == null) {
                return "";
            }
            switch (cell.getCellType()) {
                case STRING:
                    return cell.getStringCellValue().trim();
                case NUMERIC:
                    return String.valueOf(cell.getNumericCellValue()).trim();
                case BOOLEAN:
                    return String.valueOf(cell.getBooleanCellValue()).trim();
                case FORMULA:
                    return cell.getCellFormula().trim();
                default:
                    return "";
            }
        }

        // Méthode pour vérifier si une chaîne est au format email
        private boolean isEmail(String value) {
            return value != null && value.matches("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$");
        }




        public List<String> extractEmailsFromExcel(File file) throws Exception {
            List<String> emails = new ArrayList<>();
            try (Workbook workbook = WorkbookFactory.create(file)) {
                Sheet sheet = workbook.getSheetAt(0);
                for (Row row : sheet) {
                    String email = row.getCell(0).getStringCellValue();
                    if (email != null && email.contains("@")) { 
                        emails.add(email);
                    }
                }
            }
            return emails;
        }

}
