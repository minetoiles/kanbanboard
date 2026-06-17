package com.example.kanbanboard_be.domain.user.converter;

import com.example.kanbanboard_be.domain.user.dto.UserReqDTO;
import com.example.kanbanboard_be.domain.user.dto.UserResDTO;
import com.example.kanbanboard_be.domain.user.entity.User;

public class UserConverter {
    public static User toUser(UserReqDTO.SignUpReqDTO dto, String encodedPassword) {
        return User.builder()
                .name(dto.name())
                .email(dto.email())
                .password(encodedPassword)
                .build();
    }

    public static UserResDTO.SignUpResDTO toSignUpResDTO(User user, String accessToken) {
        return UserResDTO.SignUpResDTO.builder()
                .name(user.getName())
                .accessToken(accessToken)
                .tokenType("Bearer")
                .build();
    }

    public static UserResDTO.LoginResDTO toLoginResDTO(User user, String accessToken) {
        return new UserResDTO.LoginResDTO(
                user.getName(),
                accessToken,
                "Bearer"
        );
    }
}
