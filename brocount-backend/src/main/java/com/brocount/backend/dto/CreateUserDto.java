package com.brocount.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record CreateUserDto(

        @NotBlank(message = "Doit contenir le champ 'mail'") @Email @Pattern(regexp = "^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$", message = "L'adresse e-mail doit contenir un domaine valide") String email,

        @NotBlank(message = "Doit contenir le champ 'password'") @Size(min = 8, max = 25) String password) {
}
