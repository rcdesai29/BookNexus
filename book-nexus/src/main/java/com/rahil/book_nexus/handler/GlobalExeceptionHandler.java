package com.rahil.book_nexus.handler;

import javax.mail.MessagingException;
import java.util.Set;
import java.util.HashSet;

import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.LockedException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExeceptionHandler {

    @ExceptionHandler(LockedException.class)
    public ResponseEntity<ExceptionResponse> handleException(LockedException exp) {
        return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body(ExceptionResponse.builder()
                        .businessErrorCode(BusinessErrorCodes.ACCOUNT_LOCKED.getCode())
                        .businessErrorDescription(BusinessErrorCodes.ACCOUNT_LOCKED.getDescription())
                        .error(exp.getMessage())
                        .build());

    }

    @ExceptionHandler(DisabledException.class)
    public ResponseEntity<ExceptionResponse> handleException(DisabledException exp) {
        return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body(ExceptionResponse.builder()
                        .businessErrorCode(BusinessErrorCodes.ACCOUNT_DISABLED.getCode())
                        .businessErrorDescription(BusinessErrorCodes.ACCOUNT_DISABLED.getDescription())
                        .error(exp.getMessage())
                        .build());

    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ExceptionResponse> handleException(BadCredentialsException exp) {
        return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body(ExceptionResponse.builder()
                        .businessErrorCode(BusinessErrorCodes.BAD_CREDENTIALS.getCode())
                        .businessErrorDescription(BusinessErrorCodes.BAD_CREDENTIALS.getDescription())
                        .error(BusinessErrorCodes.BAD_CREDENTIALS.getDescription())
                        .build());

    }

    @ExceptionHandler(MessagingException.class)
    public ResponseEntity<ExceptionResponse> handleException(MessagingException exp) {
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ExceptionResponse.builder()
                        .error(exp.getMessage())
                        .build());

    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ExceptionResponse> handleException(MethodArgumentNotValidException exp) {
        Set<String> errors = new HashSet<>();
        exp.getBindingResult()
                .getAllErrors()
                .forEach(error -> {
                    var errorMessage = error.getDefaultMessage();
                    errors.add(errorMessage);
                });
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(ExceptionResponse.builder()
                        .validationErrors(errors)
                        .build());

    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ExceptionResponse> handleException(Exception exp) {
        log.error("Exception: ", exp);
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ExceptionResponse.builder()
                        .businessErrorCode("Internal Error, contact admin")
                        .error(exp.getMessage())
                        .build());

    }
}
