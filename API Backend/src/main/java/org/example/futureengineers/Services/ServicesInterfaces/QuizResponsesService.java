package org.example.futureengineers.Services.ServicesInterfaces;

import org.example.futureengineers.Dtos.Request.QuizResponsesClient;
import org.example.futureengineers.Dtos.Response.QuizResponsesDtoToMethode;
import org.example.futureengineers.Entities.QuizResponses;

public interface QuizResponsesService {
    QuizResponsesDtoToMethode CreateAllQuizResposnses(QuizResponsesClient quizResponsesClient);
}
