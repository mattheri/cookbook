import { PayloadAction } from "@reduxjs/toolkit";
import { InitialRootState, Root, RootInput } from "root/root";
import { Storage } from "storage/storage";

const mergePreviousValues = (state: InitialRootState, payload: RootInput) => {
  return {
    ...state,
    ...payload,
  };
};

const addOrUpdateRoot = (
  state: InitialRootState,
  { payload }: PayloadAction<Root>
) => {
  state = mergePreviousValues(state, payload);

  return state;
};

const updateStorage = (
  state: InitialRootState,
  { payload }: PayloadAction<Storage>
) => {
  state.storages.splice(
    state.storages.findIndex((s) => s._id === payload._id),
    1,
    payload
  );

  return state;
};

const rootReducers = {
  addOrUpdateRoot,
  updateStorage,
};

export default rootReducers;
