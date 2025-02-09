package org.example.futureengineers.Dtos.Response;

import jakarta.persistence.Lob;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class EventResponce {

    private Long id;

    private String title;
    private String description;

    private String filiere;

    @Lob
    private String imageBase64;
}