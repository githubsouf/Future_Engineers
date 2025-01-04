package org.example.futureengineers.Services.ServicesInterfaces;


import org.example.futureengineers.Dtos.Request.MemberRequestDto;
import org.example.futureengineers.Dtos.Response.MemberResponseDto;
import org.example.futureengineers.Entities.Member;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public interface MemberService {
    void  delete (Long id);
    MemberResponseDto update(Long id , MemberRequestDto memberRequestDto);
    MemberResponseDto ReadMember(Long id);
    Member ReadMemberEntity(Long id);
    String AddReleveDeNote(Long id , String filePath) throws IOException;
}
