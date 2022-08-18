import { ApiObject } from "common/common";
import { Storage } from "storage/storage";

export interface Root {
  _id: string;
  createdAt: string;
  updatedAt: string;
  user: string;
  recipes: ApiObject[];
  storages: Storage[];
  shoppingLists: ApiObject[];
  shared: ApiObject[];
}

export interface CreateRootMutationResponse {
  createRoot: Root;
}

export interface RootQuery {
  rootByUser: Root;
}

export interface UpdateRootMutationResponse {
  updateRoot: Root;
}

export interface RootInput {
  user?: string;
  recipes?: ApiObject[];
  storages?: Storage[];
  shoppingLists?: ApiObject[];
  shared?: ApiObject[];
}

export interface RootOutput {
  user?: string;
  recipes?: string[];
  storages?: string[];
  shoppingLists?: string[];
  shared?: string[];
}

export interface InitialRootState
  extends Omit<Root, "_id" | "createdAt" | "updatedAt" | "user"> {
  _id: string | null;
  createdAt: string | null;
  updatedAt: string | null;
  user: string | null;
}

export type RootRessourceKey =
  | "storages"
  | "recipes"
  | "shoppingLists"
  | "shared";
