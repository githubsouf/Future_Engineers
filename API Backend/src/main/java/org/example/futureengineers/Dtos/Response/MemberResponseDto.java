package org.example.futureengineers.Dtos.Response;

import lombok.Data;

@Data
public class MemberResponseDto {
    private Long id;
    private String releveDeBote;
    private String nom;
    private String prenom;
    private String email;
}
