package org.example.futureengineers.Controllers;


import org.example.futureengineers.Dtos.Response.JobResponseAPiDto;
import org.example.futureengineers.Entities.Job;
import org.example.futureengineers.Services.ServicesInterfaces.JobService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@PreAuthorize("hasAnyRole('MEMBER', 'STUDENT')")
public class JobController {
    private final JobService jobService;

    public JobController(JobService jobService) {
        this.jobService = jobService;
    }


    @GetMapping("/jobs/filiere/{filiereId}")
    public ResponseEntity<?> getJobsByFiliere(@PathVariable Long filiereId) {
        List<JobResponseAPiDto> jobs = jobService.ReadByFiliere(filiereId);

        if (!jobs.isEmpty()) {
            return ResponseEntity.ok(jobs);
        } else {
            return ResponseEntity.status(404).body("Aucun job trouvé pour la filière avec l'ID : " + filiereId);
        }
    }}
