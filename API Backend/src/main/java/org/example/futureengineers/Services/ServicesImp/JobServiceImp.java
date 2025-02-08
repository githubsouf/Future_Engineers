package org.example.futureengineers.Services.ServicesImp;


import org.example.futureengineers.Dtos.Mapper;
import org.example.futureengineers.Dtos.Response.JobResponseAPiDto;
import org.example.futureengineers.Entities.Job;
import org.example.futureengineers.Repositories.FiliereRepository;
import org.example.futureengineers.Repositories.JobRepository;
import org.example.futureengineers.Services.ServicesInterfaces.JobService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class JobServiceImp implements JobService {

    private final JobRepository jobRepository;
    private final FiliereRepository filiereRepository;
    private final Mapper mapper;


    public JobServiceImp(JobRepository jobRepository, FiliereRepository filiereRepository, Mapper mapper) {
        this.jobRepository = jobRepository;
        this.filiereRepository = filiereRepository;
        this.mapper = mapper;
    }

    @Override
    public boolean TruncateTable() {
        try {
            jobRepository.truncateTable();
            return true;
        } catch (Exception e) {
            System.err.println("Erreur lors du truncate : " + e.getMessage());
            return false;
        }
    }

    @Override
    public boolean AddJob(Job job) {
        try {
            if (job.getFiliere() != null && filiereRepository.existsById(job.getFiliere().getId())) {
                jobRepository.save(job);
                return true;
            } else {
                System.err.println("Filière associée non trouvée pour le Job.");
                return false;
            }
        } catch (Exception e) {
            System.err.println("Erreur lors de l'ajout du Job : " + e.getMessage());
            return false;
        }
    }


    @Override
    public List<JobResponseAPiDto> ReadByFiliere(Long filiere_id) {
        try {
            if (filiereRepository.existsById(filiere_id)) {
                List<JobResponseAPiDto> jobResponseAPiDtos=new ArrayList<>();
                jobRepository.findByFiliereId(filiere_id).forEach(job -> jobResponseAPiDtos.add(Mapper.ConvertJobToJobResponseDto(job)));
                return jobResponseAPiDtos;
            } else {
                System.err.println("Filière non trouvée avec l'ID : " + filiere_id);
                return List.of();
            }
        } catch (Exception e) {
            System.err.println("Erreur lors de la lecture des jobs pour la filière : " + e.getMessage());
            return List.of();
        }
    }

}
