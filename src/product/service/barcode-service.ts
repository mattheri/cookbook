import RestClient from "client/rest-client";
import { BARCODE_LOOKUP_BASEURL } from "product/constants";
import { Product } from "product/product";
import { inject, injectable } from "inversify";

@injectable()
class BarcodeService {
  @inject(RestClient) private readonly client!: RestClient;

  baseUrl = BARCODE_LOOKUP_BASEURL;

  async getProduct(upc: string) {
    const response = await this.client.post<Product>({
      url: this.baseUrl,
      data: {
        upc,
      },
    });

    return response.data;
  }
}

export default BarcodeService;
