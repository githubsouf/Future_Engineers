package org.example.futureengineers.Entities;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Jobs")
public class Job {


    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String title;
    private String company;
    private String link;
    private String location;
    private String description;

    @ManyToOne()
    @JoinColumn(name = "filiere_id")
    private Filiere filiere;


}
