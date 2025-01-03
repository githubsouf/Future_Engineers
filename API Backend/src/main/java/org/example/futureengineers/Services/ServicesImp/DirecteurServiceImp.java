package org.example.futureengineers.Services.ServicesImp;

import org.example.futureengineers.Dtos.Request.DirecteurRequestDto;
import org.example.futureengineers.Dtos.Response.DirecteurResponseDto;
import org.example.futureengineers.Entities.Directeur;
import org.example.futureengineers.Entities.User;
import org.example.futureengineers.Repositories.DirecteurRepository;
import org.example.futureengineers.Repositories.UserRepository;
import org.example.futureengineers.Services.ServicesInterfaces.DirecteurService;
import org.example.futureengineers.Utils.CurrentUserUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import static org.example.futureengineers.Dtos.Mapper.ConvertDirecteurToDirecteurResponseDto;

@Service
public class DirecteurServiceImp implements DirecteurService {
    private final DirecteurRepository directeurRepository;
    private final UserRepository userRepository;
    private final CurrentUserUtil currentUser;

    @Autowired
    public DirecteurServiceImp(DirecteurRepository directeurRepository, UserRepository userRepository, CurrentUserUtil currentUser) {
        this.directeurRepository = directeurRepository;
        this.userRepository = userRepository;
        this.currentUser = currentUser;
    }

    @Override
    public DirecteurResponseDto getDirecteur(Long directeur_id) {
        Directeur directeur = directeurRepository.findById(directeur_id).get();
        return ConvertDirecteurToDirecteurResponseDto(directeur);
    }

    @Override
    public Directeur getDirecteurFromCurrentUser() {
        User user = currentUser.getCurrentUser();
        return directeurRepository.findDirecteurByUser(user);
    }

    @Override
    public DirecteurResponseDto updateDirecteur(Directeur directeur, DirecteurRequestDto directeurRequest) {
        directeur.getUser().setNom(directeurRequest.getNom());
        directeur.getUser().setPrenom(directeurRequest.getPrenom());
        directeurRepository.save(directeur);

        return ConvertDirecteurToDirecteurResponseDto(directeur);
    }
}
