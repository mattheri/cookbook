import styles from "./recipe.module.css";

export function Recipe(props) {
    const youtubeEmbedURL = props.meal.strYoutube && props.meal.strYoutube.replace("watch?v=", "embed/");
    const entries = Object.entries(props.meal);
    const measures = entries
        .filter(([key, value]) => (key.includes("Measure")) && (value && value !== " "));
    const ingredients = entries
        .filter(([key, value]) => (key.includes("Ingredient")) && (value && value !== " "));
    const measuredIngredients = measures
        .map((measure, index) => measure.splice(0, 1) && measure.concat(ingredients[index]))
        .map(measure => measure.splice(1, 1) && measure.join(" "));
    const preparation = props.meal.strInstructions.split(". ");

    return (
        <main className={styles.recipe}>
            {youtubeEmbedURL ?
                <iframe style={{
                    backgroundImage: props.meal.strMealThumb
                }} className={styles.mainImage} src={youtubeEmbedURL} frameBorder="0" allowFullScreen></iframe> :
                <div style={{
                    backgroundImage: props.meal.strMealThumb
                }} className={styles.mainImage}></div>
            }
            <h1>{props.meal.strMeal}</h1>
            <h2>Ingredients</h2>
            <ul>
                {measuredIngredients.map(ingredient => <li key={ingredient}>{ingredient}</li>)}
            </ul>
            <h2>Preparation</h2>
            <ol>
                {preparation.map((prep, index) => <li key={index}>{prep}</li>)}
            </ol>
        </main>
    );
}