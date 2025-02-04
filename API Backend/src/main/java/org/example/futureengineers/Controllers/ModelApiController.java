package org.example.futureengineers.Controllers;

import org.example.futureengineers.Dtos.Request.ModelApiRequestDto;
import org.example.futureengineers.Dtos.Request.QuizResponsesClient;
import org.example.futureengineers.Dtos.Response.QuizResponsesDtoToMethode;
import org.example.futureengineers.Services.ServicesImp.ModelApiServiceImp;
import org.example.futureengineers.Services.ServicesInterfaces.ModelApiService;
import org.example.futureengineers.Services.ServicesInterfaces.QuizResponsesService;
import org.example.futureengineers.Services.ServicesInterfaces.ResultService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@PreAuthorize("hasAnyRole('MEMBER', 'STUDENT')")
public class ModelApiController {

    private final ModelApiService modelApiService;
    private final QuizResponsesService quizResponsesService;
    private final ResultService resultService;

    public ModelApiController(ModelApiService modelApiService, QuizResponsesService quizResponsesService, ResultService resultService) {
        this.modelApiService = modelApiService;
        this.quizResponsesService = quizResponsesService;
        this.resultService = resultService;
    }

    @PostMapping("/quiz/submet")
    public ResponseEntity<?> testApi(@RequestBody QuizResponsesClient request) {
        Map<String,String> response = new HashMap<>();

        try {
            QuizResponsesDtoToMethode responsesToMethode = quizResponsesService.CreateAllQuizResposnses(request);

            Long quizeId = responsesToMethode.getId();
            ModelApiRequestDto apiResponce = modelApiService.SendRequestAndFetchResult(responsesToMethode.getData());

            // calling a methode to store quize result to database
            if ( ! resultService.storeQuizeResult(quizeId, apiResponce.getResponce())) {
                response.put("Erreur", "Failed to store Quize Result !");
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
            }
            response.put("filiere",apiResponce.getResponce());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("Erreur", "Une erreur s'est produite lors du traitement !");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }


    }
}
