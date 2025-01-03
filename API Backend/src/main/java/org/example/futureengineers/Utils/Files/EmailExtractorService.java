package org.example.futureengineers.Utils.Files;

import com.fasterxml.jackson.databind.exc.InvalidFormatException;
import org.apache.poi.ss.usermodel.*;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Pattern;

@Service
public class EmailExtractorService {

    private static final String EMAIL_REGEX = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$";

    public List<String> extractEmailsFromExcel(File excelFile) {
        List<String> emails = new ArrayList<>();
        Pattern emailPattern = Pattern.compile(EMAIL_REGEX);

        try (FileInputStream fis = new FileInputStream(excelFile)) {
            // Vérifiez le type du fichier
            if (!excelFile.getName().endsWith(".xlsx") && !excelFile.getName().endsWith(".xls")) {
                throw new IllegalArgumentException("Unsupported file type. Please upload a valid Excel file (.xlsx or .xls)");
            }

            Workbook workbook = WorkbookFactory.create(fis);

            for (Sheet sheet : workbook) {
                for (Row row : sheet) {
                    for (Cell cell : row) {
                        if (cell.getCellType() == CellType.STRING) {
                            String cellValue = cell.getStringCellValue();
                            if (emailPattern.matcher(cellValue).matches()) {
                                emails.add(cellValue);
                            }
                        }
                    }
                }
            }
        } catch (IOException e) {
            throw new RuntimeException("Error reading Excel file", e);
        }

        return emails;
    }
}
