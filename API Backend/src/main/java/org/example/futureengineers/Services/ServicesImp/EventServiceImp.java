package org.example.futureengineers.Services.ServicesImp;

import jakarta.mail.MessagingException;
import org.example.futureengineers.Dtos.Mapper;
import org.example.futureengineers.Dtos.Request.EventRequest;
import org.example.futureengineers.Dtos.Response.EventResponce;
import org.example.futureengineers.Entities.Event;
import org.example.futureengineers.Entities.Filiere;
import org.example.futureengineers.Entities.User;
import org.example.futureengineers.Repositories.EventRepository;
import org.example.futureengineers.Repositories.FiliereRepository;
import org.example.futureengineers.Services.ServicesInterfaces.EventService;
import org.example.futureengineers.Services.ServicesInterfaces.ResultService;
import org.example.futureengineers.Utils.Files.Base64ImageConverter;
import org.example.futureengineers.Utils.HtmlEmailUtil;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class EventServiceImp  implements EventService {

    private final FiliereRepository filiereRepo;
    private final EventRepository eventRepo;
    private final ResultService resultService;
    private final HtmlEmailUtil emailUtil;

    public EventServiceImp(FiliereRepository filiereRepo, EventRepository eventRepo, ResultService resultService, HtmlEmailUtil emailUtil) {
        this.filiereRepo = filiereRepo;
        this.eventRepo = eventRepo;
        this.resultService = resultService;
        this.emailUtil = emailUtil;
    }

    @Override
    public void createEvent(EventRequest eventRequest) throws IOException {

        Filiere filiere = filiereRepo.findById(eventRequest.getFiliereId())
                .orElseThrow(() -> new IOException("Id filière inexistant !"));

        String base64Image = Base64ImageConverter.convertImageToBase64(eventRequest.getImage());

        Event newEvent = Event.builder()
                .title(eventRequest.getTitle())
                .image(base64Image)
                .description(eventRequest.getDescription())
                .filiere(filiere)
                .build();

        eventRepo.save(newEvent);
        System.out.println("✅ : Event created .");
    }

    @Override
    public EventResponce updateEvent(Long eventId, EventRequest newEvent) throws IOException {

        Event event = eventRepo.findById(eventId).orElse(null);
        if (event == null) throw new IllegalArgumentException("le eventId passé n'exist pas !");

        Filiere filiere = newEvent.getFiliereId() == null
                ? event.getFiliere()
                : filiereRepo.findById(newEvent.getFiliereId())
                .orElseThrow( () -> new RuntimeException("le nouveau FilièreId choisie n'existe pas !"));

        String base64Image = newEvent.getImage() == null
                ? event.getImage()
                : Base64ImageConverter.convertImageToBase64(newEvent.getImage());

        String title = newEvent.getTitle() == null
                ? event.getTitle()
                : newEvent.getTitle();
        String description = newEvent.getDescription() == null
                ? event.getDescription()
                : newEvent.getDescription();


        event = Event.builder()
                .id(eventId)
                .title(title)
                .description(description)
                .image(base64Image)
                .filiere(filiere)
                .build();

        eventRepo.save(event);

        return Mapper.ConvertEventToEventResponce(event);
    }

    @Override
    public EventResponce getEvent(Long eventId) throws IllegalArgumentException {
        Event event = eventRepo.findById(eventId)
                .orElseThrow(() -> new IllegalArgumentException("aucune event avec l'id : " + eventId));

        return Mapper.ConvertEventToEventResponce(event);
    }

    @Override
    public List<EventResponce> getAll() {
        List<Event> eventList = eventRepo.findAll();
        if (eventList == null) throw new RuntimeException("erreur dans 'eventRepo.findAll()'");
        List<EventResponce> eventResponceList = new ArrayList<>();

        for (Event event : eventList)
            eventResponceList.add( Mapper.ConvertEventToEventResponce(event));

        return eventResponceList;
    }

    @Override
    @Transactional
    public List<EventResponce> getEventByFiliere(Long filiereId) {
        Filiere filiere = filiereRepo.findById(filiereId)
                .orElseThrow( () -> new IllegalArgumentException("aucune filière avec l'id = " + filiereId ) );
        List<Event> events = eventRepo.findByFiliere(filiere);
        List<EventResponce> eventResponces = new ArrayList<>();

        events.forEach( event
                -> eventResponces.add( Mapper.ConvertEventToEventResponce(event) )
                );
        return eventResponces;
    }

    @Override
    public void deleteEventById(Long eventId) {
        Event event = eventRepo.findById(eventId)
                .orElseThrow(() -> new IllegalArgumentException("aucune event avec l'id : " + eventId));

        eventRepo.delete(event);
    }

    @Transactional
    @Override
    public void sendEmailsByField(Long filiereId) throws IllegalArgumentException, MessagingException {
        Filiere filiere = filiereRepo.findById(filiereId)
                .orElseThrow( () -> new IllegalArgumentException("aucune filière avec l'id = " + filiereId ) );

        List<EventResponce> events = getEventByFiliere(filiereId);
        List<User> users = resultService.getUsersFromQuizResultByFiliere(filiere);

        for (User user : users)
            emailUtil.SendEventsByMail(user,events);

    }
}

