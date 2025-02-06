package org.example.futureengineers.Services.ServicesInterfaces;

import org.example.futureengineers.Dtos.Response.QuestionResponse;
import org.example.futureengineers.Entities.Question;
import org.springframework.data.domain.Page;

import java.util.List;

public interface QuestionService {
    Page<QuestionResponse> ReadAll(int page);
}
