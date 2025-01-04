package org.example.futureengineers.Controllers;

import org.example.futureengineers.Entities.Student;
import org.example.futureengineers.Services.ServicesInterfaces.StudentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;

@RestController
@RequestMapping("/api/student")
@PreAuthorize("hasRole('STUDENT')")
public class StudentController {

    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }


    @PutMapping("/add-releve-note")
    public ResponseEntity<?> addReleveNote(@RequestParam("file") MultipartFile file) throws IOException {
        // le student authentifier
        Student student = studentService.getStudentFromCurrentUser();
        // Vérifier si le fichier est vide
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("Le fichier est vide !");
        }

        // Sauvegarder temporairement le fichier
        File tempFile = File.createTempFile("uploaded-", file.getOriginalFilename());
        file.transferTo(tempFile);

        // ajouter releve au student
        if (studentService.AddReleveDeNoteToStudent(student, tempFile.getAbsolutePath()))
            return ResponseEntity.ok().body("Ajouter avec succes.");
        else
            return new ResponseEntity<>("Erreur lors de l'ajout de releve de note !", HttpStatus.NOT_IMPLEMENTED);
    }


}
