package com.example.kanbanboard_be.domain.task.converter;

import com.example.kanbanboard_be.domain.task.dto.TaskReqDTO;
import com.example.kanbanboard_be.domain.task.dto.TaskResDTO;
import com.example.kanbanboard_be.domain.task.entity.Tag;
import com.example.kanbanboard_be.domain.task.entity.Task;
import org.springframework.data.domain.Page;

import java.util.List;

public class TaskConverter {
    public static Task toTask(TaskReqDTO.CreateTaskReqDTO dto) {
        return Task.builder()
                .title(dto.title())
                .description(dto.description())
                .priority(dto.priority())
                .status(dto.status())
                .deadline(dto.deadline())
                .build();
    }

    public static TaskResDTO.TaskDTO toTaskDTO(Task task) {
        return new TaskResDTO.TaskDTO(
                task.getId(),
                task.getTitle(),
                task.getDescription(),
                task.getPriority(),
                task.getStatus(),
                task.getDeadline(),
                task.getTags().stream()
                        .map(TaskConverter::toTagDTO)
                        .toList(),
                task.getCreatedAt(),
                task.getUpdatedAt()
        );
    }

    public static TaskResDTO.TaskPageResDTO toTaskPageResDTO(Page<Task> taskPage) {
        return new TaskResDTO.TaskPageResDTO(
                taskPage.getContent().stream()
                        .map(TaskConverter::toTaskDTO)
                        .toList(),
                taskPage.getNumber(),
                taskPage.getSize(),
                taskPage.getTotalElements(),
                taskPage.getTotalPages(),
                taskPage.isLast()
        );
    }

    public static List<Tag> tags(List<String> tags, Task task) {
        if (tags == null) {
            return List.of();
        }

        return tags.stream()
                .filter(tag -> tag != null && !tag.isBlank())
                .map(tag -> Tag.builder()
                        .task(task)
                        .name(tag)
                        .build())
                .toList();
    }

    private static TaskResDTO.TagDTO toTagDTO(Tag tag) {
        return new TaskResDTO.TagDTO(tag.getId(), tag.getName());
    }
}
