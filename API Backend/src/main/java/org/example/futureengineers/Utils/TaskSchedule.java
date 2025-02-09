package org.example.futureengineers.Utils;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.example.futureengineers.Dtos.Response.FiliereResponse;
import org.example.futureengineers.Dtos.Response.JobResponseAPiDto;
import org.example.futureengineers.Entities.Filiere;
import org.example.futureengineers.Entities.Job;
import org.example.futureengineers.Repositories.FiliereRepository;
import org.example.futureengineers.Services.ServicesInterfaces.FiliereService;
import org.example.futureengineers.Services.ServicesInterfaces.JobService;
import org.springframework.http.*;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Component
public class TaskSchedule {
    private final FiliereService filiereService;
    private final FiliereRepository filiereRepository;
    private final JobService jobService;
    private final RestTemplate restTemplate;

    private final String apiUrl = "http://127.0.0.1:8000/jobs"; // FastAPI tourne sur le port 8000

    public TaskSchedule(FiliereService filiereService, FiliereRepository filiereRepository, JobService jobService) {
        this.filiereService = filiereService;
        this.filiereRepository = filiereRepository;
        this.jobService = jobService;
        this.restTemplate = new RestTemplate();
    }

    @Scheduled(cron = "0 00 00 * * ?") // Exécute chaque jour à minuit
    public void FillJobsTable() {
        System.out.println("Début de la mise à jour de la table Jobs...");

        boolean success = jobService.TruncateTable();
        if (!success) {
            System.err.println("Échec du TRUNCATE sur la table Jobs.");
            return;
        }

        List<FiliereResponse> filiereResponses = filiereService.ReadAll();
        for (FiliereResponse filiereResponse : filiereResponses) {
            List<String> jobTitles = getJobTitlesForFiliere(filiereResponse.getLabel());

            if (jobTitles.isEmpty()) {
                System.out.println("Aucune correspondance trouvée pour la filière : " + filiereResponse.getLabel());
                continue; // Passe à la filière suivante
            }

            for (String jobTitle : jobTitles) {
                System.out.println(" Appel de l'API pour la filière " + filiereResponse.getLabel() + " avec le job title : " + jobTitle);

                // Appel API FastAPI
            List<JobResponseAPiDto> jobResponseAPiDtos = fetchJobsFromApi(jobTitle);

            if (jobResponseAPiDtos == null || jobResponseAPiDtos.isEmpty()) {
                System.err.println("Aucun job récupéré pour la filière : " + jobTitle);
                continue;
            }

            for (JobResponseAPiDto jobResponseAPiDto : jobResponseAPiDtos) {
                if (jobResponseAPiDto.getTitle().contains("*")) {
                    System.out.println("Job ignoré car son titre contient '*': " + jobResponseAPiDto.getTitle());
                    continue;
                }
                Job job = new Job();
                job.setCompany(jobResponseAPiDto.getCompany());
                job.setDescription(jobResponseAPiDto.getDescription());
                job.setLink(jobResponseAPiDto.getLink());
                job.setTitle(jobResponseAPiDto.getTitle());
                job.setLocation(jobResponseAPiDto.getLocation());

                Optional<Filiere> filiere = filiereRepository.getFiliereByLabel(filiereResponse.getLabel());
                if (filiere.isPresent()) {
                    job.setFiliere(filiere.get());
                } else {
                    System.err.println("Filière non trouvée pour le label : " + jobTitle);
                    continue;
                }

                boolean added = jobService.AddJob(job);
                if (!added) {
                    System.err.println("Erreur lors de l'ajout du job : " + job.getTitle());
                } else {
                    System.out.println("Job ajouté avec succès : " + job.getTitle());
                }
            }

            System.out.println("La filière est mise à jour : " + jobTitle);
        }}

        System.out.println("Mise à jour de la table Jobs terminée !");
    }

    /**
     * Effectue un appel à l'API FastAPI pour récupérer les offres d'emploi.
     */
    private List<JobResponseAPiDto> fetchJobsFromApi(String filiereLabel) {
        try {
            // Encodage du jobTitle pour éviter les erreurs avec les caractères spéciaux
            String encodedJobTitle = URLEncoder.encode(filiereLabel, StandardCharsets.UTF_8);
            String requestUrl = apiUrl + "?job_title=" + encodedJobTitle + "&location=Morocco&pages=1";

            System.out.println(" Appel API FastAPI : " + requestUrl);

            // Définir les headers (JSON)
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            // Construire la requête HTTP
            HttpEntity<String> requestEntity = new HttpEntity<>(headers);

            // Envoyer la requête GET
            ResponseEntity<JobResponseAPiDto[]> response = restTemplate.exchange(
                    requestUrl,
                    HttpMethod.GET,
                    requestEntity,
                    JobResponseAPiDto[].class
            );

            // Vérifier si la réponse est correcte
            if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
                System.out.println(" Réponse API reçue !");
                return Arrays.asList(response.getBody()); // Convertir en liste
            } else {
                System.err.println(" L'API a renvoyé une réponse vide ou un statut inattendu : " + response.getStatusCode());
                return List.of();
            }

        } catch (Exception e) {
            System.err.println(" Erreur lors de l'appel à l'API : " + e.getMessage());
            return List.of();
        }
    }
    /**
     * Retourne une liste de mots-clés pertinents pour une filière donnée.
     */
    private List<String> getJobTitlesForFiliere(String filiereLabel) {
        return switch (filiereLabel.toLowerCase()) {
            case "informatique" -> Arrays.asList("Développeur", "Administrateur Base de Données", "DevOps", "Data Scientist");
            case "industriel" -> Arrays.asList("Ingénieur Production", "Lean Manager", "Supply Chain Analyst", "Chef de Projet Logistique");
            case "cybersécurité" -> Arrays.asList(
                    "Analyste Cybersécurité", "Ingénieur Sécurité", "Consultant Sécurité", "Pentester", "Architecte Sécurité",
                    "Responsable Sécurité des SI", "Expert SOC", "Threat Intelligence Analyst", "Spécialiste Sécurité Cloud", "Forensic Analyst"
            );
            case "réseaux" -> Arrays.asList("Ingénieur Réseaux", "Administrateur Systèmes", "Architecte Réseau", "Support IT");
            case "environnement" -> Arrays.asList(
                    "Ingénieur Environnement", "Responsable HSE", "Consultant Énergie", "Expert Carbone",  "Chef de Projet Environnement",
                     "Ingénieur Traitement des Eaux", "Technicien Environnement", "Responsable Qualité Environnementale",  "Chargé de Mission Environnement",
                     "Ingénieur Éco-conception"

            );
            case "électrique" -> Arrays.asList("Ingénieur Électricité", "Technicien Électrotechnique", "Chef de Projet Énergie", "Expert Smart Grid");
            default -> List.of(); // Retourne une liste vide si la filière n'est pas reconnue
        };
    }

}
