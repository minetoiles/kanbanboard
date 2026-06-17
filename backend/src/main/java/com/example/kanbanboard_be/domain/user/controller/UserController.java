package com.example.kanbanboard_be.domain.user.controller;

import com.example.kanbanboard_be.domain.user.controller.docs.UserControllerDocs;
import com.example.kanbanboard_be.domain.user.dto.UserReqDTO;
import com.example.kanbanboard_be.domain.user.dto.UserResDTO;
import com.example.kanbanboard_be.domain.user.exception.code.UserSuccessCode;
import com.example.kanbanboard_be.domain.user.service.UserService;
import com.example.kanbanboard_be.global.apiPayload.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class UserController implements UserControllerDocs {
    private final UserService userService;

    @Override
    public ResponseEntity<ApiResponse<UserResDTO.SignUpResDTO>> signup(
            UserReqDTO.SignUpReqDTO request
    ){
        UserSuccessCode code = UserSuccessCode.SIGNUP_SUCCESS;
        return ResponseEntity.status(code.getStatus())
                .body(ApiResponse.onSuccess(code, userService.signUp(request)));
    }

    @Override
    public ResponseEntity<ApiResponse<UserResDTO.LoginResDTO>> login(
            UserReqDTO.LoginReqDTO request
    ){
        UserSuccessCode code = UserSuccessCode.LOGIN_SUCCESS;
        return ResponseEntity.status(code.getStatus())
                .body(ApiResponse.onSuccess(code, userService.login(request)));
    }

}
