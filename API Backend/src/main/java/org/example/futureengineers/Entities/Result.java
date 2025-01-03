package org.example.futureengineers.Entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Result {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;


    @ManyToOne()
    @JoinColumn(name = "quiz_id")
    private Quiz quiz;

    @ManyToOne()
    @JoinColumn(name = "field_id")
    private Filiere field;

    private int pourcentage;
}
