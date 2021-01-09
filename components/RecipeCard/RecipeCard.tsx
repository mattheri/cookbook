import Link from "next/link";
import styles from "./recipecard.module.css";
import Image from "next/image";
import { Meal } from "../../next-env";

type Props = {
    meal: Meal
}

export function RecipeCard({ meal }: Props) {
    return (
        <Link href={`/recipes/${meal.idMeal}`}>
            <a className={styles.card}>
                <article>
                    <Image
                        className={styles.image}
                        src={meal.strMealThumb}
                        layout="intrinsic"
                        width={700}
                        height={700}
                        loading="lazy" />
                    <p>{meal.strMeal}</p>
                </article>
            </a>
        </Link>
    );
}