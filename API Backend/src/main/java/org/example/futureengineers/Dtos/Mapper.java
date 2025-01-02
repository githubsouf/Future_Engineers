package org.example.futureengineers.Dtos;

import org.example.futureengineers.Dtos.Response.FieldResponse;
import org.example.futureengineers.Dtos.Response.QuestionResponse;
import org.example.futureengineers.Entities.Field;
import org.example.futureengineers.Entities.Question;
import org.springframework.stereotype.Component;


@Component
public class Mapper {

    public static QuestionResponse ConvertQuestionToQuestionResponse(Question question){
        QuestionResponse questionResponse=new QuestionResponse();
        questionResponse.setId(question.getId());
        questionResponse.setLabel(question.getLabel());
        return questionResponse;
    }

    public static FieldResponse ConvertFieldToFieldResponse(Field field){
        FieldResponse fieldResponse=new FieldResponse();
        fieldResponse.setId(field.getId());
        fieldResponse.setLabel(field.getLabel());
        return fieldResponse;
    }
}
