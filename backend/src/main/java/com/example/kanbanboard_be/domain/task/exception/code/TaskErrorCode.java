package com.example.kanbanboard_be.domain.task.exception.code;

import com.example.kanbanboard_be.global.apiPayload.code.BaseErrorCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum TaskErrorCode implements BaseErrorCode {
    TASK_NOT_FOUND(HttpStatus.NOT_FOUND, "TASK404_1", "태스크를 찾을 수 없습니다."),
    INVALID_TASK_STATUS(HttpStatus.BAD_REQUEST, "TASK400_1", "유효하지 않은 상태값입니다."),
    INVALID_TASK_STATUS_TRANSITION(HttpStatus.BAD_REQUEST, "TASK400_2", "변경할 수 없는 상태입니다."),
    INVALID_SORT_FIELD(HttpStatus.BAD_REQUEST, "TASK400_3", "지원하지 않는 정렬 기준입니다."),
    INVALID_PAGE_SIZE(HttpStatus.BAD_REQUEST, "TASK400_4", "페이지 크기는 1 이상 100 이하여야 합니다."),
    FORBIDDEN_TASK_ACCESS(HttpStatus.FORBIDDEN, "TASK403_1", "해당 태스크에 대한 권한이 없습니다.");

    private final HttpStatus status;
    private final String code;
    private final String message;
}
