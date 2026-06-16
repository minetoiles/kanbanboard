package com.example.kanbanboard_be.domain.user.exception;

import com.example.kanbanboard_be.global.apiPayload.code.BaseErrorCode;
import com.example.kanbanboard_be.global.apiPayload.exception.ProjectException;

public class UserException extends ProjectException {
    public UserException(BaseErrorCode errorCode) {
        super(errorCode);
    }
}
