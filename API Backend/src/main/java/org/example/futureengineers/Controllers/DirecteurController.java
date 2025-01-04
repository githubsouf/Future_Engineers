package org.example.futureengineers.Controllers;

import jakarta.mail.MessagingException;
import org.example.futureengineers.Config.JwtUtil;
import org.example.futureengineers.Dtos.Request.DirecteurRequestDto;
import org.example.futureengineers.Dtos.Response.StudentResponceDto;
import org.example.futureengineers.Entities.Directeur;
import org.example.futureengineers.Entities.Student;
import org.example.futureengineers.Entities.User;
import org.example.futureengineers.Repositories.DirecteurRepository;
import org.example.futureengineers.Repositories.UserRepository;
import org.example.futureengineers.Services.ServicesInterfaces.DirecteurService;
import org.example.futureengineers.Services.ServicesInterfaces.StudentService;
import org.example.futureengineers.Utils.CurrentUserUtil;
import org.example.futureengineers.Utils.Files.*;
import org.example.futureengineers.Utils.HtmlEmailUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.*;

import static org.example.futureengineers.Dtos.Mapper.ConvertDirecteurToDirecteurResponseDto;

@RestController
@RequestMapping("/api/directeur")
@PreAuthorize("hasRole('DIRECTEUR')")
public class DirecteurController {

    private final DirecteurRepository directeurRepository;
    private final DirecteurService directeurService;
    private final CurrentUserUtil currentUser;
    private final UserRepository userRepository;
    private final EmailExtractorService emailExtractorService;
    private final StudentService studentService;
    private final HtmlEmailUtil emailUtil;

    private final String urlBase = "localhost:8080/pass-exam";


    public DirecteurController(DirecteurRepository directeurRepository, DirecteurService directeurService, CurrentUserUtil currentUser, UserRepository userRepository, EmailExtractorService emailExtractorService, StudentService studentService, HtmlEmailUtil emailUtil) {
        this.directeurRepository = directeurRepository;
        this.directeurService = directeurService;
        this.currentUser = currentUser;
        this.userRepository = userRepository;
        this.emailExtractorService = emailExtractorService;
        this.studentService = studentService;
        this.emailUtil = emailUtil;
    }

    @GetMapping
    public ResponseEntity<?> getDirecteur() {
        User user = currentUser.getCurrentUser();
        return ResponseEntity.ok().body(directeurService.getDirecteur(user.getId()));
    }

    @PutMapping
    public ResponseEntity<?> updateDirecteur(@RequestBody final DirecteurRequestDto directeurRequest){
        Directeur directeur = directeurService.getDirecteurFromCurrentUser();
        directeurService.updateDirecteur(directeur, directeurRequest);
        return ResponseEntity.ok().body(ConvertDirecteurToDirecteurResponseDto(directeur));
    }

    @DeleteMapping
    public ResponseEntity<?> deleteDirecteur(){
        Directeur directeur = directeurService.getDirecteurFromCurrentUser();
        directeurRepository.delete(directeur);
        return ResponseEntity.ok("Directeur est bien supprimer!");
    }


    // ADDING STUDENTS VIA EXCEL FILE
    // AND SENDING EMAILS WITH TOKEN TO PASS TEST
    @PostMapping("/add-students-from-excel")
    public ResponseEntity<?> addStudentsAndSendEmails(@RequestParam("file") MultipartFile file) {
        Dictionary<String,String> responce = new Hashtable<>();
        // le directeur authentifier
        Directeur directeur = directeurService.getDirecteurFromCurrentUser();

        try {
            // Vérifiez si le fichier est vide
            if (file.isEmpty()) {
                return ResponseEntity.badRequest().body("Le fichier est vide.");
            }

            // Vérifiez le type MIME
            String fileType = file.getContentType();
            if (!"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet".equals(fileType) &&
                    !"application/vnd.ms-excel".equals(fileType)) {
                return ResponseEntity.badRequest().body("Type de fichier non pris en charge. Veuillez fournir un fichier Excel.");
            }

            // Sauvegarder le fichier temporairement
            File tempFile = File.createTempFile("uploaded", file.getOriginalFilename());
            file.transferTo(tempFile);
            // Extraire les emails
            List<String> emails = emailExtractorService.extractEmailsFromExcel(tempFile);

            // Supprimer le fichier temporaire
            tempFile.delete();

            // sauvgarder les students
            List<Student> students = studentService.CreateStudentsFromEmails(emails,directeur);



            // generation de token pour chaque etudiant
            Map<String,String> studentsTokens = new HashMap<>();
            students.forEach(student -> {
                String studentMail = student.getUser().getEmail();
                studentsTokens.put(studentMail, JwtUtil.generateToken(studentMail,"student"));
            });
            // envoyer des e-mail au students
            studentsTokens.forEach((email,token) -> {
                Map<String,Object> dataToSendInEmail = new HashMap<>();
                // prepare data to send by email
                String studentNom = email.split("@")[0];
                dataToSendInEmail.put("studentNom",studentNom);
                dataToSendInEmail.put("studentEmail", email);
                dataToSendInEmail.put("link", token);
                dataToSendInEmail.put("directeurNom", directeur.getUser().getNom());
                dataToSendInEmail.put("directeurPrenom", directeur.getUser().getPrenom());

                try {
                    // sending emails with token
                    emailUtil.sendHtmlEmail(email, dataToSendInEmail);
                } catch (MessagingException e) {
                    throw new RuntimeException(e);
                }

            });
            responce.put("Message","Students created, and e-mails sended with success.");
            return ResponseEntity.ok(responce);


        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Une erreur s'est produite lors du traitement du fichier : " + e.getMessage());
        }
    }

    @GetMapping("/students")
    public ResponseEntity<?> getStudents(){
        // le directeur authentifier
        Directeur directeur = directeurService.getDirecteurFromCurrentUser();
        List<StudentResponceDto> studentResponceDtos = studentService.getAllStudents(directeur);
        return ResponseEntity.ok().body(studentResponceDtos);
    }

    @GetMapping("/students/{id}")
    public ResponseEntity<?> getStudentById(@PathVariable final Long id) throws IllegalAccessException {
        // le directeur authentifier
        Directeur directeur = directeurService.getDirecteurFromCurrentUser();
        StudentResponceDto studentResponceDto = studentService.getStudent(id,directeur);
        return ResponseEntity.ok(studentResponceDto);
    }

    @DeleteMapping("/students/{id}")
    public ResponseEntity<?> deleteStudentById(@PathVariable final Long id){
        Dictionary<String,String> responce = new Hashtable<>();
        // le directeur authentifier
        Directeur directeur = directeurService.getDirecteurFromCurrentUser();
        try {
            studentService.deleteStudentById(id,directeur);
            responce.put("Message","Student with id : "+ id + " deleted with success.");
            return ResponseEntity.ok(responce);
        } catch (IllegalAccessException e) {
            responce.put("Error",e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responce);
        }
    }

    @DeleteMapping("/students")
    public ResponseEntity<?> deleteAllStudents(){
        Dictionary<String,String> responce = new Hashtable<>();
        // le directeur authentifier
        Directeur directeur = directeurService.getDirecteurFromCurrentUser();
        try {
            studentService.deleteAllStudents(directeur);
            responce.put("Message","All students deleted successfully");
            return ResponseEntity.ok(responce);
        } catch (Exception e) {
            responce.put("Error",e.getMessage());
            return ResponseEntity.status(HttpStatus.CONFLICT).body(responce);
        }
    }

}
