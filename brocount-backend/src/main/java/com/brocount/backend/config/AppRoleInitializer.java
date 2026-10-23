
package com.brocount.backend.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.brocount.backend.entity.AppRole;
import com.brocount.backend.enums.AppRoleEnum;
import com.brocount.backend.repository.AppRoleRepository;

@Configuration
public class AppRoleInitializer {

    @Bean
    CommandLineRunner initAppRoles(AppRoleRepository appRoleRepository) {
        return args -> {
            for (AppRoleEnum role : AppRoleEnum.values()) {
                if (appRoleRepository.findByName(role).isEmpty()) {
                    appRoleRepository.save(new AppRole(role));
                }
            }
        };
    }
}
