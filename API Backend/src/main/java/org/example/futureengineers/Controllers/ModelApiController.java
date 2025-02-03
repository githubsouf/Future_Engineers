package org.example.futureengineers.Controllers;

import org.example.futureengineers.Dtos.Request.ModelApiRequestDto;
import org.example.futureengineers.Services.ServicesImp.ModelApiServiceImp;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class ModelApiController {

    private final ModelApiServiceImp modelApiService;

    public ModelApiController(ModelApiServiceImp modelApiService) {
        this.modelApiService = modelApiService;
    }

    @PostMapping("/testing") //quize-result
    public ResponseEntity<?> testApi(@RequestBody Map<String,Float> request) {
        int quizeId = 1;
        ModelApiRequestDto responce = modelApiService.SendRequestAndFetchResult(request);
        return ResponseEntity.ok(responce);


    }
}
