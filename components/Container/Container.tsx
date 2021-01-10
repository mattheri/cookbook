import styles from "./container.module.css";
import cn from "classnames";

type Props = {
    style?: string,
    center?: boolean,
    className?: string
}

export function Container({
    style,
    center,
    className,
    children
}: React.PropsWithChildren<Props>) {
    return (
        <>
            <style jsx>{`
                ${style}
            `}</style>
            <div className={cn({
                [styles.container]: true,
                [styles.center]: center,
                [className]: className
            })}>
                {children}
            </div>
        </>
    );
}