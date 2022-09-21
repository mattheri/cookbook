import { ApiObject, ImageDTO, Nullable } from "common/common";

export enum ProductType {
  FRUIT = "fruit",
  DAIRY = "dairy",
  CHEESE = "cheese",
  CANNED = "canned",
  SOUP = "soup",
  BROTH = "broth",
  GENERIC = "generic",
}

export interface ProductDTO {
  barcode_number: string;
  title: string;
  category: string;
  brand: string;
  description: string;
  images: string[];
  type: ProductType[];
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

export interface ProductAPI {
  name: string;
  description: string;
  region: string;
  imageUrl: string;
  brand: string;
  specs: string[][];
  category: string;
}

export interface ProductAPIResponse {
  code: string;
  codeType: "UPC" | "EAN";
  product: ProductAPI;
  barcodeUri: string;
}

export interface ProductInfo {
  category: string;
  description: string;
  fdcId: string;
  matchMethod: string;
}

export interface ParsedIngredient {
  preparationNotes: Nullable<string>;
  product: Nullable<string>;
  quantity: Nullable<number>;
  unit: Nullable<string>;
  usdaInfo?: ProductInfo;
}

export interface IngredientResult {
  confidence: number;
  error: Nullable<string>;
  ingredientParsed: ParsedIngredient[];
  ingredientRaw: string;
}
