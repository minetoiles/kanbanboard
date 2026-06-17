package com.example.kanbanboard_be.domain.task.repository;

import com.example.kanbanboard_be.domain.task.entity.Task;
import com.example.kanbanboard_be.domain.task.enums.Priority;
import com.example.kanbanboard_be.domain.task.enums.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;

public interface TaskRepository extends JpaRepository<Task, Long>, JpaSpecificationExecutor<Task> {
    @Modifying(clearAutomatically = true, flushAutomatically = true)
    @Query("""
            update Task t
            set t.title = case when :title is null then t.title else :title end,
                t.description = case when :description is null then t.description else :description end,
                t.priority = case when :priority is null then t.priority else :priority end,
                t.status = case when :status is null then t.status else :status end,
                t.deadline = case when :deadline is null then t.deadline else :deadline end
            where t.id = :taskId
            """)
    void updateTask(
            Long taskId,
            String title,
            String description,
            Priority priority,
            Status status,
            LocalDate deadline
    );

    @Modifying(clearAutomatically = true, flushAutomatically = true)
    @Query("update Task t set t.status = :status where t.id = :taskId")
    void updateStatus(Long taskId, Status status);
}
