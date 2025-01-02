package org.example.futureengineers.Entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@Table(name = "Quizes")
public class Quiz {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Temporal(TemporalType.DATE)
    private Date dateCreation;

    @ManyToOne()
    @JoinColumn(name = "student_id")
    private Student student;

    @ManyToOne()
    @JoinColumn(name = "member_id")
    private Member member;

    @OneToMany(mappedBy = "quiz")
    private List<QuizResponses> quizResponses ;

    @OneToMany(mappedBy = "quiz")
    private List<Result> results ;
}
