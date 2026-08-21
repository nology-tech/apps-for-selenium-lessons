import { useState, useEffect, useCallback, useRef } from "react";
import "./App.scss";
import TaskList from "./containers/TaskList/TaskList";
import { getAllTasks, createTask } from "./services/tasks";
import CategoryForm from "./components/CategoryForm/CategoryForm";
import { createCategory, getAllCategories } from "./services/categories";
import TaskForm from "./components/TaskForm/TaskForm";
import ToastContainer from "./components/ToastContainer/ToastContainer";

let idCounter = 0;

function App() {
    const [tasks, setTasks] = useState([]);
    const [categories, setCategories] = useState([]);
    const [toasts, setToasts] = useState([]);
    const timers = useRef({});

    useEffect(() => {
        getAllTasks().then(setTasks);
        getAllCategories().then(setCategories);
    }, []);
    console.log(categories);

    const removeToast = useCallback((id) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
        clearTimeout(timers.current[id]);
        delete timers.current[id];
    }, []);

    const showToast = useCallback(
        (message, type = "success") => {
            const id = ++idCounter;
            setToasts((prev) => [...prev, { id, message, type }]);
            timers.current[id] = setTimeout(() => removeToast(id), 3500);
        },
        [removeToast],
    );

    const handleCreateCategory = async (data) => {
        try {
            await createCategory(data);
            getAllCategories().then(setCategories);
            showToast("Category added", "success");
        } catch (err) {
            showToast(err.message || "Could not create category", "error");
        }
    };

    const handleCreateTask = async (data) => {
        try {
            await createTask(data);
            getAllTasks().then(setTasks);
            showToast("Task added", "success");
        } catch (err) {
            showToast(err.message || "Could not create task", "error");
        }
    };

    return (
        <>
            <h1>To Do List</h1>
            <div className="list">
                <CategoryForm onSubmit={handleCreateCategory} />
                {categories.length > 0 && (
                    <TaskForm
                        categories={categories}
                        onSubmit={handleCreateTask}
                    />
                )}
            </div>
            <TaskList tasks={tasks} />
            <ToastContainer toasts={toasts} onDismiss={removeToast} />
        </>
    );
}

export default App;
