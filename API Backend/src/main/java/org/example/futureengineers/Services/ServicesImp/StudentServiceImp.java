package org.example.futureengineers.Services.ServicesImp;

import org.example.futureengineers.Dtos.Mapper;
import org.example.futureengineers.Dtos.Response.StudentResponceDto;
import org.example.futureengineers.Entities.Directeur;
import org.example.futureengineers.Entities.Role;
import org.example.futureengineers.Entities.Student;
import org.example.futureengineers.Entities.User;
import org.example.futureengineers.Repositories.StudentRepository;
import org.example.futureengineers.Repositories.UserRepository;
import org.example.futureengineers.Services.ServicesInterfaces.StudentService;
import org.example.futureengineers.Utils.CurrentUserUtil;
import org.example.futureengineers.Utils.Files.Base64ImageConverter;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class StudentServiceImp implements StudentService {

    private final StudentRepository studentRepository;
    private final UserRepository userRepository;
    private final Base64ImageConverter base64ImageConverter;
    private final CurrentUserUtil currentUser;
    private final PasswordEncoder passwordEncoder;

    public StudentServiceImp(StudentRepository studentRepository, UserRepository userRepository, Base64ImageConverter base64ImageConverter, CurrentUserUtil currentUser, PasswordEncoder passwordEncoder) {
        this.studentRepository = studentRepository;
        this.userRepository = userRepository;
        this.base64ImageConverter = base64ImageConverter;
        this.currentUser = currentUser;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public Student CreateStudentFromEmail(String email, Directeur directeur) {
        // creation de user avec (email et role) c tout
        User studentUser = new User();
        studentUser.setEmail(email);
        studentUser.setRole(Role.student);
        String passwordFromEmail = email.split("@")[0];
        studentUser.setMotDePasse(passwordEncoder.encode(passwordFromEmail));
        userRepository.save(studentUser);
        // creation de Student
        Student student = new Student();
        student.setUser(studentUser);
        student.setDirecteur(directeur);
        studentRepository.save(student);

        return student;
    }

    @Override
    public List<Student> CreateStudentsFromEmails(List<String> emails, Directeur directeur){
        List<Student> students = new ArrayList<>();
        for (String email : emails){
            students.add(CreateStudentFromEmail(email, directeur));
        }
        return students;
    }

    @Override
    public StudentResponceDto getStudent(Long id, Directeur directeur) throws IllegalAccessException {
        List<Student> directeurStudents = directeur.getStudents();
        Optional<Student> optionalStudent = studentRepository.findById(id);
        if (optionalStudent.isEmpty())
            throw new IllegalArgumentException("Student whith id: "+ id + " NOT FOUND");
        else if(!directeurStudents.contains(optionalStudent.get()))
            throw new IllegalAccessException("Access non autorisé");
        else
            return Mapper.ConvertStudentToStudentResponceDto(optionalStudent.get());
    }

    @Override
    public List<StudentResponceDto> getAllStudents(Directeur directeur){
        List<Student> directeurStudents = directeur.getStudents();
        List<StudentResponceDto> responceDtos = new ArrayList<>();
        directeurStudents.forEach(student ->
                responceDtos.add(Mapper.ConvertStudentToStudentResponceDto(student)));
        return responceDtos;
    }

    @Override
    public boolean AddReleveDeNoteToStudent(Student student, String filePath) throws IOException {
        try {
            String releveDeNoteBase64 = base64ImageConverter.convertImageToBase64(filePath);
            student.setReleveDeNote(releveDeNoteBase64);
            studentRepository.save(student);
            return true;
        } catch (IOException e){
            System.out.println(e.getMessage());
            return false;
        }
    }

    @Override
    public Student getStudentFromCurrentUser() {
        User user = currentUser.getCurrentUser();
        return studentRepository.findStudentByUser(user);
    }

    @Override
    public boolean deleteStudentById(Long id, Directeur directeur) throws IllegalAccessException {
        List<Student> directeurStudents = directeur.getStudents();
        Optional<Student> optionalStudent = studentRepository.findById(id);
        if (optionalStudent.isEmpty())
            throw new IllegalArgumentException("Student not found");
        else if (!directeurStudents.contains(optionalStudent.get()))
            throw new IllegalAccessException("Acces non autorisé");
        else {
            studentRepository.delete(optionalStudent.get());
            return true;
        }
    }

    @Override
    public boolean deleteAllStudents(Directeur directeur) {
        List<Student> studentList = directeur.getStudents();
        studentRepository.deleteAll(studentList);
        return true;
    }


}
