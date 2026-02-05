import React from "react";
import styles from "./Input.module.css";
import clsx from "clsx";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export function Input({ className, label, error, ...props }: InputProps) {
    return (
        <div className={styles.wrapper}>
            {label && <label className={styles.label}>{label}</label>}
            <input
                className={clsx(styles.input, error && styles.hasError, className)}
                {...props}
            />
            {error && <span className={styles.error}>{error}</span>}
        </div>
    );
}
