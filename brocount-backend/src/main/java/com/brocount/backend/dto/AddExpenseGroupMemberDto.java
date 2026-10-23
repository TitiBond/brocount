package com.brocount.backend.dto;

import jakarta.validation.constraints.NotNull;

public record AddExpenseGroupMemberDto(

                @NotNull(message = "L'id de l'user est obligatoire.") Long userId) {
}
