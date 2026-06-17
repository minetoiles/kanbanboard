package com.example.kanbanboard_be.domain.task.dto;

import com.example.kanbanboard_be.domain.task.enums.Priority;
import com.example.kanbanboard_be.domain.task.enums.Status;

import java.time.LocalDate;
import java.util.List;

public class TaskReqDTO {
    public record CreateTaskReqDTO(
            String title,
            String description,
            Priority priority,
            Status status,
            LocalDate deadline,
            List<String> tags
    ) {}

    public record UpdateTaskReqDTO(
            String title,
            String description,
            Priority priority,
            Status status,
            LocalDate deadline,
            List<String> tags
    ) {}

    public record UpdateTaskStatusReqDTO(
            Status status
    ) {}

    public record Tag(
            Long id,
            String name
    ) {}
}
