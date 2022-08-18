import { ApiObject } from "common/common";
import { Root } from "root/root";

export interface StorageDTO {
  _id?: string;
  name: string;
  shared: boolean;
  storageImage?: {
    url: string | null;
    name: string | null;
  };
}

export type Storage = StorageDTO & ApiObject;

export interface CreateStorageMutationResponse {
  createStorage: Storage;
}

export interface DeleteStorageMutationResponse {
  deleteStorage: {
    _id: string;
  };
}

export interface RemoveStorageFromRoot {
  removeStorageRoot: Root;
}

export interface CreateStorageAddToRootMutationResponse {
  addStorageRoot: Root;
}

export interface UpdateStorageMutationResponse {
  updateStorage: Storage;
}
