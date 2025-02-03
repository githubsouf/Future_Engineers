package org.example.futureengineers.Services.ServicesInterfaces;

import org.example.futureengineers.Dtos.Request.ModelApiRequestDto;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public interface ModelApiService {

    ModelApiRequestDto SendRequestAndFetchResult(Map<String, Float> requestDto);
}
