package com.example.eshoppokorny.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Entity
    public class AppUser {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private long id;

        private String username;
        private String password;
        private String email;
        private boolean active;
        private Date creation_date;
        private Date update_date;

        @ManyToMany()
        @JoinTable(name = "app_user_roles", inverseJoinColumns = @JoinColumn(name = "role_id"), joinColumns = @JoinColumn(name = "app_user_id"))
        private List<Role> roles = new ArrayList<>();

        public AppUser(String username, String password, boolean active, Date creation_date, Date update_date) {
            this.username = username;
            this.password = password;
            this.active = active;
            this.creation_date = creation_date;
            this.update_date = update_date;
        }
    }

