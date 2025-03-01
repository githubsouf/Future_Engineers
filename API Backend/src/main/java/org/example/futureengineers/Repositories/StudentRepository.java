package org.example.futureengineers.Repositories;

import org.example.futureengineers.Entities.Quiz;
import org.example.futureengineers.Entities.Student;
import org.example.futureengineers.Entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentRepository extends JpaRepository<Student,Long> {
    Student findStudentByUser(User user);
}
