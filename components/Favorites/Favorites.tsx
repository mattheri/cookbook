import React from "react";
import { RecipeCard } from "../RecipeCard/RecipeCard";
import styles from "./favorites.module.css";
import { Meal } from "../../next-env";

type Props = {
    meals: Meal[]
}
export function Favorites({ meals }: Props) {

    const favRef = React.useRef<HTMLElement>(null);
    const [scrollX, setScrollX] = React.useState(0);
    const [inside, setInside] = React.useState(false);
    const amount = 60;

    const handleMaxScrollX = () => {
        const value = 96;
        const numberOfMeals = meals.length;
        return value * numberOfMeals;
    }

    const handleScrollRight = (amount: number, ref: HTMLElement) => {
        setScrollX(x => {
            if (scrollX < handleMaxScrollX()) {
                return x += amount;
            }

            return handleMaxScrollX();
        });

        ref.scroll({
            top: 0,
            left: scrollX,
            behavior: "smooth"
        });
    }

    const handleScrollLeft = (amount: number, ref: HTMLElement) => {
        setScrollX(x => {
            if (scrollX >= 0) {
                if (x - amount < 0) {
                    return 0;
                }

                return x -= amount;
            }

            return 0;
        });

        ref.scroll({
            top: 0,
            left: scrollX,
            behavior: "smooth"
        });
    }

    const handleScrollX = (ref: HTMLElement, amount: number, event: React.WheelEvent<HTMLDivElement>) => {
        if (event.deltaY < 0) {
            handleScrollRight(amount, ref);
        }
        
        if (event.deltaY > 1) {
            handleScrollLeft(amount, ref);
        }
    }

    React.useEffect(() => {
        const cancelWheel = (event: WheelEvent) => event.preventDefault();

        if (inside) document.body.addEventListener('wheel', cancelWheel, { passive: false });
        
        return () => document.body.removeEventListener('wheel', cancelWheel);
    }, [inside])

    return (
        <div
            onMouseEnter={() => setInside(true)}
            onMouseLeave={() => setInside(false)}
            onWheel={(e) => handleScrollX(favRef.current, amount, e)}
            className={styles.wrapper}>
            <section
                ref={favRef}
                className={styles.favorites}>
                {meals.map((meal, index) => <RecipeCard key={index} meal={meal} />)}
            </section>
            <button onClick={() => handleScrollRight(amount * 8, favRef.current)} className={styles.right}><div>▶</div></button>
            <button onClick={() => handleScrollLeft(amount * 8, favRef.current)} className={styles.left}><div>◀</div></button>
        </div>
    );
}