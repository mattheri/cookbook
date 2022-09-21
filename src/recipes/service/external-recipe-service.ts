import RestClient from "client/rest-client";
import { inject, injectable } from "inversify";
import { ExternalRecipe } from "recipes/recipes";

@injectable()
class ExternalRecipeService {
  @inject(RestClient) private readonly client!: RestClient;

  private readonly baseUrl = process.env.REACT_APP_COOKBOOK_BASE_URL;
  private readonly host = process.env.REACT_APP_COOKBOOK_HOST;
  private readonly key = process.env.REACT_APP_X_RAPID_API_KEY;

  async getExternalRecipe(url: string) {
    const response = await this.client.post<ExternalRecipe>({
      url: this.baseUrl,
      headers: {
        "content/type": "text/plain",
        "X-RapidAPI-Key": `${this.key}`,
        "X-RapidAPI-Host": `${this.host}`,
      },
      data: url,
    });

    return response.data;
  }
}

export default ExternalRecipeService;
