package com.brocount.backend.dto;

public record UserStatResponseDto(
                long totalUsers,
                long totalAdmins,
                long activeUsersLast30Days,
                long totalModerators) {
}