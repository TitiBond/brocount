
package com.brocount.backend.exception.dto;

public record FieldValidationError(
                String field,
                String message) {
}
