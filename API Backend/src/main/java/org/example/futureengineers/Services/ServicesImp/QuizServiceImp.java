package org.example.futureengineers.Services.ServicesImp;

import org.example.futureengineers.Entities.*;
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
        Quiz quiz = new Quiz();

        // 🟢 Vérification si currentUserUtil.getCurrentUser() fonctionne
        User currentUser = currentUserUtil.getCurrentUser();
        if (currentUser == null) {
            System.out.println("❌ ERREUR: Aucun utilisateur connecté.");
            return null;
        }

        System.out.println("👤 Utilisateur connecté: " + currentUser.getUsername() + " - Rôle: " + currentUser.getRole());

        // 🟢 Vérification du rôle de l'utilisateur
        if (currentUser.getRole() == Role.student) {
            Student student = studentService.getStudentFromCurrentUser();
            if (student != null) {
                quiz.setStudent(student);
                System.out.println("✅ Étudiant associé au quiz.");
            }
        }
        else if (currentUser.getRole() == Role.member) {
            Member member = memberService.getMemberFromCurrentUser();
            if (member != null) {
                quiz.setMember(member);
                System.out.println("✅ Membre associé au quiz.");
            }

        }
        else {
            System.out.println("❌ ERREUR: Rôle inconnu -> " + currentUser.getRole());
            return null;
        }

        // 🟢 Définition de la date de création
        quiz.setDateCreation(new Date());

        // 🟢 Sauvegarde du quiz en base
        quizRepository.save(quiz);
        System.out.println("✅ Quiz créé avec ID: " + quiz.getId());

        return quiz;
    }


}
