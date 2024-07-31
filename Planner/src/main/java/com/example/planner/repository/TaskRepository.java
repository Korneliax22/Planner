package com.example.planner.repository;

import com.example.planner.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    Task findById(long id);

    List<Task> findByUserId(Long id);

}
