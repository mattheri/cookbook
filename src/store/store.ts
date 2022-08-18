import { configureStore } from "@reduxjs/toolkit";
import rootReducers from "root/store/rootSlice";
import productReducers from "product/store/productSlice";

const store = configureStore({
  reducer: {
    root: rootReducers,
    products: productReducers,
  },
});

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
