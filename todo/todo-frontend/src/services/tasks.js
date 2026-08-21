const BASE_URL = "http://localhost:8080";

export const getAllTasks = async () => {
    const response = await fetch(`${BASE_URL}/tasks`);

    if (!response.ok) {
        throw new Error("Could not fetch tasks");
    }

    return await response.json();
};

export const createTask = async (data) => {
    const response = await fetch(`${BASE_URL}/tasks`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error("Could not create task");
    }

    return await response.json();
};
