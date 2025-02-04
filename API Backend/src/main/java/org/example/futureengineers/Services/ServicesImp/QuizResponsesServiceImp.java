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
        // 🟢 Vérification si quizService.CreateQuiz() fonctionne bien
        Quiz quiz = quizService.CreateQuiz();
        if (quiz == null) {
            System.out.println("❌ ERREUR: Le Quiz n'a pas été créé.");
            return null;
        }

        // 🟢 Vérification si quizResponsesClient contient bien des données
        if (quizResponsesClient == null || quizResponsesClient.getData() == null) {
            System.out.println("❌ ERREUR: Les données du QuizResponsesClient sont nulles.");
            return null;
        }

        System.out.println("✅ Quiz créé avec ID: " + quiz.getId());
        System.out.println("📩 Données reçues: " + quizResponsesClient.getData());

        for (Map.Entry<String, Integer> entry : quizResponsesClient.getData().entrySet()) {
            String questionId = entry.getKey();
            int value = entry.getValue();

            // 🟢 Vérification si la question existe en base
            Question question = questionRepository.findById(questionId).orElse(null);
            if (question == null) {
                System.out.println("⚠ Avertissement: La question avec ID '" + questionId + "' n'existe pas en base.");
                continue; // Passer cette question si elle n'existe pas
            }

            // 🟢 Création de la réponse associée
            QuizResponses quizResponse = new QuizResponses();
            quizResponse.setQuiz(quiz);
            quizResponse.setQuestion(question);
            quizResponse.setValue(value);

            // 🟢 Sauvegarde de la réponse
            quizResponsesRepository.save(quizResponse);
            System.out.println("✅ Réponse sauvegardée: Question ID = " + questionId + ", Valeur = " + value);
        }

        // 🟢 Création de l'objet DTO
        QuizResponsesDtoToMethode quizResponsesDtoToMethode = new QuizResponsesDtoToMethode();
        quizResponsesDtoToMethode.setId(quiz.getId());
        quizResponsesDtoToMethode.setData(quizResponsesClient.getData());

        System.out.println("✅ Retour de DTO avec Quiz ID: " + quizResponsesDtoToMethode.getId());
        return quizResponsesDtoToMethode;
    }
}
