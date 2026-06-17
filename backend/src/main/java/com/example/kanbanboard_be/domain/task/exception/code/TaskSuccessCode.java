package com.example.kanbanboard_be.domain.task.exception.code;

import com.example.kanbanboard_be.global.apiPayload.code.BaseSuccessCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum TaskSuccessCode implements BaseSuccessCode {
    TASK_CREATE_SUCCESS(HttpStatus.CREATED, "TASK201_1", "태스크를 생성했습니다."),
    TASK_FETCH_SUCCESS(HttpStatus.OK, "TASK200_1", "태스크 목록을 조회했습니다."),
    TASK_DETAIL_SUCCESS(HttpStatus.OK, "TASK200_2", "태스크를 조회했습니다."),
    TASK_UPDATE_SUCCESS(HttpStatus.OK, "TASK200_3", "태스크를 수정했습니다."),
    TASK_STATUS_UPDATE_SUCCESS(HttpStatus.OK, "TASK200_4", "태스크 상태를 변경했습니다."),
    TASK_DELETE_SUCCESS(HttpStatus.OK, "TASK200_5", "태스크를 삭제했습니다.");

    private final HttpStatus status;
    private final String code;
    private final String message;
}
