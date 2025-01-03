package org.example.futureengineers.Entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@Table(name = "Students")
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;


    @ManyToOne()
    @JoinColumn(name = "directeur_id")
    private Directeur directeur;

    @Column(name = "releve_note",columnDefinition = "TEXT")
    private String releveDeNote;
}
