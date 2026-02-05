import React from "react";
import styles from "./Button.module.css";
import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline" | "ghost";
    size?: "sm" | "md" | "lg";
    isLoading?: boolean;
}

export function Button({
    children,
    className,
    variant = "primary",
    size = "md",
    isLoading,
    disabled,
    ...props
}: ButtonProps) {
    return (
        <button
            className={clsx(
                styles.btn,
                styles[variant],
                styles[size],
                className
            )}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading ? <span className={styles.loader} /> : children}
        </button>
    );
}
