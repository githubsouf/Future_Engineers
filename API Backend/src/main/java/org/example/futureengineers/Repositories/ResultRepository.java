package org.example.futureengineers.Repositories;

import org.example.futureengineers.Entities.Filiere;
import org.example.futureengineers.Entities.Result;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ResultRepository extends JpaRepository<Result,Long> {
    List<Result> findResultsByField(Filiere field);
}
