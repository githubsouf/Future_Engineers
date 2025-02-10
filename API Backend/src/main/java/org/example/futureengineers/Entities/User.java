package org.example.futureengineers.Entities;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Collection;
import java.util.Collections;
import java.util.Date;

@Entity
@Data
@NoArgsConstructor
@Table(name = "Users")
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String nom;

    private String prenom;

    @Column(unique = true, nullable = false)
    private String email;

    private String motDePasse;

    @Enumerated(EnumType.STRING)
    private Role role;



    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.emptyList();
    }

    @Override
    public String getPassword() {
        return motDePasse;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true; // Changez selon vos besoins
    }

    @Override
    public boolean isAccountNonLocked() {
        return true; // Changez selon vos besoins
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true; // Changez selon vos besoins
    }

    @Override
    public boolean isEnabled() {
        return true; // Changez selon vos besoins
    }
}
