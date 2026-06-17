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
    String TAG_DESCRIPTION = "태스크 API";

    String TASK_ID_NAME = "taskId";
    String TASK_ID_DESCRIPTION = "태스크 ID";
    String TASK_ID_EXAMPLE = "1";

    @Operation(
            summary = "태스크 목록 조회",
            description = """
                    태스크 목록을 조회합니다.
                    
                    ## 요청형식
                    Authorization 헤더에 JWT 토큰이 필요합니다.
                    """
    )
    @Parameters({
            @Parameter(name = "status", description = "상태 필터 (TODO, IN_PROGRESS, DONE). 미입력 시 전체 조회", example = "TODO"),
            @Parameter(name = "page", description = "페이지 번호 (0부터 시작)", example = "0"),
            @Parameter(name = "size", description = "페이지 크기 (1~100)", example = "10"),
            @Parameter(name = "sortDirection", description = "정렬 방향 (asc, desc). priority,desc는 HIGH 우선", example = "desc")
    })
    @ApiResponses({
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "200",
                    description = "태스크 목록 조회 성공",
                    content = @Content(
                            mediaType = "application/json",
                            examples = @ExampleObject(
                                    name = "태스크 목록 조회 성공",
                                    value = "{\"isSuccess\": true, \"code\": \"TASK200_1\", \"message\": \"태스크 목록을 조회했습니다.\", \"result\": {\"content\": [], \"page\": 0, \"size\": 10, \"totalElements\": 0, \"totalPages\": 0, \"last\": true}}"
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

    @Operation(summary = "태스크 생성")
    @PostMapping
    ResponseEntity<ApiResponse<TaskResDTO.TaskDTO>> createTask(@RequestBody TaskReqDTO.CreateTaskReqDTO dto);

    @Operation(summary = "태스크 상태 변경")
    @PatchMapping("/{taskId}/status")
    ResponseEntity<ApiResponse<TaskResDTO.TaskDTO>> updateTaskStatus(@PathVariable Long taskId, @RequestBody TaskReqDTO.UpdateTaskStatusReqDTO dto);

    @Operation(summary = "태스크 수정")
    @PatchMapping("/{taskId}")
    ResponseEntity<ApiResponse<TaskResDTO.TaskDTO>> updateTask(@PathVariable Long taskId, @RequestBody TaskReqDTO.UpdateTaskReqDTO dto);

    @Operation(summary = "태스크 삭제")
    @DeleteMapping("/{taskId}")
    ResponseEntity<ApiResponse<Void>> deleteTask(@PathVariable Long taskId);
}