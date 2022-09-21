import { injectable } from "inversify";
import {
  ProductAPI,
  Product,
  ProductDTO,
  ProductAPIResponse,
  ProductType,
} from "product/product";
import { singular } from "pluralize";

interface UpcApiResponse {
  data: ProductAPI[];
}

@injectable()
class ProductAdapter {
  productDbToClientProduct(dbProduct: ProductAPIResponse) {
    const specs = dbProduct.product.specs
      ? this.specsToObject(dbProduct.product.specs)
      : {};

    const product: ProductDTO = {
      barcode_number: dbProduct.code,
      brand: dbProduct.product.brand,
      category: dbProduct.product.category,
      description: dbProduct.product.description,
      images: this.toImagesArray(dbProduct.product.imageUrl),
      title: dbProduct.product.name,
      type: this.toType(dbProduct.product.category),
      ...specs,
    };

    return product;
  }

  private specsToObject(specsArray: string[][]) {
    const specs = specsArray.map((spec) => ({ [`${spec[0]}`]: spec[1] }));

    return specs.reduce(
      (obj, item) => ({
        ...obj,
        [Object.keys(item)[0].toLowerCase()]: Object.values(item)[0],
      }),
      {}
    );
  }

  private toImagesArray(url: string | string[]) {
    if (Array.isArray(url)) return url;

    return [url];
  }

  private toType(type: string) {
    const t = type
      .replace(/[&,\s]+/, "|")
      .split("|")
      .filter(Boolean)
      .map((word) => singular(word));

    console.log(t);

    return t.map((t) => {
      if (Object.keys(ProductType).some((key) => key === t.toUpperCase())) {
        const key = (
          Object.keys(ProductType).find((key) => key === t.toUpperCase()) ||
          "GENERIC"
        ).toUpperCase();

        return (ProductType as Record<string, string>)[key] as ProductType;
      }

      return ProductType.GENERIC;
    });
  }
}

export default ProductAdapter;
