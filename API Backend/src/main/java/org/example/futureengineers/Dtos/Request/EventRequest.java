package org.example.futureengineers.Dtos.Request;

import lombok.Builder;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
@Builder
public class EventRequest {

    private String title;
    private String description;
    private MultipartFile image;
    private Long filiereId;
}