package com.example.kanbanboard_be.global.security.service;

import com.example.kanbanboard_be.domain.user.entity.User;
import com.example.kanbanboard_be.domain.user.exception.UserException;
import com.example.kanbanboard_be.domain.user.exception.code.UserErrorCode;
import com.example.kanbanboard_be.domain.user.repository.UserRepository;
import com.example.kanbanboard_be.global.security.entity.AuthMember;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(
            String username
    ) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new UserException(UserErrorCode.USER_NOT_FOUND));
        return new AuthMember(user);
    }
}
