package org.example.futureengineers.Controllers;

import org.example.futureengineers.Config.JwtUtil;
import org.example.futureengineers.Dtos.Request.LoginRequest;
import org.example.futureengineers.Dtos.Request.RegisterRequest;
import org.example.futureengineers.Entities.User;
import org.example.futureengineers.Repositories.UserRepository;
import org.example.futureengineers.Services.ServicesInterfaces.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UserService userService;
    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;

    public AuthController(UserService userService, JwtUtil jwtUtil , UserRepository userRepository) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
        this.userRepository=userRepository;
    }
    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping("/register")
    public ResponseEntity<?> register(@Validated @RequestBody RegisterRequest request) {
        try {
            User user = userService.register(request);
            return ResponseEntity.status(HttpStatus.CREATED).body("Utilisateur enregistré avec succès : " + user.getEmail());
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erreur interne : " + ex.getMessage());
        }
    }
    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            User user = userService.authenticate(request);
            String jwt = jwtUtil.generateToken(user.getEmail(), user.getRole().name());
            System.out.println("User role: " + user.getRole().name());

            // Return the token in the response body
            return ResponseEntity.ok().body(Map.of("token", jwt)); // Return token in a map
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ex.getMessage());
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erreur interne : " + ex.getMessage());
        }
    }
}
