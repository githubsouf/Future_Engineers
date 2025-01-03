package org.example.futureengineers.Services.ServicesInterfaces;

import org.example.futureengineers.Dtos.Request.DirecteurRequestDto;
import org.example.futureengineers.Dtos.Response.DirecteurResponseDto;
import org.example.futureengineers.Entities.Directeur;
import org.example.futureengineers.Entities.User;
import org.example.futureengineers.Repositories.DirecteurRepository;
import org.springframework.stereotype.Service;

@Service
public interface DirecteurService{
    DirecteurResponseDto getDirecteur(Long directeur_id);
    Directeur getDirecteurFromCurrentUser();
    DirecteurResponseDto updateDirecteur(Directeur directeur, DirecteurRequestDto directeurRequest);
}
