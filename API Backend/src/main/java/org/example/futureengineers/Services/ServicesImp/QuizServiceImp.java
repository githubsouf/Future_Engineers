package org.example.futureengineers.Services.ServicesImp;

import org.example.futureengineers.Entities.Member;
import org.example.futureengineers.Entities.Quiz;
import org.example.futureengineers.Entities.Student;
import org.example.futureengineers.Repositories.QuizRepository;
import org.example.futureengineers.Services.ServicesInterfaces.MemberService;
import org.example.futureengineers.Services.ServicesInterfaces.QuizService;
import org.example.futureengineers.Services.ServicesInterfaces.StudentService;
import org.example.futureengineers.Utils.CurrentUserUtil;
import org.springframework.stereotype.Service;

import java.util.Date;


@Service
public class QuizServiceImp implements QuizService {
    private final QuizRepository quizRepository;
    private final CurrentUserUtil currentUserUtil;
    private final StudentService studentService;
    private final MemberService memberService;

    public QuizServiceImp(QuizRepository quizRepository, CurrentUserUtil currentUserUtil, StudentService studentService, MemberService memberService) {
        this.quizRepository = quizRepository;
        this.currentUserUtil = currentUserUtil;
        this.studentService = studentService;
        this.memberService = memberService;
    }


    @Override
    public Quiz CreateQuiz() {
        Quiz quiz=new Quiz();
        if (currentUserUtil.getCurrentUser().getRole().equals("student")){
            Student student=studentService.getStudentFromCurrentUser();
            quiz.setStudent(student);
        } else if (currentUserUtil.getCurrentUser().getRole().equals("member")){
            Member member=memberService.getMemberFromCurrentUser();
            quiz.setMember(member);
        }else {
            return null;
        }
        quiz.setDateCreation(new Date());
        quizRepository.save(quiz);
        return quiz;
    }


}
