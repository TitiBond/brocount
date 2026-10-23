package com.brocount.backend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.brocount.backend.dto.CreateUserDto;
import com.brocount.backend.dto.UserResponseDto;
import com.brocount.backend.entity.User;
import com.brocount.backend.mapper.UserMapper;
import com.brocount.backend.service.UserService;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RequestMapping("/users")
@RestController
public class UserController {

    private final UserService userService;
    private final UserMapper userMapper;

    public UserController(UserService userService, UserMapper userMapper) {
        this.userService = userService;
        this.userMapper = userMapper;

    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public List<UserResponseDto> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return users.stream().map(userMapper::toResponseDto).toList();
    }

    @PreAuthorize("hasRole('ADMIN') or @userService.isCurrentUser(#id, authentication.name)")
    @GetMapping("/{id}")
    public UserResponseDto getUserById(@PathVariable Long id) {
        User user = userService.getUserById(id);
        return userMapper.toResponseDto(user);
    }

    @PostMapping
    public ResponseEntity<UserResponseDto> createUser(
            @Valid @RequestBody CreateUserDto dto) {

        User createdUser = userService.createUser(dto);

        return ResponseEntity.status(HttpStatus.CREATED).body(userMapper.toResponseDto(createdUser));
    }

    @PreAuthorize("hasRole('ADMIN') or @userService.isCurrentUser(#id, authentication.name)")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUserById(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

}
