package com.brocount.backend.exception;

public class ExpenseGroupNotFoundException extends RuntimeException {

    public ExpenseGroupNotFoundException(Long id) {
        super("Aucun groupe trouvé avec l'identifiant : " + id);
    }

}
