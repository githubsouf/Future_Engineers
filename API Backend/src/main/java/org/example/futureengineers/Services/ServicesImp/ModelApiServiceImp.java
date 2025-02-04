package org.example.futureengineers.Services.ServicesImp;

import org.example.futureengineers.Dtos.Request.ModelApiRequestDto;
import org.example.futureengineers.Services.ServicesInterfaces.ModelApiService;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Service
public class ModelApiServiceImp implements ModelApiService {

    private final RestTemplate restTemplate = new RestTemplate();
    private final String modelApiUrl = "http://0.0.0.0:8000/predict";


    @Override
    public ModelApiRequestDto SendRequestAndFetchResult(Map<String, Integer> requestDto) {
        Map<String,Integer> requestBody =requestDto;

        // Definir le request HTTP avec le type JSON
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        // Construire la requête
        HttpEntity<Map<String, Integer>> requestEntity = new HttpEntity<>(requestBody, headers);

        // Envoyer la requête POST et récupérer la réponse {"best_major" : responce:string }
        ResponseEntity<ModelApiRequestDto> response = restTemplate.postForEntity(modelApiUrl, requestEntity, ModelApiRequestDto.class);

        return response.getBody();
    }



}
