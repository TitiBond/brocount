package com.brocount.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.brocount.backend.entity.ExpenseGroupMember;

public interface ExpenseGroupMemberRepository extends JpaRepository<ExpenseGroupMember, Long> {

    boolean existsByUser_IdAndGroup_Id(Long userId, Long groupId);
}
