package com.brocount.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CreateExpenseGroupDto(

        @NotBlank(message = "Le nom du groupe est obligatoire.") @Size(max = 100, message = "Le nom du groupe ne doit pas dépasser 100 caractères.") String name) {
}
