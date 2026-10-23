package com.brocount.backend.exception;

public class UnauthorizedGroupActionException extends RuntimeException {

    public UnauthorizedGroupActionException(Long userId, Long groupId) {
        super("L'utilisateur : " + userId + " n'a pas les permissions pour ajouter un utilisateur au groupe d'id : "
                + groupId);
    }
}
