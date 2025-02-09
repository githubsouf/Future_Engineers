package org.example.futureengineers.Entities;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@Entity
@Table(name = "Events")
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    private String title;
    private String description;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String image;

    @ManyToOne()
    @JoinColumn(name = "filiere_id")
    private Filiere filiere;

    public Event() {
    }
}