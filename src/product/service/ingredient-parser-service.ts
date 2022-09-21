import RestClient from "client/rest-client";
import { inject, injectable } from "inversify";

@injectable()
class IngredientParserService {
  @inject(RestClient) private readonly client!: RestClient;

  parseIngredient(ingredients: string[]) {}
}

export default IngredientParserService;
