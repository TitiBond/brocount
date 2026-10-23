
package com.brocount.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.brocount.backend.dto.AddExpenseGroupMemberDto;
import com.brocount.backend.dto.CreateExpenseGroupDto;
import com.brocount.backend.dto.ExpenseGroupResponseDto;
import com.brocount.backend.entity.User;
import com.brocount.backend.mapper.ExpenseGroupMapper;
import com.brocount.backend.service.ExpenseGroupService;
import com.brocount.backend.service.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/expense-groups")
public class ExpenseGroupController {

    private final ExpenseGroupService expenseGroupService;
    private final ExpenseGroupMapper expenseGroupMapper;
    private final UserService userService;

    public ExpenseGroupController(
            ExpenseGroupService expenseGroupService,
            ExpenseGroupMapper expenseGroupMapper,
            UserService userService) {
        this.expenseGroupService = expenseGroupService;
        this.expenseGroupMapper = expenseGroupMapper;
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<ExpenseGroupResponseDto> createGroup(
            @Valid @RequestBody CreateExpenseGroupDto dto,
            Authentication authentication) {

        User creator = userService.getUserByEmail(authentication.getName());

        var createdGroup = expenseGroupService.createGroup(dto.name(), creator);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(expenseGroupMapper.toResponseDto(createdGroup));
    }

    @PostMapping("/expense-groups/{groupId}/members")
    public ResponseEntity<Void> addMemberToGroup(@Valid @RequestBody AddExpenseGroupMemberDto memberToAdd,
            @PathVariable Long groupId, Authentication authentication) {

        User requester = userService.getUserByEmail(authentication.getName());

        expenseGroupService.addMemberToGroup(groupId, memberToAdd.userId(), requester);
        return ResponseEntity.noContent().build();
    }
}
