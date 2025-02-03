package org.example.futureengineers.Services.ServicesImp;

import org.example.futureengineers.Dtos.Request.QuizResponsesClient;
import org.example.futureengineers.Dtos.Response.QuizResponsesDtoToMethode;
import org.example.futureengineers.Entities.Question;
import org.example.futureengineers.Entities.Quiz;
import org.example.futureengineers.Entities.QuizResponses;
import org.example.futureengineers.Repositories.QuestionRepository;
import org.example.futureengineers.Repositories.QuizResponsesRepository;
import org.example.futureengineers.Services.ServicesInterfaces.QuizResponsesService;
import org.example.futureengineers.Services.ServicesInterfaces.QuizService;
import org.springframework.stereotype.Service;

import java.util.Map;


@Service
public class QuizResponsesServiceImp implements QuizResponsesService {
    private final QuizResponsesRepository quizResponsesRepository;
    private final QuizService quizService;
    private final QuestionRepository questionRepository;

    public QuizResponsesServiceImp(QuizResponsesRepository quizResponsesRepository, QuizService quizService, QuestionRepository questionRepository) {
        this.quizResponsesRepository = quizResponsesRepository;
        this.quizService = quizService;
        this.questionRepository = questionRepository;
    }


    @Override
    public QuizResponsesDtoToMethode CreateAllQuizResposnses(QuizResponsesClient quizResponsesClient) {
        Quiz quiz = quizService.CreateQuiz();
        if (quiz == null) {
            return null;
        }
        if (quizResponsesClient == null || quizResponsesClient.getData() == null) {
            return null;
        }

        for (Map.Entry<String, Integer> entry : quizResponsesClient.getData().entrySet()) {
            String questionId = entry.getKey();
            int value = entry.getValue();

            Question question = questionRepository.findById(questionId).orElse(null);
            if (question == null) {
                continue;
            }
            QuizResponses quizResponse = new QuizResponses();
            quizResponse.setQuiz(quiz);
            quizResponse.setQuestion(question);
            quizResponse.setValue(value);

            quizResponsesRepository.save(quizResponse);
        }
        QuizResponsesDtoToMethode quizResponsesDtoToMethode=new QuizResponsesDtoToMethode();
        quizResponsesDtoToMethode.setId(quiz.getId());
        quizResponsesDtoToMethode.setData(quizResponsesClient.getData());

        return quizResponsesDtoToMethode;
    }
}
