package org.example.futureengineers.Services.ServicesInterfaces;


import org.example.futureengineers.Dtos.Response.FiliereResponse;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public interface FiliereService {
    List<FiliereResponse> ReadAll();
}
