package com.brocount.backend.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.brocount.backend.entity.ExpenseGroup;
import com.brocount.backend.entity.ExpenseGroupMember;
import com.brocount.backend.entity.User;
import com.brocount.backend.exception.ExpenseGroupNotFoundException;
import com.brocount.backend.exception.UnauthorizedGroupActionException;
import com.brocount.backend.exception.UserAlreadyMemberException;
import com.brocount.backend.repository.ExpenseGroupMemberRepository;
import com.brocount.backend.repository.ExpenseGroupRepository;

@Service
public class ExpenseGroupService {

    private final ExpenseGroupRepository expenseGroupRepository;
    private final ExpenseGroupMemberRepository expenseGroupMemberRepository;
    private final UserService userService;

    public ExpenseGroupService(
            ExpenseGroupRepository expenseGroupRepository, ExpenseGroupMemberRepository expenseGroupMemberRepository,
            UserService userService) {
        this.expenseGroupRepository = expenseGroupRepository;
        this.expenseGroupMemberRepository = expenseGroupMemberRepository;
        this.userService = userService;
    }

    @Transactional
    public ExpenseGroup createGroup(String name, User creator) {
        ExpenseGroup group = new ExpenseGroup(name, creator);
        ExpenseGroup savedGroup = expenseGroupRepository.save(group);

        ExpenseGroupMember groupMember = new ExpenseGroupMember(savedGroup, creator);
        expenseGroupMemberRepository.save(groupMember);

        return savedGroup;
    }

    @Transactional
    public void addMemberToGroup(Long groupId, Long userId, User authenticatedUser) {
        ExpenseGroup group = expenseGroupRepository.findById(groupId)
                .orElseThrow(() -> new ExpenseGroupNotFoundException(groupId));

        if (!group.getCreator().getId().equals(authenticatedUser.getId())) {
            throw new UnauthorizedGroupActionException(authenticatedUser.getId(), groupId);
        }

        if (expenseGroupMemberRepository.existsByUser_IdAndGroup_Id(userId, groupId)) {
            throw new UserAlreadyMemberException(userId, groupId);
        }

        User userToAdd = userService.getUserById(userId);
        expenseGroupMemberRepository.save(new ExpenseGroupMember(group, userToAdd));
    }

}
