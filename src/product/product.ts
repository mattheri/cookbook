import { ApiObject, ImageDTO } from "common/common";

export enum ProductType {
  FRUIT = "fruit",
  DAIRY = "dairy",
  CHEESE = "cheese",
}

export interface ProductDTO {
  barcode_number: string;
  title: string;
  category: string;
  brand: string;
  description: string;
  images: string[];
  type: ProductType;
}

export type Product = ProductDTO & ApiObject;

export interface ItemDTO {
  linkedProduct: Product;
  quantity: number;
}

export type Item = ItemDTO & ApiObject;

export interface ProductCreationFormQuantityObject {
  [x: string]: number;
}

export interface ProductCreationForm {
  productType: ProductType;
  quantityByStorage: ProductCreationFormQuantityObject[];
  totalQuantity: number;
  name: string;
  barcodeNumber: string;
  productImage: ImageDTO;
  bestBefore: Date;
}

export interface ProductInitialState {
  products: Product[];
}

export interface GetAllProductsQueryResponse {
  products: Product[];
}
