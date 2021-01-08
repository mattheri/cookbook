import React from "react";
import cn from "classnames";
import { Portal } from "../Portal/Portal";
import styles from "./modal.module.css";
import { useContextualRouting } from "next-use-contextual-routing";
import { useRouter } from "next/router";
import { useClickOutside } from "../Hooks/useClickOutside";

export function Modal(props) {
    const { returnHref } = useContextualRouting();
    const router = useRouter();

    const close = () => router.push(returnHref);
    const modalRef = React.useRef(null);

    const child = React.Children.map(
        props.children,
        child => React.cloneElement(child, { ...props, close })
    )

    useClickOutside(modalRef, close);

    return (
        <Portal>
            {props.isOpen && 
            <section className={cn({
                [styles.modal]: true,
                [styles.full]: props.fullscreen
            })}>
                <div ref={modalRef}>
                    {child}
                </div>
            </section>
            }
        </Portal>
    );
}