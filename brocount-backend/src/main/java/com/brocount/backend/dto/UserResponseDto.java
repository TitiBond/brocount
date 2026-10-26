
package com.brocount.backend.dto;

import java.time.Instant;

public record UserResponseDto(
                Long id,
                String email,
                Instant createdAt,
                Instant lastLoginAt,
                String role) {
}
