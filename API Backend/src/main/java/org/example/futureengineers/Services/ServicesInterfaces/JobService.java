package org.example.futureengineers.Services.ServicesInterfaces;


import org.example.futureengineers.Dtos.Response.JobResponseAPiDto;
import org.example.futureengineers.Entities.Filiere;
import org.example.futureengineers.Entities.Job;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface JobService {
    boolean TruncateTable();
    boolean AddJob(Job job);
    List<JobResponseAPiDto> ReadByFiliere(Long filiere_id);
}
