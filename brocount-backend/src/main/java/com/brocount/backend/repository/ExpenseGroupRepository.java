package com.brocount.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.brocount.backend.entity.ExpenseGroup;

public interface ExpenseGroupRepository extends JpaRepository<ExpenseGroup, Long> {

}
