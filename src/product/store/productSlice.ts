import { createSlice } from "@reduxjs/toolkit";
import { ProductInitialState } from "product/product";
import reducers from "./productReducers";

const initialState: ProductInitialState = {
  products: [],
};

export const productSlice = createSlice({
  initialState,
  name: "products",
  reducers: reducers,
});

export const { addProduct, addProducts } = productSlice.actions;

export default productSlice.reducer;
