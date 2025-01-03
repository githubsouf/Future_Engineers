package org.example.futureengineers.Dtos.Response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class StudentResponceDto {
    private Long id;
    private String nom;
    private String prenom;
    private String email;
}
