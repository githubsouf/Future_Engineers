package org.example.futureengineers.Controllers;

import org.example.futureengineers.Dtos.Request.EventRequest;
import org.example.futureengineers.Dtos.Response.EventResponce;
import org.example.futureengineers.Services.ServicesInterfaces.EventService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("event")
@PreAuthorize("hasAnyRole('DIRECTEUR')")
public class EventController {

    private final EventService eventService;

    public EventController(EventService eventService) {
        this.eventService = eventService;
    }
    // C
    @PostMapping(path = "")
    public ResponseEntity<?> createEvent(@ModelAttribute EventRequest eventRequest){

        try {
            eventService.createEvent(eventRequest);

            return ResponseEntity.ok().body(Map.of("Message", "Event créé"));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("Erreur", e.getMessage()));
        }
    }
    // R
    @GetMapping("/{id}")
    public ResponseEntity<?> getEvent(@PathVariable Long id) {
        try {
            EventResponce eventResponce = eventService.getEvent(id);
            return ResponseEntity.ok().body(eventResponce);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("Erreur", e.getMessage()));
        }
    }

    @GetMapping("")
    public ResponseEntity<?> getAllEvents() {
        List<EventResponce> eventResponceList = eventService.getAll();

        return ResponseEntity.ok().body(eventResponceList);
    }

    @GetMapping("/filiere/{filiereId}")
    public ResponseEntity<?> getEventsByFiliere(@PathVariable Long filiereId) {
        try {
            List<EventResponce> eventResponceList = eventService.getEventByFiliere(filiereId);
            return ResponseEntity.ok().body(eventResponceList);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("Erreur",e.getMessage()));
        }
    }
    // U
    @PutMapping("/{eventId}")
    @PatchMapping("/{eventId}")
    public ResponseEntity<?> updateEventById(@PathVariable Long eventId,@ModelAttribute EventRequest eventRequest) {
        try {
            EventResponce eventResponceUpdated = eventService.updateEvent(eventId, eventRequest);

            return ResponseEntity.ok()
                    .body(eventResponceUpdated);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("Erreur", e.getMessage()));
        }
    }

    // D
    @DeleteMapping("/{eventId}")
    public ResponseEntity<?> deleteEventById(@PathVariable Long eventId){
        try {
            eventService.deleteEventById(eventId);
            return ResponseEntity.ok()
                    .body(Map.of("Message", "Event with id=" + eventId + " deleted successfully"));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("Erreur", e.getMessage()));
        }
    }


}
