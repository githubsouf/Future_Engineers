package org.example.futureengineers.Dtos.Request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class QuizResponsesClient {
    private Map<String, Integer> data;
}
