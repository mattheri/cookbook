import Link from "next/link";
import styles from "./recipecard.module.css";

export function RecipeCard(props) {
    return (
        <Link href={`/recipes/${props.meal.idMeal}`}>
            <a className={styles.card}>
                <article>
                    <img className={styles.image} src={props.meal.strMealThumb} />
                    <p>{props.meal.strMeal}</p>
                </article>
            </a>
        </Link>
    );
}