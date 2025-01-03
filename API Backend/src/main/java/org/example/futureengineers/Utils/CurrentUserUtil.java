package org.example.futureengineers.Utils;


import org.example.futureengineers.Entities.User;
import org.example.futureengineers.Repositories.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

@Component
public class CurrentUserUtil {

    private final UserRepository userRepository;

    public CurrentUserUtil(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User getCurrentUser() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof UserDetails) {
            String email = ((UserDetails) principal).getUsername();
            return userRepository.findByEmail(email).orElseThrow(() -> new IllegalStateException("Utilisateur non trouvé."));
        }
        throw new IllegalStateException("Utilisateur non authentifié.");
    }
}