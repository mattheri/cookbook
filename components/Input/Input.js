import React from "react";
import styles from "./input.module.css";
import cn from "classnames";

export function Input(props) {
    const { type = "text" } = props;

    const handleChange = (e) => {
        const value = e.target.value;
        props.validate(value);
        props.onChange(value);
    }

    return (
        <div className={styles.inputContainer}>
            <label className={styles.label}>{props.label}</label>
            <input type={type} value={props.value} className={cn({
                [styles.input]: true,
                [props.className]: props.className
            })} onChange={handleChange} name={props.id} id={props.id} />
            {props.error && <small className={styles.small}>{props.errorMessage}</small>}
        </div>
    );
}