package org.example.futureengineers.Repositories;

import org.example.futureengineers.Entities.Member;
import org.example.futureengineers.Entities.Quiz;
import org.example.futureengineers.Entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MemberRepository extends JpaRepository<Member,Long> {
    Member findMemberByUser(User user);
}
