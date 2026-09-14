import { Check, X } from "lucide-react";
import styles from "./ToastContainer.module.scss";

export default function ToastContainer({ toasts, onDismiss }) {
    if (!toasts.length) return null;

    return (
        <div className={styles.container}>
            {toasts.map((toast) => (
                <div key={toast.id} className={styles.toast} id="toast">
                    <span
                        className={`${styles.icon} ${
                            toast.type === "error"
                                ? styles.iconError
                                : styles.iconSuccess
                        }`}
                    >
                        {toast.type === "error" ? (
                            <X size={12} strokeWidth={3} />
                        ) : (
                            <Check size={12} strokeWidth={3} />
                        )}
                    </span>

                    <span className={styles.message}>{toast.message}</span>

                    <button
                        type="button"
                        className={styles.closeButton}
                        onClick={() => onDismiss(toast.id)}
                        aria-label="Dismiss"
                    >
                        <X size={14} />
                    </button>
                </div>
            ))}
        </div>
    );
}
