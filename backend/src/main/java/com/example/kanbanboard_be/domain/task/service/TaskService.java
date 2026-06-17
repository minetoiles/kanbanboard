package com.example.kanbanboard_be.domain.task.service;

import com.example.kanbanboard_be.domain.task.converter.TaskConverter;
import com.example.kanbanboard_be.domain.task.dto.TaskReqDTO;
import com.example.kanbanboard_be.domain.task.dto.TaskResDTO;
import com.example.kanbanboard_be.domain.task.entity.Task;
import com.example.kanbanboard_be.domain.task.enums.Status;
import com.example.kanbanboard_be.domain.task.exception.TaskException;
import com.example.kanbanboard_be.domain.task.exception.code.TaskErrorCode;
import com.example.kanbanboard_be.domain.task.repository.TaskRepository;
import com.example.kanbanboard_be.domain.task.repository.TaskSpecification;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class TaskService {
    private static final Set<String> ALLOWED_SORT_FIELDS = Set.of("priority", "createdAt");
    private static final int MIN_PAGE_SIZE = 1;
    private static final int MAX_PAGE_SIZE = 100;

    private final TaskRepository taskRepository;

    public TaskResDTO.TaskPageResDTO getTasks(
            Status status,
            int page,
            int size,
            String sortBy,
            String sortDirection
    ) {
        validateGetTasksRequest(size, sortBy, sortDirection);

        Specification<Task> spec = Specification.where(TaskSpecification.withStatus(status))
                .and(TaskSpecification.withSort(sortBy, sortDirection));

        Page<Task> taskPage = taskRepository.findAll(spec, PageRequest.of(page, size));
        return TaskConverter.toTaskPageResDTO(taskPage);
    }

    private void validateGetTasksRequest(int size, String sortBy, String sortDirection) {
        if (size < MIN_PAGE_SIZE || size > MAX_PAGE_SIZE) {
            throw new TaskException(TaskErrorCode.INVALID_PAGE_SIZE);
        }

        if (!ALLOWED_SORT_FIELDS.contains(sortBy)) {
            throw new TaskException(TaskErrorCode.INVALID_SORT_FIELD);
        }

        if (!"asc".equalsIgnoreCase(sortDirection) && !"desc".equalsIgnoreCase(sortDirection)) {
            throw new TaskException(TaskErrorCode.INVALID_SORT_FIELD);
        }
    }

    @Transactional
    public TaskResDTO.TaskDTO createTask(TaskReqDTO.CreateTaskReqDTO dto) {
        Task task = TaskConverter.toTask(dto);
        task.getTags().addAll(TaskConverter.tags(dto.tags(), task));
        return TaskConverter.toTaskDTO(taskRepository.save(task));
    }

    @Transactional
    public TaskResDTO.TaskDTO updateTask(Long taskId, TaskReqDTO.UpdateTaskReqDTO dto) {
        Task task = findTask(taskId);
        if (dto.tags() != null) {
            task.getTags().clear();
            task.getTags().addAll(TaskConverter.tags(dto.tags(), task));
        }

        taskRepository.updateTask(
                taskId,
                dto.title(),
                dto.description(),
                dto.priority(),
                dto.status(),
                dto.deadline()
        );
        return TaskConverter.toTaskDTO(findTask(taskId));
    }

    @Transactional
    public TaskResDTO.TaskDTO updateTaskStatus(Long taskId, Status status) {
        findTask(taskId);
        taskRepository.updateStatus(taskId, status);
        return TaskConverter.toTaskDTO(findTask(taskId));
    }

    @Transactional
    public void deleteTask(Long taskId) {
        Task task = findTask(taskId);
        taskRepository.delete(task);
    }

    private Task findTask(Long taskId) {
        return taskRepository.findById(taskId)
                .orElseThrow(() -> new TaskException(TaskErrorCode.TASK_NOT_FOUND));
    }
}
