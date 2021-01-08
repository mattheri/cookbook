import styles from "./container.module.css";
import cn from "classnames";

export function Container(props) {
    return (
        <>
            <style jsx>{`
                ${props.styles}
            `}</style>
            <div className={cn({
                [styles.container]: true,
                [styles.center]: props.center,
                [props.className]: props.className
            })}>
                {props.children}
            </div>
        </>
    );
}