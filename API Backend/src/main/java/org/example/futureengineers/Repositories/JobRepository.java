package org.example.futureengineers.Repositories;

import org.example.futureengineers.Entities.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface JobRepository extends JpaRepository<Job,Long> {

    List<Job> findByFiliereId(Long filiere_id);

    @Modifying
    @Transactional
    @Query(value = "TRUNCATE TABLE Jobs RESTART IDENTITY", nativeQuery = true)
    void truncateTable();
}
