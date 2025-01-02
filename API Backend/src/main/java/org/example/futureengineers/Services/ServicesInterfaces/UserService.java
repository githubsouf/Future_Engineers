package org.example.futureengineers.Services.ServicesInterfaces;

import org.example.futureengineers.Dtos.Request.LoginRequest;
import org.example.futureengineers.Dtos.Request.RegisterRequest;
import org.example.futureengineers.Entities.User;
import org.springframework.stereotype.Service;

@Service
public interface UserService {
    User register(RegisterRequest request);
    User authenticate(LoginRequest request);
    User getUserFromToken(String token);
}
