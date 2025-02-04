package org.example.futureengineers.Services.ServicesImp;

import org.example.futureengineers.Entities.Filiere;
import org.example.futureengineers.Entities.Quiz;
import org.example.futureengineers.Entities.Result;
import org.example.futureengineers.Repositories.FiliereRepository;
import org.example.futureengineers.Repositories.QuizRepository;
import org.example.futureengineers.Repositories.ResultRepository;
import org.example.futureengineers.Services.ServicesInterfaces.ResultService;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ResultServiceImp implements ResultService {

    private final ResultRepository resultRepository;
    private final QuizRepository quizRepository;
    private final FiliereRepository filiereRepository;

    public ResultServiceImp(ResultRepository resultRepository, QuizRepository quizRepository, FiliereRepository filiereRepository) {
        this.resultRepository = resultRepository;
        this.quizRepository = quizRepository;
        this.filiereRepository = filiereRepository;
    }
    @Override
    public boolean storeQuizeResult(Long idQuize, String filiereLabel){
        Optional<Quiz> optionalQuiz = quizRepository.findById(idQuize);
        Optional<Filiere> optionalFiliere = filiereRepository.getFiliereByLabel(filiereLabel);

        if (optionalQuiz.isEmpty() || optionalFiliere.isEmpty())
            return false;

        Result result = new Result();
        result.setQuiz(optionalQuiz.get());
        result.setField(optionalFiliere.get());
        result.setPourcentage(100);

        // storing
        resultRepository.save(result);
        return true;
    }
}
