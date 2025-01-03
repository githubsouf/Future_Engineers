package org.example.futureengineers.Services.ServicesInterfaces;

import org.example.futureengineers.Dtos.Response.StudentResponceDto;
import org.example.futureengineers.Entities.Directeur;
import org.example.futureengineers.Entities.Student;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public interface StudentService {

    Student CreateStudentFromEmail(String email, Directeur directeur);

    List<Student> CreateStudentsFromEmails(List<String> emails, Directeur directeur);

    StudentResponceDto getStudent(Long id, Directeur directeur) throws IllegalAccessException;

    List<StudentResponceDto> getAllStudents(Directeur directeur);

    boolean AddReleveDeNoteToStudent(Student student, String filePath) throws IOException;

    Student getStudentFromCurrentUser();

    boolean deleteStudentById(Long id, Directeur directeur) throws IllegalAccessException;

    boolean deleteAllStudents(Directeur directeur);
}
