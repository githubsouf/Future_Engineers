package org.example.futureengineers.Dtos;

import org.example.futureengineers.Dtos.Response.DirecteurResponseDto;
import org.example.futureengineers.Dtos.Response.FiliereResponse;
import org.example.futureengineers.Dtos.Response.QuestionResponse;
import org.example.futureengineers.Dtos.Response.StudentResponceDto;
import org.example.futureengineers.Entities.*;
import org.springframework.stereotype.Component;


@Component
public class Mapper {
    // QUESTION
    public static QuestionResponse ConvertQuestionToQuestionResponse(Question question){
        QuestionResponse questionResponse=new QuestionResponse();
        questionResponse.setId(question.getId());
        questionResponse.setLabel(question.getLabel());
        return questionResponse;
    }
    // FILIERE
    public static FiliereResponse ConvertFiliereToFiliereResponse(Filiere filiere){
        FiliereResponse filiereResponse=new FiliereResponse();
        filiereResponse.setId(filiere.getId());
        filiereResponse.setLabel(filiere.getLabel());
        return filiereResponse;
    }
    // DIRECTEUR
    public static DirecteurResponseDto ConvertDirecteurToDirecteurResponseDto(Directeur directeur) {
        User user = directeur.getUser();
        return DirecteurResponseDto.builder()
                .id(directeur.getId())
                .nom(user.getNom())
                .email(user.getEmail())
                .prenom(user.getPrenom())
                .build();
    }
    //STUDENT
    public static StudentResponceDto ConvertStudentToStudentResponceDto(Student student){
        User user = student.getUser();
        return StudentResponceDto.builder()
                .id(student.getId())
                .nom(user.getNom())
                .prenom(user.getPrenom())
                .email(user.getEmail())
                .build();
    }
}
