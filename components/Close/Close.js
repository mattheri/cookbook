import styles from "./close.module.css";
import cn from "classnames";

export function Close(props) {
    return (
        <div onClick={props.onClick} className={cn({
            [styles.close]: true,
            [props.className]: props.className
        })}>
            X
        </div>
    );
}