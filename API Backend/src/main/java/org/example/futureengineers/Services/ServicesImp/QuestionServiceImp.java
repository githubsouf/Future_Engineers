package org.example.futureengineers.Services.ServicesImp;

import org.example.futureengineers.Dtos.Mapper;
import org.example.futureengineers.Dtos.Response.QuestionResponse;
import org.example.futureengineers.Repositories.QuestionRepository;
import org.example.futureengineers.Services.ServicesInterfaces.QuestionService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class QuestionServiceImp implements QuestionService {

    private final QuestionRepository questionRepository;
    private final Mapper mapper;

    public QuestionServiceImp(QuestionRepository questionRepository , Mapper mapper){
        this.questionRepository=questionRepository;
        this.mapper=mapper;
    }

    @Override
    public List<QuestionResponse> ReadAll() {
        return questionRepository.findAll()
                .stream()
                .map(mapper::ConvertQuestionToQuestionResponse)
                .collect(Collectors.toList());
    }
}
