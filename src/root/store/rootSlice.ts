import { createSlice } from "@reduxjs/toolkit";
import { InitialRootState } from "root/root";
import rootReducers from "./rootReducers";

const initialState: InitialRootState = {
  _id: null,
  createdAt: null,
  updatedAt: null,
  user: null,
  recipes: [],
  shared: [],
  shoppingLists: [],
  storages: [],
};

export const rootSlice = createSlice({
  name: "root",
  initialState,
  reducers: rootReducers,
});

export const { addOrUpdateRoot, updateStorage } = rootSlice.actions;

export default rootSlice.reducer;
