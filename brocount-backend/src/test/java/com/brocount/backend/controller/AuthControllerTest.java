
// package com.brocount.backend.controller;

// import jakarta.servlet.http.HttpSession;

// import org.junit.jupiter.api.Test;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
// import org.springframework.test.context.bean.override.mockito.MockitoBean;
// import org.springframework.test.web.servlet.MockMvc;

// import org.springframework.security.authentication.AuthenticationManager;
// import org.springframework.security.authentication.BadCredentialsException;

// import static
// org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
// import static
// org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
// import static org.springframework.http.MediaType.APPLICATION_JSON;
// import static org.mockito.Mockito.when;
// import static org.junit.jupiter.api.Assertions.assertEquals;
// import static org.junit.jupiter.api.Assertions.assertNotNull;
// import static org.mockito.ArgumentMatchers.any;
// import static
// org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
// import org.springframework.security.core.Authentication;
// import org.springframework.security.core.context.SecurityContext;
// import
// org.springframework.security.web.context.HttpSessionSecurityContextRepository;
// import
// org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

// @WebMvcTest(AuthController.class)
// class AuthControllerTest {

// @Autowired
// private MockMvc mockMvc;

// @MockitoBean
// private AuthenticationManager authenticationManager;

// @Test
// void loginShouldReturn204WhenCredentialsAreValid() throws Exception {
// Authentication authenticatedUser =
// UsernamePasswordAuthenticationToken.authenticated(
// "test@example.com",
// null,
// java.util.List.of());

// when(authenticationManager.authenticate(any(Authentication.class)))
// .thenReturn(authenticatedUser);

// mockMvc.perform(post("/login")
// .with(csrf())
// .contentType(APPLICATION_JSON)
// .content("""
// {
// "email": "test@example.com",
// "password": "Password123!"
// }
// """))
// .andExpect(status().isNoContent());
// }

// @Test
// void loginShouldReturn401WhenCredentialsAreInvalid() throws Exception {
// when(authenticationManager.authenticate(any(Authentication.class)))
// .thenThrow(new BadCredentialsException("Bad credentials"));

// mockMvc.perform(post("/login")
// .with(csrf())
// .contentType(APPLICATION_JSON)
// .content("""
// {
// "email": "test@example.com",
// "password": "WrongPassword!"
// }
// """))
// .andExpect(status().isUnauthorized());
// }

// @Test
// void loginShouldReturn400WhenEmailIsInvalid() throws Exception {
// mockMvc.perform(post("/login")
// .with(csrf())
// .contentType(APPLICATION_JSON)
// .content("""
// {
// "email": "test@exa$mple.com",
// "password": "Password123!"
// }
// """))
// .andExpect(status().isBadRequest());

// org.mockito.Mockito.verifyNoInteractions(authenticationManager);
// }

// @Test
// void loginShouldReturn400WhenEmailIsMissing() throws Exception {
// mockMvc.perform(post("/login")
// .with(csrf())
// .contentType(APPLICATION_JSON)
// .content("""
// {
// "password": "Password123!"
// }
// """))
// .andExpect(status().isBadRequest());
// org.mockito.Mockito.verifyNoInteractions(authenticationManager);
// }

// @Test
// void loginShouldReturn400WhenJsonIsMalformed() throws Exception {
// mockMvc.perform(post("/login")
// .with(csrf())
// .contentType(APPLICATION_JSON)
// .content("""
// {
// "email": "test@example.com"
// "password": "Password123!"
// }
// """))
// .andExpect(status().isBadRequest());

// org.mockito.Mockito.verifyNoInteractions(authenticationManager);
// }

// @Test
// void loginShouldStoreAuthenticationInSession() throws Exception {
// Authentication authenticatedUser =
// UsernamePasswordAuthenticationToken.authenticated(
// "test@example.com",
// null,
// java.util.List.of());

// when(authenticationManager.authenticate(any(Authentication.class)))
// .thenReturn(authenticatedUser);

// var result = mockMvc.perform(post("/login")
// .with(csrf())
// .contentType(APPLICATION_JSON)
// .content("""
// {
// "email": "test@example.com",
// "password": "Password123!"
// }
// """))
// .andExpect(status().isNoContent())
// .andReturn();

// HttpSession session = result.getRequest().getSession(false);

// assertNotNull(session, "Une session HTTP doit être créée");

// SecurityContext context = (SecurityContext) session.getAttribute(
// HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY);

// assertNotNull(context, "Le SecurityContext doit être stocké dans la
// session");
// assertNotNull(context.getAuthentication(), "L'authentification doit être
// présente");
// assertEquals("test@example.com", context.getAuthentication().getName());
// }

// }
