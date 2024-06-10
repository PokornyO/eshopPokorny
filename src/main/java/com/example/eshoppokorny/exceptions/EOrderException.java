package com.example.eshoppokorny.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class EOrderException extends Exception{
    public EOrderException(String message) {
        super(message);
    }
}