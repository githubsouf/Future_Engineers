package org.example.futureengineers.Repositories;

import org.example.futureengineers.Entities.Event;
import org.example.futureengineers.Entities.Filiere;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {

    List<Event> findByFiliere(Filiere filiere);

    List<Event> findByFiliereId(Long filiereId);
}
