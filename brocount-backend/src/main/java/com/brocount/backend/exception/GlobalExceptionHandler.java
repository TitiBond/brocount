
package com.brocount.backend.exception;

import jakarta.servlet.http.HttpServletRequest;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ProblemDetail;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import com.brocount.backend.exception.dto.FieldValidationError;

import java.net.URI;
import java.sql.SQLException;
import java.util.List;

@RestControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

        @Override
        protected ResponseEntity<Object> handleMethodArgumentNotValid(
                        MethodArgumentNotValidException exception,
                        HttpHeaders headers,
                        HttpStatusCode status,
                        WebRequest request) {

                List<FieldValidationError> errors = exception.getBindingResult()
                                .getFieldErrors()
                                .stream()
                                .map(error -> new FieldValidationError(
                                                error.getField(),
                                                error.getDefaultMessage()))
                                .toList();

                ProblemDetail problem = ProblemDetail.forStatusAndDetail(
                                status,
                                "Les données envoyées sont invalides");

                problem.setTitle("Erreur de validation");
                problem.setProperty("errors", errors);

                return handleExceptionInternal(
                                exception, problem, headers, status, request);
        }

        @ExceptionHandler(EmailAlreadyExistsException.class)
        public ResponseEntity<ProblemDetail> handleEmailAlreadyExists(
                        EmailAlreadyExistsException exception,
                        HttpServletRequest request) {

                return createProblem(
                                HttpStatus.CONFLICT,
                                exception.getMessage(),
                                request);
        }

        @ExceptionHandler(UserNotFoundException.class)
        public ResponseEntity<ProblemDetail> handleUserNotFound(
                        UserNotFoundException exception,
                        HttpServletRequest request) {

                return createProblem(
                                HttpStatus.NOT_FOUND,
                                exception.getMessage(),
                                request);
        }

        @ExceptionHandler(ExpenseGroupNotFoundException.class)
        public ResponseEntity<ProblemDetail> handleExpenseGroupNotFound(
                        ExpenseGroupNotFoundException exception,
                        HttpServletRequest request) {

                return createProblem(
                                HttpStatus.NOT_FOUND,
                                exception.getMessage(),
                                request);
        }

        @ExceptionHandler(UnauthorizedGroupActionException.class)
        public ResponseEntity<ProblemDetail> handleUnauthorizedGroupAction(
                        UnauthorizedGroupActionException exception,
                        HttpServletRequest request) {

                return createProblem(
                                HttpStatus.FORBIDDEN,
                                exception.getMessage(),
                                request);
        }

        @ExceptionHandler(UserAlreadyMemberException.class)
        public ResponseEntity<ProblemDetail> handleUserAlreadyMember(
                        UserAlreadyMemberException exception,
                        HttpServletRequest request) {

                return createProblem(
                                HttpStatus.CONFLICT,
                                exception.getMessage(),
                                request);
        }

        @ExceptionHandler(DataIntegrityViolationException.class)
        public ResponseEntity<ProblemDetail> handleDataIntegrityViolation(
                        DataIntegrityViolationException exception,
                        HttpServletRequest request) {

                SQLException sqlException = findSQLException(exception);

                if (sqlException != null
                                && "23505".equals(sqlException.getSQLState())) {

                        return createProblem(
                                        HttpStatus.CONFLICT,
                                        "Cette opération entre en conflit avec une donnée existante.",
                                        request);
                }

                // Ne pas masquer une erreur de base de données inattendue.
                throw exception;
        }

        private ResponseEntity<ProblemDetail> createProblem(
                        HttpStatus status,
                        String detail,
                        HttpServletRequest request) {

                ProblemDetail problem = ProblemDetail.forStatusAndDetail(
                                status,
                                detail);

                problem.setTitle(status.getReasonPhrase());
                problem.setInstance(URI.create(request.getRequestURI()));

                return ResponseEntity.status(status).body(problem);
        }

        private SQLException findSQLException(Throwable exception) {
                Throwable current = exception;

                while (current != null) {
                        if (current instanceof SQLException sqlException) {
                                return sqlException;
                        }

                        current = current.getCause();
                }

                return null;
        }
}
