package org.example.futureengineers.Services.ServicesInterfaces;

import org.example.futureengineers.Dtos.Response.QuestionResponse;
import org.example.futureengineers.Entities.Field;
import org.example.futureengineers.Entities.Question;

import java.util.List;

public interface QuestionService {
    List<QuestionResponse> ReadAll();
}
