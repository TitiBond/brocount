package com.brocount.backend.service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Locale;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.brocount.backend.dto.CreateUserDto;
import com.brocount.backend.dto.UserStatResponseDto;
import com.brocount.backend.entity.AppRole;
import com.brocount.backend.entity.User;
import com.brocount.backend.enums.AppRoleEnum;
import com.brocount.backend.exception.EmailAlreadyExistsException;
import com.brocount.backend.exception.UserNotFoundException;
import com.brocount.backend.repository.AppRoleRepository;
import com.brocount.backend.repository.UserRepository;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AppRoleRepository appRoleRepository;

    public UserService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder, AppRoleRepository appRoleRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.appRoleRepository = appRoleRepository;
    }

    public boolean isCurrentUser(Long userId, String authenticatedEmail) {
        return userRepository.findById(userId)
                .map(user -> user.getEmail().equals(authenticatedEmail))
                .orElse(false);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));
    }

    public User getUserByEmail(String email) {
        String normalizedEmail = email.trim().toLowerCase(Locale.ROOT);

        return userRepository.findByEmail(normalizedEmail)
                .orElseThrow(() -> new UserNotFoundException(normalizedEmail));
    }

    public User createUser(CreateUserDto dto) {
        String email = dto.email().trim().toLowerCase(Locale.ROOT);
        boolean isUserExists = userRepository.existsByEmail(email);

        if (isUserExists) {
            throw new EmailAlreadyExistsException("Un utilisateur avec cette adresse email existe déjà.");
        }

        User user = new User();
        user.setEmail(email);
        user.setPasswordHash(passwordEncoder.encode(dto.password()));

        AppRole userRole = appRoleRepository.findByName(AppRoleEnum.USER)
                .orElseThrow(() -> new IllegalStateException(
                        "Le rôle USER n'existe pas en base de données."));

        user.setRole(userRole);

        return userRepository.save(user);
    }

    public void deleteUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));

        userRepository.delete(user);
    }

    public void updateLastLoginAt(String email) {
        User user = getUserByEmail(email);
        user.setLastLoginAt(Instant.now());
        userRepository.save(user);
    }

    public UserStatResponseDto getUserStats() {
        long userCount = userRepository.count();
        long adminCount = userRepository.countByRole_Name(AppRoleEnum.ADMIN);
        long moderatorCount = userRepository.countByRole_Name(AppRoleEnum.MODERATOR);

        Instant thirtyDaysAgo = Instant.now().minus(30, ChronoUnit.DAYS);
        long activeUsers = userRepository.countByLastLoginAtGreaterThanEqual(thirtyDaysAgo);

        return new UserStatResponseDto(
                userCount,
                adminCount,
                activeUsers,
                moderatorCount);
    }
}
