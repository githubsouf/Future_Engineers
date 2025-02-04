package org.example.futureengineers.Services.ServicesImp;

import org.example.futureengineers.Dtos.Mapper;
import org.example.futureengineers.Dtos.Response.QuestionResponse;
import org.example.futureengineers.Entities.Question;
import org.example.futureengineers.Repositories.QuestionRepository;
import org.example.futureengineers.Services.ServicesInterfaces.QuestionService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static org.example.futureengineers.Dtos.Mapper.ConvertQuestionToQuestionResponse;

@Service
public class QuestionServiceImp implements QuestionService {

    private final QuestionRepository questionRepository;
    private final Mapper mapper;

    public QuestionServiceImp(QuestionRepository questionRepository , Mapper mapper){
        this.questionRepository=questionRepository;
        this.mapper=mapper;
    }

    @Override
    public Page<QuestionResponse> ReadAll(int page) {
        int size = 10; // 🔥 Fixe la pagination à 10 éléments par page
        Pageable pageable = PageRequest.of(page, size);
        Page<Question> questionsPage = questionRepository.findAll(pageable);

        // Convertir `Page<Question>` en `Page<QuestionResponse>`
        return questionsPage.map(Mapper::ConvertQuestionToQuestionResponse);
    }
}
