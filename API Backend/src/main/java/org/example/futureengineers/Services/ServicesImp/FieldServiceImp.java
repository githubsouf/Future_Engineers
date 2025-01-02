package org.example.futureengineers.Services.ServicesImp;

import org.example.futureengineers.Dtos.Mapper;
import org.example.futureengineers.Dtos.Response.FieldResponse;
import org.example.futureengineers.Entities.Field;
import org.example.futureengineers.Repositories.FieldRepository;
import org.example.futureengineers.Services.ServicesInterfaces.FieldService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static org.example.futureengineers.Dtos.Mapper.ConvertFieldToFieldResponse;

@Service
public class FieldServiceImp implements FieldService {
    private final FieldRepository fieldRepository;
    private final Mapper mapper;

    public FieldServiceImp(FieldRepository fieldRepository,Mapper mapper){
        this.fieldRepository=fieldRepository;
        this.mapper=mapper;
    }

    @Override
    public List<FieldResponse> ReadAll() {
        List<FieldResponse> fieldResponses = new ArrayList<>();
        fieldRepository.findAll().forEach(filed -> fieldResponses.add(ConvertFieldToFieldResponse(filed)));
        return fieldResponses;
    }
}
