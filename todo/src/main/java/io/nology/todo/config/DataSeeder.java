package io.nology.todo.config;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.nology.todo.category.Category;
import io.nology.todo.category.CategoryRepository;
import io.nology.todo.task.Task;
import io.nology.todo.task.TaskRepository;

@Configuration
@RequiredArgsConstructor
public class DataSeeder {

    private final CategoryRepository categoryRepository;
    private final TaskRepository taskRepository;

    @Bean
    CommandLineRunner seedDatabase() {
        return args -> {

            if (categoryRepository.count() > 0) {
                return;
            }
            Category work = new Category();
            work.setName("Work");

            Category personal = new Category();
            personal.setName("Personal");

            Category shopping = new Category();
            shopping.setName("Shopping");

            categoryRepository.save(work);
            categoryRepository.save(personal);
            categoryRepository.save(shopping);

            Task workTask = new Task();
            workTask.setName("Finish project");
            workTask.setCompleted(false);
            workTask.setCategory(work);

            Task personalTask = new Task();
            personalTask.setName("Go to the gym");
            personalTask.setCompleted(false);
            personalTask.setCategory(personal);

            Task shoppingTask = new Task();
            shoppingTask.setName("Buy groceries");
            shoppingTask.setCompleted(true);
            shoppingTask.setCategory(shopping);

            taskRepository.save(workTask);
            taskRepository.save(personalTask);
            taskRepository.save(shoppingTask);
        };
    }
}