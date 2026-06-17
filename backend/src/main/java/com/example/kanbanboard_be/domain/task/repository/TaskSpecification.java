package com.example.kanbanboard_be.domain.task.repository;

import com.example.kanbanboard_be.domain.task.entity.Task;
import com.example.kanbanboard_be.domain.task.enums.Priority;
import com.example.kanbanboard_be.domain.task.enums.Status;
import jakarta.persistence.criteria.Expression;
import jakarta.persistence.criteria.JoinType;
import org.springframework.data.jpa.domain.Specification;

public final class TaskSpecification {

    private TaskSpecification() {
    }

    public static Specification<Task> withStatus(Status status) {
        return (root, query, cb) -> {
            if (Long.class != query.getResultType()) {
                root.fetch("tags", JoinType.LEFT);
                query.distinct(true);
            }

            if (status == null) {
                return cb.conjunction();
            }
            return cb.equal(root.get("status"), status);
        };
    }

    public static Specification<Task> withSort(String sortBy, String sortDirection) {
        return (root, query, cb) -> {
            if ("priority".equalsIgnoreCase(sortBy)) {
                Expression<Integer> priorityRank = cb.<Integer>selectCase()
                        .when(cb.equal(root.get("priority"), Priority.HIGH), 1)
                        .when(cb.equal(root.get("priority"), Priority.MEDIUM), 2)
                        .otherwise(3);

                if ("desc".equalsIgnoreCase(sortDirection)) {
                    query.orderBy(cb.asc(priorityRank), cb.desc(root.get("createdAt")));
                } else {
                    query.orderBy(cb.desc(priorityRank), cb.desc(root.get("createdAt")));
                }
                return null;
            }

            if ("createdAt".equalsIgnoreCase(sortBy)) {
                if ("asc".equalsIgnoreCase(sortDirection)) {
                    query.orderBy(cb.asc(root.get("createdAt")));
                } else {
                    query.orderBy(cb.desc(root.get("createdAt")));
                }
                return null;
            }

            return null;
        };
    }
}
