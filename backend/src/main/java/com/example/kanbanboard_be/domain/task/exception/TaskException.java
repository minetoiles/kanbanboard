package com.example.kanbanboard_be.domain.task.exception;

import com.example.kanbanboard_be.global.apiPayload.code.BaseErrorCode;
import com.example.kanbanboard_be.global.apiPayload.exception.ProjectException;

public class TaskException extends ProjectException {
    public TaskException(BaseErrorCode errorCode) {
        super(errorCode);
    }
}
