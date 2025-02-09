package org.example.futureengineers.Utils;

import org.example.futureengineers.Dtos.Response.FiliereResponse;
import org.example.futureengineers.Dtos.Response.JobResponseAPiDto;
import org.example.futureengineers.Entities.Filiere;
import org.example.futureengineers.Entities.Job;
import org.example.futureengineers.Repositories.FiliereRepository;
import org.example.futureengineers.Services.ServicesInterfaces.FiliereService;
import org.example.futureengineers.Services.ServicesInterfaces.JobService;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Component
public class TaskSchedule {
    private final FiliereService filiereService;
    private final FiliereRepository filiereRepository;
    private final JobService jobService;

    public TaskSchedule(FiliereService filiereService, FiliereRepository filiereRepository, JobService jobService) {
        this.filiereService = filiereService;
        this.filiereRepository = filiereRepository;
        this.jobService = jobService;
    }

    @Scheduled(cron = "0 49 14 * * ?") // Chaque jour à minuit
    public void FillJobsTable() {


        System.out.println(" Début de la mise à jour de la table Jobs...");

        boolean success = jobService.TruncateTable();
        if (!success) {
            System.err.println("Échec du TRUNCATE sur la table Jobs.");
            return;
        }


        List<FiliereResponse> filiereResponses=filiereService.ReadAll();
        for (FiliereResponse filiereResponse: filiereResponses){
            System.out.println("Appel de l'API de Soufiane pour la filière : " + filiereResponse.getLabel());

            List<JobResponseAPiDto> jobResponseAPiDtos = new ArrayList<>();

            jobResponseAPiDtos.add(new JobResponseAPiDto(
                    "Ingénieur logiciel Java/Ingénieure logiciel Java",
                    "ObjectWare",
                    "https://ma.linkedin.com/jobs/view/ing%C3%A9nieur-logiciel-java-ing%C3%A9nieure-logiciel-java-at-objectware-4143251349?position=1&pageNum=0&refId=kgF5zFWmRzQgNkVZX9X%2BvA%3D%3D&trackingId=S1y6JoNnuqJh3EPhl2NMRA%3D%3D",
                    "Casablanca Metropolitan Area",
                    null
            ));

            jobResponseAPiDtos.add(new JobResponseAPiDto(
                    "Développeur Senior Java Backend",
                    "Societe Generale",
                    "https://ma.linkedin.com/jobs/view/d%C3%A9veloppeur-senior-java-backend-at-societe-generale-4084204051?position=2&pageNum=0&refId=kgF5zFWmRzQgNkVZX9X%2BvA%3D%3D&trackingId=SZtuKAdzdkqK%2FtRghtzZOA%3D%3D",
                    "Casablanca, Casablanca-Settat, Morocco",
                    null
            ));

            jobResponseAPiDtos.add(new JobResponseAPiDto(
                    "Expert Technique Java / Angular (F/H)",
                    "CGI",
                    "https://ma.linkedin.com/jobs/view/expert-technique-java-angular-f-h-at-cgi-4129446499?position=3&pageNum=0&refId=kgF5zFWmRzQgNkVZX9X%2BvA%3D%3D&trackingId=CYHxxq17PLDZmM8U8tSDTA%3D%3D",
                    "Casablanca Metropolitan Area",
                    null
            ));

            jobResponseAPiDtos.add(new JobResponseAPiDto(
                    "Expert Technique Java / Angular (F/H)",
                    "CGI",
                    "https://ma.linkedin.com/jobs/view/expert-technique-java-angular-f-h-at-cgi-4132033777?position=4&pageNum=0&refId=kgF5zFWmRzQgNkVZX9X%2BvA%3D%3D&trackingId=%2FP30tyZ8qfLwItqXwouPUg%3D%3D",
                    "Casablanca Metropolitan Area",
                    null
            ));

            for (JobResponseAPiDto jobResponseAPiDto: jobResponseAPiDtos){
                Job job=new Job();
                job.setCompany(jobResponseAPiDto.getCompany());
                job.setDescription(jobResponseAPiDto.getDescription());
                job.setLink(jobResponseAPiDto.getLink());
                job.setTitle(jobResponseAPiDto.getTitle());
                job.setLocation(jobResponseAPiDto.getLocation());
                Optional<Filiere> filiere=filiereRepository.getFiliereByLabel(filiereResponse.getLabel());
                if (filiere.isPresent()) {
                    job.setFiliere(filiere.get());
                } else {
                    System.err.println("Filière non trouvée pour le label : " + filiereResponse.getLabel());
                    continue;
                }
                boolean added = jobService.AddJob(job);
                if (!added) {
                    System.err.println(" Erreur lors de l'ajout du job : " + job.getTitle());
                } else {
                    System.out.println("Job ajouté avec succès : " + job.getTitle());
                }
            }
            System.out.println("la fillière est mise à jour : " + filiereResponse.getLabel());

        }


        System.out.println("Mise à jour de la table Jobs terminée !");

    }
}
