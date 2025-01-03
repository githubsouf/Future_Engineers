package org.example.futureengineers.Services.ServicesImp;

import org.example.futureengineers.Dtos.Mapper;
import org.example.futureengineers.Dtos.Response.QuestionResponse;
import org.example.futureengineers.Repositories.QuestionRepository;
import org.example.futureengineers.Services.ServicesInterfaces.QuestionService;
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
    public List<QuestionResponse> ReadAll() {
        List<QuestionResponse> questionResponses = new ArrayList<>();
        questionRepository.findAll().forEach(question -> questionResponses.add(ConvertQuestionToQuestionResponse(question)));
        return questionResponses;
    }
}
