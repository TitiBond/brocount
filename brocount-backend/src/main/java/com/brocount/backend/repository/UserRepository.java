
package com.brocount.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.brocount.backend.entity.User;
import com.brocount.backend.enums.AppRoleEnum;

import java.time.Instant;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);

    long countByRole_Name(AppRoleEnum roleName);

    long countByLastLoginAtGreaterThanEqual(Instant date);

}
