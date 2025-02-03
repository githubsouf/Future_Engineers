package org.example.futureengineers.Dtos.Response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class QuizResponsesDtoToMethode {
    private Long id;
    private Map<String, Integer> data;
}
