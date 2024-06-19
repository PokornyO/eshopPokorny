package com.example.eshoppokorny.mock;

import org.springframework.security.test.context.support.WithSecurityContext;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

@Retention(RetentionPolicy.RUNTIME)
@WithSecurityContext(factory = WithMockUserSecurityContext.class)
public @interface WithMockUser {
    long userId() default  1L;
    String [] authorities() default "ROLE_USER";
}

