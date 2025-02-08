package org.example.futureengineers.Dtos.Response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class JobResponseAPiDto {

    private String title;
    private String company;
    private String link;
    private String location;
    private String description;
}
