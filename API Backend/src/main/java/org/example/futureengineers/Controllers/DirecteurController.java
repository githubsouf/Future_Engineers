package org.example.futureengineers.Controllers;

import org.example.futureengineers.Dtos.Response.DirecteurResponseDto;
import org.example.futureengineers.Entities.Directeur;
import org.example.futureengineers.Repositories.DirecteurRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.swing.*;
import java.util.ArrayList;
import java.util.List;

import static org.example.futureengineers.Dtos.Mapper.ConvertDirecteurToDirecteurResponseDto;

@RestController
@RequestMapping("/api/directeurs")
@PreAuthorize("hasRole('DIRECTEUR')")
public class DirecteurController {
    private final DirecteurRepository directeurRepository;

    @Autowired
    public DirecteurController(DirecteurRepository directeurRepository) {
        this.directeurRepository = directeurRepository;
    }

    @GetMapping()
    public ResponseEntity<List<DirecteurResponseDto>> getDirecteurs(HttpMethod httpMethod) {
        List<DirecteurResponseDto> directeurResponseDtos = new ArrayList<>();
        List<Directeur> directeurList = directeurRepository.findAll();
        directeurList.forEach(directeur -> directeurResponseDtos.add(ConvertDirecteurToDirecteurResponseDto(directeur)));
        return new ResponseEntity<>(directeurResponseDtos, HttpStatus.OK);
    }


}
