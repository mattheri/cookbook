import React from "react";
import styles from "./input.module.css";
import cn from "classnames";

type Props = {
    validate: (value: string) => void,
    onChange: (value: string) => void,
    value: string,
    label: string,
    id: string,
    errorMessage: string,
    error: boolean,
    className?: string,
    type?: string
}

export function Input({ 
    validate,
    onChange,
    value,
    label,
    id,
    errorMessage,
    error,
    className,
    type = "text"
}: Props) {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        validate(value);
        onChange(value);
    }

    return (
        <div className={styles.inputContainer}>
            <label className={styles.label}>{label}</label>
            <input type={type} value={value} className={cn({
                [styles.input]: true,
                [className]: className
            })} onChange={handleChange} name={id} id={id} />
            {error && <small className={styles.small}>{errorMessage}</small>}
        </div>
    );
}