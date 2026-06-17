package com.example.kanbanboard_be.domain.user.controller.docs;

import com.example.kanbanboard_be.domain.user.dto.UserReqDTO;
import com.example.kanbanboard_be.domain.user.dto.UserResDTO;
import com.example.kanbanboard_be.global.apiPayload.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Tag(name = UserControllerDocs.TAG_NAME, description = UserControllerDocs.TAG_DESCRIPTION)
@RequestMapping("/auth")
public interface UserControllerDocs {

    String TAG_NAME = "User";
    String TAG_DESCRIPTION = "사용자 인증 API";

    @Operation(
            summary = "회원가입",
            description = "새로운 사용자를 등록합니다."
    )
    @ApiResponses({
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "201",
                    description = "회원가입 성공",
                    content = @Content(
                            mediaType = "application/json",
                            examples = @ExampleObject(
                                    name = "회원가입 성공",
                                    value = "{\"isSuccess\": true, \"code\": \"USER201_1\", \"message\": \"회원가입이 완료되었습니다.\", \"result\": {\"name\": \"홍길동\", \"accessToken\": \"eyJhbGci...\", \"tokenType\": \"Bearer\"}}"
                            )
                    )
            )
    })
    @PostMapping("/signup")
    ResponseEntity<ApiResponse<UserResDTO.SignUpResDTO>> signup(
            @RequestBody UserReqDTO.SignUpReqDTO request
    );

    @Operation(
            summary = "로그인",
            description = "이메일과 비밀번호로 로그인합니다."
    )
    @ApiResponses({
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "200",
                    description = "로그인 성공",
                    content = @Content(
                            mediaType = "application/json",
                            examples = @ExampleObject(
                                    name = "로그인 성공",
                                    value = "{\"isSuccess\": true, \"code\": \"USER200_1\", \"message\": \"로그인에 성공했습니다.\", \"result\": {\"name\": \"홍길동\", \"accessToken\": \"eyJhbGci...\", \"tokenType\": \"Bearer\"}}"
                            )
                    )
            )
    })
    @PostMapping("/login")
    ResponseEntity<ApiResponse<UserResDTO.LoginResDTO>> login(
            @RequestBody UserReqDTO.LoginReqDTO request
    );
}
