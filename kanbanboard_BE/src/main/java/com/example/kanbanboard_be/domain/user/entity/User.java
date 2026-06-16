package com.example.kanbanboard_be.domain.user.entity;

import com.example.kanbanboard_be.domain.task.entity.Task;
import com.example.kanbanboard_be.domain.user.entity.mapping.UserTask;
import com.example.kanbanboard_be.global.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "user")
public class User extends BaseEntity {

    // 현재 프로젝트는 개인 칸반보드 => Task는 User 생명주기를 따름
    // 리스트에서 Task 제거하면 DB에서 삭제
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Task> tasks;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "email", nullable = false)
    private String email;
}
