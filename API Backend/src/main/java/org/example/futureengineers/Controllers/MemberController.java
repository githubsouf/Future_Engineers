package org.example.futureengineers.Controllers;


import org.example.futureengineers.Dtos.Request.MemberRequestDto;
import org.example.futureengineers.Dtos.Response.MemberResponseDto;
import org.example.futureengineers.Entities.Member;
import org.example.futureengineers.Entities.User;
import org.example.futureengineers.Services.ServicesInterfaces.MemberService;
import org.example.futureengineers.Utils.CurrentUserUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@RestController
@RequestMapping("/api/member")
@PreAuthorize("hasRole('MEMBER')")
public class MemberController {

    private final MemberService memberService;
    private final CurrentUserUtil currentUserUtil;

    public MemberController(MemberService memberService, CurrentUserUtil currentUserUtil) {
        this.memberService = memberService;
        this.currentUserUtil = currentUserUtil;
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getMember(@PathVariable Long id) {
        try {
            User currentUser=currentUserUtil.getCurrentUser();
            Member member=memberService.ReadMemberEntity(id);
            if(currentUser.getId()!=member.getUser().getId()){
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Vous n'êtes pas autorisé à voir cet utilisateur.");
            }
            MemberResponseDto memberResponseDto=memberService.ReadMember(id);
            return ResponseEntity.ok(memberResponseDto);
        }catch (IllegalStateException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @PutMapping("/update-member/{id}")
    public ResponseEntity<?> updateMember(@PathVariable Long id , @RequestBody MemberRequestDto memberRequestDto){
        try {
            User currentUser=currentUserUtil.getCurrentUser();
            Member member=memberService.ReadMemberEntity(id);
            if(currentUser.getId()!=member.getUser().getId()){
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Vous n'êtes pas autorisé à modifier cet utilisateur.");
            }
            MemberResponseDto updatedMember=memberService.update(id,memberRequestDto);
            return ResponseEntity.ok(updatedMember);
        }catch (IllegalStateException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }catch (IllegalArgumentException e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
    @PutMapping("/add-releve-de-note/{id}")
    public ResponseEntity<String> AddReleveDeNote(@PathVariable Long id , @RequestParam("file") MultipartFile file){
        try {
            User currentUser=currentUserUtil.getCurrentUser();
            Member member=memberService.ReadMemberEntity(id);


            if (file.isEmpty()) {
                return ResponseEntity.badRequest().body("Le fichier est vide !");
            }

            // Sauvegarder temporairement le fichier
            File tempFile = File.createTempFile("uploaded-", file.getOriginalFilename());
            file.transferTo(tempFile);

            String base64form=memberService.AddReleveDeNote(id,tempFile.getAbsolutePath());
            return ResponseEntity.ok(base64form);
            } catch (IOException e) {
                    throw new RuntimeException(e);
            }catch (IllegalStateException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

}
