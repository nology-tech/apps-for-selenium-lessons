package io.nology.todo.task.dto;

import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateTaskDto {

    @Size(min = 2, max = 100, message = "Task name must be between 2 and 100 characters")
    private String name;

    private Long categoryId;

    private Boolean completed;
}