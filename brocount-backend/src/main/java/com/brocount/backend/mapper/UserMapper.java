package com.brocount.backend.mapper;

import org.springframework.stereotype.Component;

import com.brocount.backend.dto.UserResponseDto;
import com.brocount.backend.entity.User;

@Component
public class UserMapper {
    public UserResponseDto toResponseDto(User user) {
        return new UserResponseDto(user.getId(), user.getEmail(), user.getRole().getName().name());
    }
}
