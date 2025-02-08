package org.example.futureengineers;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
public class FutureEngineersApplication {

    public static void main(String[] args) {
        SpringApplication.run(FutureEngineersApplication.class, args);
    }

}
