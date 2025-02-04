package org.example.futureengineers.Services.ServicesImp;

import org.example.futureengineers.Dtos.Mapper;
import org.example.futureengineers.Dtos.Response.FiliereResponse;
import org.example.futureengineers.Entities.Filiere;
import org.example.futureengineers.Repositories.FiliereRepository;
import org.example.futureengineers.Services.ServicesInterfaces.FiliereService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.example.futureengineers.Dtos.Mapper.ConvertFiliereToFiliereResponse;

@Service
public class FiliereServiceImp implements FiliereService {
    private final FiliereRepository filiereRepository;
    private final Mapper mapper;

    public FiliereServiceImp(FiliereRepository filiereRepository, Mapper mapper){
        this.filiereRepository = filiereRepository;
        this.mapper=mapper;
    }

    @Override
    public List<FiliereResponse> ReadAll() {
        List<FiliereResponse> fieldResponses = new ArrayList<>();
        filiereRepository.findAll().forEach(filiere -> fieldResponses.add(ConvertFiliereToFiliereResponse(filiere)));
        return fieldResponses;
    }

    public Optional<FiliereResponse> getFiliereByLabel(String label) {
        Optional<Filiere> optionalFiliere = filiereRepository.getFiliereByLabel(label);

        if (optionalFiliere.isEmpty())
            return Optional.empty();

        FiliereResponse filiereResponse = new FiliereResponse(optionalFiliere.get().getId(), label);
        return Optional.of(filiereResponse);
    }

}
