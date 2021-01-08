import axios from "axios";

export async function searchRecipe(query) {
    const apiURL = [
        `https://www.themealdb.com/api/json/v2/9973533/filter.php?i=${query}`,
        `https://www.themealdb.com/api/json/v2/9973533/search.php?s=${query}`
    ];

    const recipes = await Promise.all(
        apiURL.map(async (url) => await (await axios.get(url)).data.meals)
    )

    return recipes.flat();
}