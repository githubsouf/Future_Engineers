package org.example.futureengineers.Services.ServicesInterfaces;

import org.example.futureengineers.Repositories.ResultRepository;
import org.springframework.stereotype.Service;

@Service
public interface ResultService {

    boolean storeQuizeResult(Long idQuize, String filiereLabel);
}
