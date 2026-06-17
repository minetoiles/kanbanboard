
$docsPath = "src/main/java/com/example/kanbanboard_be/domain/task/controller/docs/TaskControllerDocs.java"
$docsContent = @"
package com.example.kanbanboard_be.domain.task.controller.docs;

import com.example.kanbanboard_be.domain.task.dto.TaskReqDTO;
import com.example.kanbanboard_be.domain.task.dto.TaskResDTO;
import com.example.kanbanboard_be.domain.task.enums.Status;
import com.example.kanbanboard_be.global.apiPayload.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Tag(name = TaskControllerDocs.TAG_NAME, description = TaskControllerDocs.TAG_DESCRIPTION)
@RequestMapping("/api/tasks")
public interface TaskControllerDocs {

    String TAG_NAME = "Task";
    String TAG_DESCRIPTION = "??? API";

    String TASK_ID_NAME = "taskId";
    String TASK_ID_DESCRIPTION = "??? ID";
    String TASK_ID_EXAMPLE = "1";

    @Operation(
            summary = "??? ?? ??",
            description = "??? ??? ?????. status? ??? ???, sortDirection?? ???? ?? ??? ??, page/size? ???? ? ????."
    )
    @Parameters({
            @Parameter(name = "status", description = "?? ?? (TODO, IN_PROGRESS, DONE). ??? ? ?? ??", example = "TODO"),
            @Parameter(name = "page", description = "??? ?? (0?? ??)", example = "0"),
            @Parameter(name = "size", description = "??? ?? (1~100)", example = "10"),
            @Parameter(name = "sortDirection", description = "???? ?? ?? (asc, desc). desc? HIGH ??. ???? desc", example = "desc")
    })
    @ApiResponses({
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "200",
                    description = "??? ?? ?? ??",
                    content = @Content(
                            mediaType = "application/json",
                            examples = @ExampleObject(
                                    name = "??? ?? ?? ??",
                                    value = "{\"isSuccess\": true, \"code\": \"TASK200_1\", \"message\": \"??? ??? ??????.\", \"result\": {\"content\": [], \"page\": 0, \"size\": 10, \"totalElements\": 0, \"totalPages\": 0, \"last\": true}}"
                            )
                    )
            )
    })
    @GetMapping
    ResponseEntity<ApiResponse<TaskResDTO.TaskPageResDTO>> getTasks(
            @RequestParam(required = false) Status status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "desc") String sortDirection
    );

    @Operation(summary = "??? ??")
    @PostMapping
    ResponseEntity<ApiResponse<TaskResDTO.TaskDTO>> createTask(@RequestBody TaskReqDTO.CreateTaskReqDTO dto);

    @Operation(summary = "??? ?? ??")
    @PatchMapping("/{taskId}/status")
    ResponseEntity<ApiResponse<TaskResDTO.TaskDTO>> updateTaskStatus(@PathVariable Long taskId, @RequestBody TaskReqDTO.UpdateTaskStatusReqDTO dto);

    @Operation(summary = "??? ??")
    @PatchMapping("/{taskId}")
    ResponseEntity<ApiResponse<TaskResDTO.TaskDTO>> updateTask(@PathVariable Long taskId, @RequestBody TaskReqDTO.UpdateTaskReqDTO dto);

    @Operation(summary = "??? ??")
    @DeleteMapping("/{taskId}")
    ResponseEntity<ApiResponse<Void>> deleteTask(@PathVariable Long taskId);
}
"@
[System.IO.File]::WriteAllText($docsPath, $docsContent, [System.Text.Encoding]::UTF8)

$controllerPath = "src/main/java/com/example/kanbanboard_be/domain/task/controller/TaskController.java"
$controllerContent = @"
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
"@
[System.IO.File]::WriteAllText($controllerPath, $controllerContent, [System.Text.Encoding]::UTF8)

