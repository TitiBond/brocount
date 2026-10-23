package com.brocount.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.brocount.backend.entity.AppRole;
import com.brocount.backend.enums.AppRoleEnum;

import java.util.Optional;

public interface AppRoleRepository extends JpaRepository<AppRole, Long> {

    Optional<AppRole> findByName(AppRoleEnum name);
}
