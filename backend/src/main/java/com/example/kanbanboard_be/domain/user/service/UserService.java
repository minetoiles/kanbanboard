package com.example.kanbanboard_be.domain.user.service;

import com.example.kanbanboard_be.domain.user.converter.UserConverter;
import com.example.kanbanboard_be.domain.user.dto.UserReqDTO;
import com.example.kanbanboard_be.domain.user.dto.UserResDTO;
import com.example.kanbanboard_be.domain.user.entity.User;
import com.example.kanbanboard_be.domain.user.exception.UserException;
import com.example.kanbanboard_be.domain.user.exception.code.UserErrorCode;
import com.example.kanbanboard_be.domain.user.repository.UserRepository;
import com.example.kanbanboard_be.global.security.entity.AuthMember;
import com.example.kanbanboard_be.global.security.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    @Transactional
    public UserResDTO.SignUpResDTO signUp(UserReqDTO.SignUpReqDTO request) {
        if (userRepository.existsByEmail(request.email())) {
            throw new UserException(UserErrorCode.EMAIL_ALREADY_EXISTS);
        }

        User user = UserConverter.toUser(request, passwordEncoder.encode(request.password()));
        User savedUser = userRepository.save(user);
        String accessToken = jwtUtil.createAccessToken(new AuthMember(savedUser));
        return UserConverter.toSignUpResDTO(savedUser, accessToken);
    }

    public UserResDTO.LoginResDTO login(UserReqDTO.LoginReqDTO request) {
        User user = userRepository.findByEmail(request.email())
                .orElseThrow(() -> new UserException(UserErrorCode.LOGIN_FAILED));

        if (!passwordEncoder.matches(request.password(), user.getPassword())) {
            throw new UserException(UserErrorCode.LOGIN_FAILED);
        }

        String accessToken = jwtUtil.createAccessToken(new AuthMember(user));
        return UserConverter.toLoginResDTO(user, accessToken);
    }
}
