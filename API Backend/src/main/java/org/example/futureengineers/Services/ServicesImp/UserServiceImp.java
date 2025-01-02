package org.example.futureengineers.Services.ServicesImp;

import org.example.futureengineers.Config.JwtUtil;
import org.example.futureengineers.Dtos.Request.LoginRequest;
import org.example.futureengineers.Dtos.Request.RegisterRequest;
import org.example.futureengineers.Entities.*;
import org.example.futureengineers.Repositories.DirecteurRepository;
import org.example.futureengineers.Repositories.MemberRepository;
import org.example.futureengineers.Repositories.StudentRepository;
import org.example.futureengineers.Repositories.UserRepository;
import org.example.futureengineers.Services.ServicesInterfaces.UserService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImp implements UserService {

    private final UserRepository userRepository;
    private final DirecteurRepository directeurRepository;
    private final StudentRepository studentRepository;
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;


    public UserServiceImp(UserRepository userRepository,
                          PasswordEncoder passwordEncoder,
                          JwtUtil jwtUtil ,
                          DirecteurRepository directeurRepository,
                          MemberRepository memberRepository,
                          StudentRepository studentRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil=jwtUtil;
        this.directeurRepository=directeurRepository;
        this.memberRepository=memberRepository;
        this.studentRepository=studentRepository;
    }

    @Override
    public User register(RegisterRequest request) {
        // Validation des données d'entrée
        if (request.getNom() == null || request.getNom().isEmpty()) {
            throw new IllegalArgumentException("Le nom est obligatoire.");
        }
        if (request.getPrenom() == null || request.getPrenom().isEmpty()) {
            throw new IllegalArgumentException("Le prénom est obligatoire.");
        }
        if (request.getEmail() == null || request.getEmail().isEmpty()) {
            throw new IllegalArgumentException("L'email est obligatoire.");
        }
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email déjà utilisé : " + request.getEmail());
        }
        if (request.getMotDePasse() == null || request.getMotDePasse().isEmpty()) {
            throw new IllegalArgumentException("Le mot de passe est obligatoire.");
        }
        if (!request.getMotDePasse().equals(request.getConfirmationMotDePasse())) {
            throw new IllegalArgumentException("Le mot de passe et la confirmation ne correspondent pas.");
        }

        // Création de l'utilisateur
        User user = new User();
        user.setNom(request.getNom());
        user.setPrenom(request.getPrenom());
        user.setEmail(request.getEmail());
        user.setMotDePasse(passwordEncoder.encode(request.getMotDePasse()));


        // Validation et attribution du rôle
        String role = request.getRole();
        if (role.equalsIgnoreCase("Directeur")) {
            user.setRole(Role.directeur);
            Directeur directeur=new Directeur();
            directeur.setUser(user);
            user = userRepository.save(user);
            directeurRepository.save(directeur);
        } else if (role.equalsIgnoreCase("Member")) {
            user.setRole(Role.member);
            Member member=new Member();
            member.setUser(user);
            user = userRepository.save(user);
            memberRepository.save(member);
        } else if (role.equalsIgnoreCase("Student")) {
            user.setRole(Role.student);
            Student student=new Student();
            student.setUser(user);
            user = userRepository.save(user);
            studentRepository.save(student);
        } else {
            throw new IllegalArgumentException("Le rôle doit être 'Directeur', 'Member', ou 'Student'.");
        }


        // Sauvegarde de l'utilisateur
        return user;
    }






    @Override
    public User authenticate(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Email non trouvé"));

        if (!passwordEncoder.matches(request.getMotDePasse(), user.getMotDePasse())) {
            throw new RuntimeException("Mot de passe incorrect");
        }

        return user;
    }
    @Override
    public User getUserFromToken(String token) {
        String email = jwtUtil.extractEmail(token);
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé avec l'email : " + email));
    }
}
