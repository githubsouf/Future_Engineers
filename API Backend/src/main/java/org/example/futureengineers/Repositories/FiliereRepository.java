package org.example.futureengineers.Repositories;


import org.example.futureengineers.Entities.Filiere;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FiliereRepository extends JpaRepository<Filiere,Long> {
    Optional<Filiere> getFiliereByLabel(String label);
}
