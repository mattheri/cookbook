import React from "react";
import Link from "next/link";
import styles from "./button.module.css";
import { useContextualRouting } from "next-use-contextual-routing";
import cn from "classnames";
import PulseLoader from "react-spinners/PulseLoader";
import axios from "axios";

export function Button(props) {

    return (
        <Link href={props.href}><a className={cn({
            [styles.button]: true,
            [props.className]: props.className
        })}>{props.text}</a></Link>
    );
}

export function ModalButton(props) {
    const { makeContextualHref } = useContextualRouting();

    return (
        <Link href={makeContextualHref()} as={props.href} shallow><a className={cn({
            [styles.button]: true,
            [props.className]: props.className
        })}>{props.text}</a></Link>
    );

}

export function SubmitButton(props) {
    const [loading, setLoading] = React.useState(false);
    const handleSubmit = async (e, { url, callback, method, data, onErrorCallback }) => {
        e.preventDefault();
        if (!props.disabled) {
            if (method === "POST" || method === "PUT") {
                if (!data) {
                    throw new Error("You must provision a data object to send");
                }
    
                try {
                    setLoading(true);
                    const res = await fetch(url, {
                        method: method,
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ ...data, api_key: process.env.API_KEY })
                    })
                    console.log(res);
                    const json = await res.json();
                    // const json = res.data;
                    console.log(json);
    
                    if (callback) {
                        setLoading(false);
                        callback(json);
                    }
    
                    if (!res.ok) {
                        throw new Error();
                    }
                } catch (err) {
                    setLoading(false);
                    if (onErrorCallback) {
                        return onErrorCallback(err)
                    }
    
                    return console.error(err);
                }
            } else {
                try {
                    setLoading(true);
                    const res = await fetch(url);
                    const json = await res.json();
                    
                    if (callback) {
                        setLoading(false);
                        callback(json);
                    }
                    
                    if (!res.ok) {
                        throw new Error();
                    }
                } catch (err) {
                    setLoading(false);
                    if (onErrorCallback) {
                        return onErrorCallback(err);
                    }
                
                    return console.error(err);
                }
            }
        }
    }
    return (
        <a onClick={(e) => handleSubmit(e, props.onSubmit)} className={cn({
            [styles.button]: true,
            [styles.disabled]: props.disabled,
            [props.className]: props.className
        })}>{loading ? <PulseLoader color={"white"} loading={loading} /> : props.text}</a>
    );
}

export function FnButton(props) {
    const handleClick = (e) => {
        e.preventDefault();
        props.onClick();
    }

    return (
        <a onClick={(e) => handleClick(e)} className={cn({
            [styles.button]: true,
            [styles.disabled]: props.disabled,
            [props.className]: props.className
        })}>{props.text}</a>
    );
}