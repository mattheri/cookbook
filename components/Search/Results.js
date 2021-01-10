import React from "react";
import styles from "./result.module.css";
import Link from "next/link";
import { useClickOutside } from "../Hooks/useClickOutside";
import { useRouter } from "next/router";
import Image from "next/image";

export const Results = React.forwardRef((props, ref) => {

    const [show, setShow] = React.useState(false);

    React.useEffect(() => {
        if (props.results.length) {
            setShow(true)
        } else {
            setShow(false);
        }
    }, [props.results, props.parent, props.onFocus]);
    
    useClickOutside(props.parent, setShow);
    const router = useRouter();

    return (
        <section className={styles.results}>
            {show && props.results.map((result, index) => {
                if (result) {
                    return (
                        <Link key={result.idMeal + Math.random() * 100} href={{
                            pathname: router.pathname.includes("recipes") ? result.idMeal : `recipes/${result.idMeal}`
                        }}>
                            <a tabIndex={index + 1} onClick={() => setShow(false)}>
                                <article className={styles.result}>
                                    <Image src={`${result.strMealThumb}/preview`} height={50} width={50} layout="intrinsic" />
                                    <p>{result.strMeal}</p>
                                </article>
                            </a>
                        </Link>
                    );
                }
            })}
        </section>
    );
})