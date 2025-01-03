package org.example.futureengineers.Controllers;

import org.example.futureengineers.Dtos.Request.DirecteurRequestDto;
import org.example.futureengineers.Dtos.Response.DirecteurResponseDto;
import org.example.futureengineers.Entities.Directeur;
import org.example.futureengineers.Entities.User;
import org.example.futureengineers.Repositories.DirecteurRepository;
import org.example.futureengineers.Repositories.UserRepository;
import org.example.futureengineers.Services.ServicesImp.DirecteurServiceImp;
import org.example.futureengineers.Services.ServicesInterfaces.DirecteurService;
import org.example.futureengineers.Utils.CurrentUserUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.swing.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.example.futureengineers.Dtos.Mapper.ConvertDirecteurToDirecteurResponseDto;

@RestController
@RequestMapping("/api/directeur")
@PreAuthorize("hasRole('DIRECTEUR')")
public class DirecteurController {
    private final DirecteurRepository directeurRepository;
    private final DirecteurService directeurService;
    private final CurrentUserUtil currentUser;
    private final UserRepository userRepository;


    @Autowired
    public DirecteurController(DirecteurRepository directeurRepository, DirecteurService directeurService, CurrentUserUtil currentUser, UserRepository userRepository) {
        this.directeurRepository = directeurRepository;
        this.directeurService = directeurService;
        this.currentUser = currentUser;
        this.userRepository = userRepository;
    }

    @GetMapping
    public ResponseEntity<?> getDirecteur() {
        User user = currentUser.getCurrentUser();
        return ResponseEntity.ok().body(directeurService.getDirecteur(user.getId()));
    }

    @PutMapping
    public ResponseEntity<?> updateDirecteur(@RequestBody final DirecteurRequestDto directeurRequest){
        Directeur directeur = directeurService.getDirecteurFromCurrentUser();
        directeurService.updateDirecteur(directeur, directeurRequest);
        return ResponseEntity.ok().body(ConvertDirecteurToDirecteurResponseDto(directeur));
    }

    @DeleteMapping
    public ResponseEntity<?> deleteDirecteur(){
        Directeur directeur = directeurService.getDirecteurFromCurrentUser();
        directeurRepository.delete(directeur);
        return ResponseEntity.ok("Directeur est bien supprimer!");
    }




}
