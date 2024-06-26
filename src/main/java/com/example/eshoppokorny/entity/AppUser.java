package com.example.eshoppokorny.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
        private Long id;
        private String firstName;
        private String lastName;
        private String username;
        private String password;
        private String email;
        private boolean active;
        private Date creation_date;
        private Date update_date;

        @ManyToMany()
        @JsonIgnore
        @JoinTable(name = "app_user_roles", inverseJoinColumns = @JoinColumn(name = "role_id"), joinColumns = @JoinColumn(name = "app_user_id"))
        private List<Role> roles = new ArrayList<>();
        @ManyToOne()
        @JsonIgnore
        private Address address;
        @OneToMany(mappedBy = "appUser", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
        private List<EOrder> eOrders = new ArrayList<>();
        public AppUser(String username, String firstName, String lastName, String email, String password, boolean active, Date creation_date, Date update_date) {
            this.username = username;
            this.firstName = firstName;
            this.lastName = lastName;
            this.email = email;
            this.password = password;
            this.active = active;
            this.creation_date = creation_date;
            this.update_date = update_date;
        }
    }

