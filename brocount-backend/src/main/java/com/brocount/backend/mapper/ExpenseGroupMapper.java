package com.brocount.backend.mapper;

import org.springframework.stereotype.Component;

import com.brocount.backend.dto.ExpenseGroupResponseDto;
import com.brocount.backend.entity.ExpenseGroup;

@Component
public class ExpenseGroupMapper {
    public ExpenseGroupResponseDto toResponseDto(ExpenseGroup group) {
        return new ExpenseGroupResponseDto(group.getId(), group.getName(), group.getCreator().getId());
    }
}
