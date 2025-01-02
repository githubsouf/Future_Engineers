package org.example.futureengineers.Dtos.Request;


import lombok.Data;
import org.example.futureengineers.Entities.Role;

import java.util.Date;

@Data
public class RegisterRequest {
    private String nom;
    private String prenom;
    private String email;
    private String motDePasse;
    private String confirmationMotDePasse;
    private String role;
}
