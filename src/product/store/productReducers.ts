import { PayloadAction } from "@reduxjs/toolkit";
import { Product, ProductInitialState } from "product/product";

const addProducts = (
  state: ProductInitialState,
  { payload }: PayloadAction<Product[]>
) => {
  state.products = payload;
};

const addProduct = (
  state: ProductInitialState,
  { payload }: PayloadAction<Product>
) => {
  state.products.push(payload);
};

const reducers = {
  addProducts,
  addProduct,
};

export default reducers;
