import Client, { IClient } from "client/client";
import { inject, injectable } from "inversify";
import StoreService from "store/service/store-service";
import ExternalRecipeService from "./external-recipe-service";

@injectable()
class RecipeService {
  @inject(ExternalRecipeService)
  private readonly externalRecipeService!: ExternalRecipeService;
  @inject(Client) private readonly client!: IClient;
  @inject(StoreService) private readonly store!: StoreService;

  async getRecipes() {}

  async createRecipe() {}

  async createNewRecipe(url: string) {
    const externalRecipte = await this.externalRecipeService.getExternalRecipe(
      url
    );
  }
}

export default RecipeService;
