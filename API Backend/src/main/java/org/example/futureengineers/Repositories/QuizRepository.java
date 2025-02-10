package org.example.futureengineers.Repositories;

import org.example.futureengineers.Entities.Member;
import org.example.futureengineers.Entities.Quiz;
import org.example.futureengineers.Entities.Result;
import org.example.futureengineers.Entities.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuizRepository extends JpaRepository<Quiz , Long> {

}
