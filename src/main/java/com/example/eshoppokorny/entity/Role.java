package com.example.eshoppokorny.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;
    @Data
    @Entity(name = "role")
    public class Role {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private long id;
        private String name;
        @ManyToMany(mappedBy = "roles")
        @ToString.Exclude
        @JsonIgnore
        private List<AppUser> users = new ArrayList<>();
    }

