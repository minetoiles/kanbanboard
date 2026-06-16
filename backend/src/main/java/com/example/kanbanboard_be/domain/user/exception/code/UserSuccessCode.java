package com.example.kanbanboard_be.domain.user.exception.code;

import com.example.kanbanboard_be.global.apiPayload.code.BaseSuccessCode;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum UserSuccessCode implements BaseSuccessCode {
    SIGNUP_SUCCESS(HttpStatus.CREATED, "USER201_1", "회원가입이 완료되었습니다."),
    LOGIN_SUCCESS(HttpStatus.OK, "USER200_1", "로그인에 성공했습니다."),
    LOGOUT_SUCCESS(HttpStatus.OK, "USER200_2", "로그아웃에 성공했습니다."),
    USER_DELETE_SUCCESS(HttpStatus.OK, "USER200_3", "회원탈퇴가 완료되었습니다.");

    private final HttpStatus status;
    private final String code;
    private final String message;
}
