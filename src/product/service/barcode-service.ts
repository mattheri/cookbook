import RestClient from "client/rest-client";
import {
  BARCODE_LOOKUP_BASEURL,
  BARCODE_LOOKUP_HOST,
  BARCODE_LOOKUP_KEY,
} from "product/constants";
import { Product, ProductAPIResponse, ProductDTO } from "product/product";
import { inject, injectable } from "inversify";
import ProductAdapter from "./product-adapter";
import { AxiosResponse } from "axios";

@injectable()
class BarcodeService {
  @inject(RestClient) private readonly client!: RestClient;
  @inject(ProductAdapter) private readonly productAdapter!: ProductAdapter;

  host = BARCODE_LOOKUP_HOST;
  baseUrl = BARCODE_LOOKUP_BASEURL;
  endpoint = "code";
  key = BARCODE_LOOKUP_KEY;

  private get headers() {
    return {
      "X-RapidAPI-Key": this.key,
      "X-RapidAPI-Host": this.host,
    };
  }

  private uri(upc: string) {
    return `${this.baseUrl}/code/${upc}`;
  }

  async getProduct(upc: string) {
    const response: AxiosResponse<ProductAPIResponse> = await this.client.get({
      url: this.uri(upc),
      headers: this.headers,
    });

    console.log(response.data);

    return this.productAdapter.productDbToClientProduct(response.data);
  }
}

export default BarcodeService;
