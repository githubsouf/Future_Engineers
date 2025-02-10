package org.example.futureengineers.Services.ServicesInterfaces;

import org.example.futureengineers.Entities.Filiere;
import org.example.futureengineers.Entities.User;
import org.example.futureengineers.Repositories.ResultRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ResultService {

    boolean storeQuizeResult(Long idQuize, String filiereLabel);

    List<User> getUsersFromQuizResultByFiliere(Filiere filiere);
}
