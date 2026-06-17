package com.example.kanbanboard_be.domain.task.controller;

import com.example.kanbanboard_be.domain.task.controller.docs.TaskControllerDocs;
import com.example.kanbanboard_be.domain.task.dto.TaskReqDTO;
import com.example.kanbanboard_be.domain.task.dto.TaskResDTO;
import com.example.kanbanboard_be.domain.task.enums.Status;
import com.example.kanbanboard_be.domain.task.exception.code.TaskSuccessCode;
import com.example.kanbanboard_be.domain.task.service.TaskService;
import com.example.kanbanboard_be.global.apiPayload.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class TaskController implements TaskControllerDocs {
    private final TaskService taskService;

    @Override
    public ResponseEntity<ApiResponse<TaskResDTO.TaskPageResDTO>> getTasks(
            Status status,
            int page,
            int size,
            String sortDirection
    ) {
        TaskSuccessCode code = TaskSuccessCode.TASK_FETCH_SUCCESS;
        return ResponseEntity.status(code.getStatus())
                .body(ApiResponse.onSuccess(code, taskService.getTasks(status, page, size, "priority", sortDirection)));
    }

    @Override
    public ResponseEntity<ApiResponse<TaskResDTO.TaskDTO>> createTask(TaskReqDTO.CreateTaskReqDTO dto) {
        TaskSuccessCode code = TaskSuccessCode.TASK_CREATE_SUCCESS;
        return ResponseEntity.status(code.getStatus()).body(ApiResponse.onSuccess(code, taskService.createTask(dto)));
    }

    @Override
    public ResponseEntity<ApiResponse<TaskResDTO.TaskDTO>> updateTaskStatus(Long taskId, TaskReqDTO.UpdateTaskStatusReqDTO dto) {
        TaskSuccessCode code = TaskSuccessCode.TASK_STATUS_UPDATE_SUCCESS;
        return ResponseEntity.status(code.getStatus()).body(ApiResponse.onSuccess(code, taskService.updateTaskStatus(taskId, dto.status())));
    }

    @Override
    public ResponseEntity<ApiResponse<TaskResDTO.TaskDTO>> updateTask(Long taskId, TaskReqDTO.UpdateTaskReqDTO dto) {
        TaskSuccessCode code = TaskSuccessCode.TASK_UPDATE_SUCCESS;
        return ResponseEntity.status(code.getStatus()).body(ApiResponse.onSuccess(code, taskService.updateTask(taskId, dto)));
    }

    @Override
    public ResponseEntity<ApiResponse<Void>> deleteTask(Long taskId) {
        TaskSuccessCode code = TaskSuccessCode.TASK_DELETE_SUCCESS;
        taskService.deleteTask(taskId);
        return ResponseEntity.status(code.getStatus()).body(ApiResponse.onSuccess(code, null));
    }
}