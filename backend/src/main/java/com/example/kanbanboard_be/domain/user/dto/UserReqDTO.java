package com.example.kanbanboard_be.domain.user.dto;

public class UserReqDTO {

    public record SignUpReqDTO(
      String name,
      String email,
      String password
    ){}

    public record LoginReqDTO(
            String email,
            String password
    ){}

}
