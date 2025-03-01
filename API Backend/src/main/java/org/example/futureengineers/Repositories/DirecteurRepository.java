package org.example.futureengineers.Repositories;

import org.example.futureengineers.Entities.Directeur;
import org.example.futureengineers.Entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface DirecteurRepository extends JpaRepository<Directeur,Long> {

    Directeur findDirecteurByUser(User user);
}
