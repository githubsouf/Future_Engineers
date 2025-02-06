package org.example.futureengineers.Controllers;

import org.example.futureengineers.Dtos.Response.QuestionResponse;
import org.example.futureengineers.Services.ServicesInterfaces.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/questions")
public class QuestionController {
    private final QuestionService questionService;

    @Autowired
    public QuestionController(QuestionService questionService) {
        this.questionService = questionService;
    }

    @GetMapping
    public ResponseEntity<Page<QuestionResponse>> getAllQuestions(@RequestParam(defaultValue = "0") int page) {
        return ResponseEntity.ok(questionService.ReadAll(page));
    }
}
