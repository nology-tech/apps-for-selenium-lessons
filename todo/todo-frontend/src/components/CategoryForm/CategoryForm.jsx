import { useState } from "react";
import styles from "./CategoryForm.module.scss";

export default function CategoryForm({ onSubmit }) {
    const [name, setName] = useState("");
    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const trimmed = name.trim();
        if (!trimmed) {
            setError("Category name is required");
            return;
        }

        setError("");
        setSubmitting(true);
        try {
            await onSubmit?.({ name: trimmed });
            setName("");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <form className={styles.container} onSubmit={handleSubmit}>
            <p className={styles.title}>New category</p>
            <div className={styles.inner_container}>
                <div className={styles.field}>
                    <label className={styles.label} htmlFor="categoryName">
                        Name
                    </label>
                    <input
                        id="categoryName"
                        type="text"
                        className={`${styles.input} ${error ? styles.inputError : ""}`}
                        placeholder="e.g. Work, Personal, Errands"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                            if (error) setError("");
                        }}
                        autoFocus
                    />
                    {error && (
                        <span className={styles.errorText} id="categoryError">
                            {error}
                        </span>
                    )}
                </div>

                <button
                    type="submit"
                    className={`${styles.button} ${styles.buttonPrimary}`}
                    disabled={submitting}
                >
                    {submitting ? "Adding..." : "Add category"}
                </button>
            </div>
        </form>
    );
}
