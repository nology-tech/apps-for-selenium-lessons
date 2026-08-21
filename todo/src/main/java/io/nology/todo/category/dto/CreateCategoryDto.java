package io.nology.todo.category.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateCategoryDto {

    @NotBlank()
    @Size(min = 2, max = 50, message = "Category name must be between 2 and 50 characters")
    private String name;
}
