package com.example.kanbanboard_be.domain.user.exception.code;

import com.example.kanbanboard_be.global.apiPayload.code.BaseErrorCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum UserErrorCode implements BaseErrorCode {
    USER_NOT_FOUND(HttpStatus.NOT_FOUND, "USER404_1", "사용자를 찾을 수 없습니다."),
    EMAIL_ALREADY_EXISTS(HttpStatus.CONFLICT, "USER409_1", "이미 사용 중인 이메일입니다."),
    LOGIN_FAILED(HttpStatus.UNAUTHORIZED, "USER401_1", "이메일 또는 비밀번호가 올바르지 않습니다."),
    FORBIDDEN_USER(HttpStatus.FORBIDDEN, "USER403_1", "해당 작업에 대한 권한이 없습니다."),
    ;

    private final HttpStatus status;
    private final String code;
    private final String message;
}
