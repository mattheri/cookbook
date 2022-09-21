import { ContainerModule } from "inversify";
import ExternalRecipeService from "recipes/service/external-recipe-service";
import RecipeService from "recipes/service/recipe-service";

const recipeIoC = new ContainerModule((bind) => {
  bind(ExternalRecipeService).toSelf();
  bind(RecipeService).toSelf();
});

export default recipeIoC;
