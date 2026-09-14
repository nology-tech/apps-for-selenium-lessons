import { useState, useEffect } from "react";
import styles from "./TaskForm.module.scss";

export default function TaskForm({ categories = [], onSubmit }) {
    const [name, setName] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (!categoryId && categories.length > 0) {
            setCategoryId(String(categories[0].id));
        }
    }, [categories]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const trimmed = name.trim();
        if (!trimmed) {
            setError("Task name is required");
            return;
        }

        setError("");
        setSubmitting(true);
        try {
            console.log(categoryId);
            await onSubmit({
                name: trimmed,
                categoryId: Number(categoryId),
            });
            setName("");
            setCategoryId("");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <form className={styles.container} onSubmit={handleSubmit}>
            <p className={styles.title}>New task</p>

            <div className={styles.row}>
                <div className={styles.field}>
                    <label className={styles.label} htmlFor="taskName">
                        Name
                    </label>
                    <input
                        id="taskName"
                        type="text"
                        className={`${styles.input} ${error ? styles.inputError : ""}`}
                        placeholder="e.g. Finish quarterly report"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                            if (error) setError("");
                        }}
                        autoFocus
                    />
                    {error && <span className={styles.errorText}>{error}</span>}
                </div>

                <div className={`${styles.field} ${styles.fieldCategory}`}>
                    <label className={styles.label} htmlFor="taskCategory">
                        Category
                    </label>
                    <select
                        id="taskCategory"
                        className={styles.select}
                        value={categoryId}
                        onChange={(e) => setCategoryId(e.target.value)}
                    >
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className={styles.actions}>
                    <button
                        type="submit"
                        className={`${styles.button} ${styles.buttonPrimary}`}
                        disabled={submitting}
                    >
                        {submitting ? "Adding..." : "Add task"}
                    </button>
                </div>
            </div>
        </form>
    );
}
