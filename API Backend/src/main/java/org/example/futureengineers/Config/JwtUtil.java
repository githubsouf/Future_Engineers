package org.example.futureengineers.Config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

@Component
public class JwtUtil {

    private static final SecretKey SECRET_KEY = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    // Générer un token avec l'email et le rôle
    public static String generateToken(String email, String role) {
        return Jwts.builder()
                .setSubject(email) // Sujet principal (email)
                .claim("role", "ROLE_" + role.toUpperCase()) // Ajout du rôle dans les claims
                .setIssuedAt(new Date()) // Date d'émission
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10)) // Expire dans 10 heures
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY) // Signature avec la clé secrète
                .compact();
    }

    // Extraire l'email depuis le token
    public String extractEmail(String token) {
        return extractClaims(token).getSubject();
    }

    // Extraire le rôle depuis le token
    public String extractRole(String token) {
        return extractClaims(token).get("role", String.class);
    }

    public boolean validateToken(String token, String email) {
        return (email.equals(extractEmail(token)) && !isTokenExpired(token));
    }

    private Claims extractClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(SECRET_KEY)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    private boolean isTokenExpired(String token) {
        return extractClaims(token).getExpiration().before(new Date());
    }


}

