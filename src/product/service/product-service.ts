import Client, { IClient } from "client/client";
import { inject, injectable } from "inversify";
import GET_ALL_PRODUCTS_QUERY from "product/infra/GetAllProductsQuery";
import {
  GetAllProductsQueryResponse,
  Product,
  ProductDTO,
} from "product/product";
import { addProducts } from "product/store/productSlice";
import StoreService from "store/service/store-service";
import BarcodeService from "./barcode-service";

@injectable()
class ProductService {
  @inject(Client) private readonly client!: IClient;
  @inject(StoreService) private readonly store!: StoreService;
  @inject(BarcodeService) private readonly barcodeService!: BarcodeService;

  async getAllProducts() {
    const { data } = await this.client.query<GetAllProductsQueryResponse>({
      query: GET_ALL_PRODUCTS_QUERY,
    });

    this.store.dispatch(addProducts(data.products));
  }

  async getProductByBarcode(product: ProductDTO | Product) {
    return await this.barcodeService.getProduct(product.barcode_number);
  }
}

export default ProductService;
