package com.example.planner.controllers;

import com.example.planner.model.Task;
import com.example.planner.model.User;
import com.example.planner.repository.TaskRepository;
import com.example.planner.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/tasks")
public class TaskController {

    private TaskRepository taskRepository;
    private UserRepository userRepository;

    @Autowired
    public TaskController(TaskRepository taskRepository, UserRepository userRepository) {
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
    }

    @GetMapping("/{username}")
    public List<Task> getTasksForUser(@PathVariable String username) {
        User user = userRepository.findByUsername(username);
        Long userId = user.getId();
        return taskRepository.findByUserId(userId);
    }

    @PostMapping
    public ResponseEntity<Task> addTask(@RequestBody Task task) {
        taskRepository.save(task);
        return new ResponseEntity<>(task, HttpStatus.CREATED);
    }


}
