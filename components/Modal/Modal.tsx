import React from "react";
import cn from "classnames";
import { Portal } from "../Portal/Portal";
import styles from "./modal.module.css";
import { useContextualRouting } from "next-use-contextual-routing";
import { useRouter } from "next/router";
import { useClickOutside } from "../Hooks/useClickOutside";

type Props = {
    children: JSX.Element | JSX.Element[],
    fullscreen: boolean,
    isOpen: boolean
}

export function Modal({
    children,
    fullscreen,
    isOpen
}: Props) {
    const { returnHref } = useContextualRouting();
    const router = useRouter();

    const close = () => router.push(returnHref);
    const modalRef = React.useRef<HTMLDivElement>(null);

    const child = React.Children.map(
        children,
        child => React.cloneElement(child, { ...child.props, close })
    );

    useClickOutside(modalRef, close);

    return (
        <Portal>
            {isOpen && 
            <section className={cn({
                [styles.modal]: true,
                [styles.full]: fullscreen
            })}>
                <div ref={modalRef}>
                    {child}
                </div>
            </section>
            }
        </Portal>
    );
}