package org.example.futureengineers.Services.ServicesInterfaces;

import org.example.futureengineers.Dtos.Response.FieldResponse;
import org.example.futureengineers.Entities.Field;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public interface FieldService {
    List<FieldResponse> ReadAll();
}
