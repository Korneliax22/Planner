package com.example.planner.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;
    private LocalDate dueTime;

    @ManyToOne(cascade = CascadeType.MERGE)
    @JsonBackReference
    private User user;

    public Task() {
    }

    public Task(String title, String description, LocalDate dueTime, User user) {
        this.title = title;
        this.description = description;
        this.dueTime = dueTime;
        this.user = user;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDate getDueTime() {
        return dueTime;
    }

    public void setDueTime(LocalDate dueTime) {
        this.dueTime = dueTime;
    }
}
