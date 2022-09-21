import { ContainerModule } from "inversify";
import BarcodeService from "product/service/barcode-service";
import IngredientParserService from "product/service/ingredient-parser-service";
import ProductAdapter from "product/service/product-adapter";
import ProductService from "product/service/product-service";

const productIoC = new ContainerModule((bind) => {
  bind(BarcodeService).toSelf();
  bind(ProductAdapter).toSelf();
  bind(ProductService).toSelf();
  bind(IngredientParserService).toSelf();
});

export default productIoC;
