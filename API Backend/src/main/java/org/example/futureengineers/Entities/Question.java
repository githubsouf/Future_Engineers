package org.example.futureengineers.Entities;


import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@Table(name = "Questions")
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private String id;

    private String label;

    @OneToMany(mappedBy = "question")
    private List<QuizResponses> quizResponses ;
}
