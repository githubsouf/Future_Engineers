package org.example.futureengineers.Dtos.Request;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.HashMap;
import java.util.Map;

@Data
public class ModelApiRequestDto {
    @JsonProperty("best_major")
    private String responce;
}
