package com.brocount.backend.exception;

public class UserNotFoundException extends RuntimeException {

    public UserNotFoundException(Long id) {
        super("Aucun utilisateur trouvé avec l'identifiant : " + id);
    }

    public UserNotFoundException(String email) {
        super("Aucun utilisateur trouvé avec l'email : " + email);
    }
}
