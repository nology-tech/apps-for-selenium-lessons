import CategoryTag from "../CategoryTag/CategoryTag";
import styles from "./TaskCard.module.scss";
import { Check } from "lucide-react";

export default function TaskCard({ task, onToggleComplete }) {
    const { name, completed, category } = task;

    return (
        <div
            className={`${styles.card} ${completed ? styles.cardCompleted : ""}`}
        >
            <button
                type="button"
                onClick={() => onToggleComplete?.(task.id)}
                aria-label={
                    completed ? "Mark as incomplete" : "Mark as complete"
                }
                className={`${styles.checkbox} ${completed ? styles.checkboxCompleted : ""}`}
            >
                {completed && (
                    <Check className={styles.checkIcon} strokeWidth={3} />
                )}
            </button>

            <div className={styles.content}>
                <p
                    className={`${styles.name} ${completed ? styles.nameCompleted : ""}`}
                >
                    {name}
                </p>

                {category && <CategoryTag category={task.category} />}
            </div>
        </div>
    );
}
