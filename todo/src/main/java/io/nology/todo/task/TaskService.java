package io.nology.todo.task;

import java.util.List;

import org.springframework.stereotype.Service;

import io.nology.todo.category.Category;
import io.nology.todo.category.CategoryService;
import io.nology.todo.common.exceptions.NotFoundException;
import io.nology.todo.task.dto.CreateTaskDto;
import io.nology.todo.task.dto.UpdateTaskDto;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;
    private final CategoryService categoryService;

    public List<Task> getAll() {
        return this.taskRepository.findAll();
    }

    public Task getTaskById(Long id) {
        return taskRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Task not found"));
    }

    public Task createTask(CreateTaskDto dto) {

        Category category = categoryService.getCategoryById(dto.getCategoryId());

        Task task = new Task();

        task.setName(dto.getName());
        task.setCompleted(false);
        task.setCategory(category);

        return taskRepository.save(task);
    }

    public Task updateTask(Long id, UpdateTaskDto dto) {

        Task task = this.getTaskById(id);

        if (dto.getName() != null) {
            task.setName(dto.getName());
        }

        if (dto.getCategoryId() != null) {
            Category category = categoryService.getCategoryById(dto.getCategoryId());

            task.setCategory(category);
        }

        if (dto.getCompleted() != null) {
            task.setCompleted(dto.getCompleted());
        }

        return taskRepository.save(task);
    }

}
