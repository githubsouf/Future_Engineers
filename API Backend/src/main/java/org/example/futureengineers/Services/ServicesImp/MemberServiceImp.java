package org.example.futureengineers.Services.ServicesImp;


import org.example.futureengineers.Dtos.Request.MemberRequestDto;
import org.example.futureengineers.Dtos.Response.MemberResponseDto;
import org.example.futureengineers.Entities.Member;
import org.example.futureengineers.Entities.User;
import org.example.futureengineers.Repositories.MemberRepository;
import org.example.futureengineers.Repositories.UserRepository;
import org.example.futureengineers.Services.ServicesInterfaces.MemberService;
import org.example.futureengineers.Utils.CurrentUserUtil;
import org.example.futureengineers.Utils.Files.Base64ImageConverter;
import org.springframework.stereotype.Service;

import java.io.IOException;

import static org.example.futureengineers.Dtos.Mapper.ConvertMemberToMemberResponseDto;



@Service
public class MemberServiceImp implements MemberService {

    private final MemberRepository memberRepository;
    private final UserRepository userRepository;
    private final CurrentUserUtil currentUserUtil;
    private final Base64ImageConverter base64ImageConverter;


    public MemberServiceImp (MemberRepository memberRepository,
                             UserRepository userRepository, CurrentUserUtil currentUserUtil, Base64ImageConverter base64ImageConverter){
        this.memberRepository=memberRepository;
        this.userRepository=userRepository;
        this.currentUserUtil = currentUserUtil;
        this.base64ImageConverter = base64ImageConverter;
    }

    @Override
    public void delete(Long id) {
        userRepository.deleteById(id);
    }

    @Override
    public MemberResponseDto update(Long id, MemberRequestDto memberRequestDto) {
        Member member=memberRepository.findById(id)
                .orElseThrow(()->new IllegalStateException("member with this id does not exist"));

        if (memberRequestDto.getEmail()!=null && !memberRequestDto.getEmail().isEmpty()){
            if(userRepository.existsByEmail(memberRequestDto.getEmail())){
                throw new IllegalArgumentException("Email already exists");
            }else {
                member.getUser().setEmail(memberRequestDto.getEmail());
            }
        }

        if(memberRequestDto.getNom()!=null && !memberRequestDto.getNom().isEmpty()){
            member.getUser().setNom(memberRequestDto.getNom());
        }

        if(memberRequestDto.getPrenom()!=null && !memberRequestDto.getPrenom().isEmpty()){
            member.getUser().setPrenom(memberRequestDto.getPrenom());
        }
        userRepository.save(member.getUser());
        memberRepository.save(member);
        return ConvertMemberToMemberResponseDto(member);
    }

    @Override
    public MemberResponseDto ReadMember(Long id) {
        Member member = memberRepository.findById(id)
                .orElseThrow(()->new IllegalStateException("member with this id does not exist"));
        return ConvertMemberToMemberResponseDto(member);
    }

    @Override
    public Member ReadMemberEntity(Long id) {
        return memberRepository.findById(id)
                .orElseThrow(()->new IllegalStateException("member with this id does not exist"));
    }

    @Override
    public String AddReleveDeNote(Long id, String filePath) throws IOException {
        Member member=memberRepository.findById(id)
                .orElseThrow(()->new IllegalStateException("member with this id does not exist"));
        String releveDeNoteBase64 = base64ImageConverter.convertImageToBase64(filePath);
        member.setReleveDeBote(releveDeNoteBase64);
        memberRepository.save(member);
        return releveDeNoteBase64;
    }

    @Override
    public Member getMemberFromCurrentUser() {
        User user = currentUserUtil.getCurrentUser();
        return memberRepository.findMemberByUser(user);
    }
}
