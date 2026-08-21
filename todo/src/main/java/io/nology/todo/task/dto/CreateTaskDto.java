package io.nology.todo.task.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateTaskDto {

    @NotBlank()
    @Size(min = 2, max = 100, message = "Task name must be between 2 and 100 characters")
    private String name;

    @NotNull()
    private Long categoryId;
}