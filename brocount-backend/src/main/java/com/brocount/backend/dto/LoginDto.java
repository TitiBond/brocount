package com.brocount.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public record LoginDto(
        @NotBlank(message = "L'email est obligatoire") @Email @Pattern(regexp = "^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$", message = "L'adresse email est invalide") String email,

        @NotBlank(message = "Le mot de passe est obligatoire") String password) {
}