import Client, { IClient } from "client/client";
import { inject, injectable } from "inversify";
import { addOrUpdateRoot, updateStorage } from "root/store/rootSlice";
import CREATE_STORAGE_ROOT_MUTATION from "storage/infra/CreateStorageRootMutation";
import EDIT_STORAGE_MUTATION from "storage/infra/EditStorageMutation";
import REMOVE_STORAGE_FROM_ROOT from "storage/infra/RemoveStorageFromRootMutation";
import {
  CreateStorageAddToRootMutationResponse,
  RemoveStorageFromRoot,
  StorageDTO,
  UpdateStorageMutationResponse,
} from "storage/storage";
import StoreService from "store/service/store-service";

const DEFAULT_NEW_STORAGE = {
  name: "",
  shared: false,
};

@injectable()
class StorageService {
  @inject(Client) private readonly client!: IClient;
  @inject(StoreService) private readonly store!: StoreService;

  public async createNewStorage(input?: StorageDTO) {
    const rootId = this.store.root._id;

    if (!rootId) return null;

    const response =
      await this.client.mutate<CreateStorageAddToRootMutationResponse>({
        mutation: CREATE_STORAGE_ROOT_MUTATION,
        variables: {
          id: rootId,
          input: input || DEFAULT_NEW_STORAGE,
        },
      });

    if (!response.data) return null;

    this.store.dispatch(addOrUpdateRoot(response.data.addStorageRoot));
  }

  public async deleteStorage(storageId: string) {
    const rootId = this.store.root._id;

    if (!rootId) return null;

    const response = await this.client.mutate<RemoveStorageFromRoot>({
      mutation: REMOVE_STORAGE_FROM_ROOT,
      variables: {
        rootId,
        storageId,
      },
    });

    if (!response.data) return null;

    this.store.dispatch(addOrUpdateRoot(response.data?.removeStorageRoot));
  }

  public async updateStorage(storageId: string, input: StorageDTO) {
    const rootId = this.store.root._id;

    if (!rootId) return null;

    const response = await this.client.mutate<UpdateStorageMutationResponse>({
      mutation: EDIT_STORAGE_MUTATION,
      variables: {
        id: storageId,
        input,
      },
    });

    if (!response.data) return null;

    this.store.dispatch(updateStorage(response.data?.updateStorage));
  }
}

export default StorageService;
