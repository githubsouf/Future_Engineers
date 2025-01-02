package org.example.futureengineers.Entities;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class QuizResponses {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;


    @ManyToOne()
    @JoinColumn(name = "quiz_id")
    private Quiz quiz;

    @ManyToOne()
    @JoinColumn(name = "question_id")
    private Question question;

    private int value;
}
