package com.example.eshoppokorny.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class AddressException extends Exception{
    public AddressException(String message) {
        super(message);
    }
}
