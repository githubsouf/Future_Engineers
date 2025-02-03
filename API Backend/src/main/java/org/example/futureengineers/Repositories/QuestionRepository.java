package org.example.futureengineers.Repositories;

import org.example.futureengineers.Entities.Question;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionRepository extends JpaRepository<Question,String> {
}
