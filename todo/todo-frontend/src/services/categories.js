const BASE_URL = "http://localhost:8080";

export const getAllCategories = async () => {
    const response = await fetch(`${BASE_URL}/categories`);

    if (!response.ok) {
        throw new Error("Could not fetch tasks");
    }

    return await response.json();
};

export const createCategory = async (data) => {
    const response = await fetch(`${BASE_URL}/categories`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error("Could not create category");
    }

    return await response.json();
};
