package com.brocount.backend.exception;

public class UserAlreadyMemberException extends RuntimeException {

    public UserAlreadyMemberException(Long userId, Long groupId) {
        super("L'utilisateur : " + userId + " est déjà membre du groupe d'id : "
                + groupId);
    }
}
