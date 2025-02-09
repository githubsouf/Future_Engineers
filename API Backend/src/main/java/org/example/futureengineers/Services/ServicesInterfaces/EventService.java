package org.example.futureengineers.Services.ServicesInterfaces;

import org.example.futureengineers.Dtos.Request.EventRequest;
import org.example.futureengineers.Dtos.Response.EventResponce;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public interface EventService {
    void createEvent(EventRequest eventRequest) throws IOException;

    EventResponce updateEvent(Long eventId, EventRequest newEvent) throws IOException;

    EventResponce getEvent(Long eventId);

    List<EventResponce> getAll();

    List<EventResponce> getEventByFiliere(Long filiereId);

    void deleteEventById(Long eventId);
}
