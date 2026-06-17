package com.example.kanbanboard_be.domain.task.dto;

import com.example.kanbanboard_be.domain.task.enums.Priority;
import com.example.kanbanboard_be.domain.task.enums.Status;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public class TaskResDTO {
    public record TaskDTO(
            Long id,
            String title,
            String description,
            Priority priority,
            Status status,
            LocalDate deadline,
            List<TagDTO> tags,
            LocalDateTime createdAt,
            LocalDateTime updatedAt
    ) {}

    public record TagDTO(
            Long id,
            String name
    ) {}

    public record TaskPageResDTO(
            List<TaskDTO> content,
            int page,
            int size,
            long totalElements,
            int totalPages,
            boolean last
    ) {}
}
