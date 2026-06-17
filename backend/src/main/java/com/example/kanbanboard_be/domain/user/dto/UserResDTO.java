package com.example.kanbanboard_be.domain.user.dto;

import lombok.Builder;

public class UserResDTO {
    @Builder
    public record SignUpResDTO(
            String name,
            String accessToken,
            String tokenType
    ){}

    public record LoginResDTO(
            String name,
            String accessToken,
            String tokenType
    ){}

}
