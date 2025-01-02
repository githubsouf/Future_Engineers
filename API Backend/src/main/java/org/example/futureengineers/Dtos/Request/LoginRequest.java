package org.example.futureengineers.Dtos.Request;


import lombok.Data;

@Data
public class LoginRequest {
    private String email;
    private String motDePasse;
}
