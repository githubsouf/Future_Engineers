package org.example.futureengineers.Repositories;

import org.example.futureengineers.Entities.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuizRepository extends JpaRepository<Quiz , Long> {
}
