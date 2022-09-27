import Client, { IClient } from "client/client";
import FakeApiObject from "client/fake-api-object";
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
import { Storage } from "storage/storage";

const DEFAULT_NEW_STORAGE = {
  _id: "",
  name: "Empty",
  shared: false,
  storageImage: {
    url: null,
    name: null,
  },
};

@injectable()
class StorageService {
  @inject(Client) private readonly client!: IClient;
  @inject(StoreService) private readonly store!: StoreService;
  @inject(FakeApiObject) private readonly fakeApiObject!: FakeApiObject;

  public async createNewStorage(input?: StorageDTO) {
    const rootId = this.store.root._id;

    if (!rootId) return null;

    const serverDispatch = this.store.optimisticServerStateDispatch(
      addOrUpdateRoot,
      this.createFakeRootState([
        ...this.store.root.storages.concat([
          this.fakeApiObject.createFakeApiObject(input || DEFAULT_NEW_STORAGE),
        ]),
      ])
    );

    const response =
      await this.client.mutate<CreateStorageAddToRootMutationResponse>({
        mutation: CREATE_STORAGE_ROOT_MUTATION,
        variables: {
          id: rootId,
          input: input || DEFAULT_NEW_STORAGE,
        },
      });

    if (!response.data) return null;

    serverDispatch(response.data?.addStorageRoot);
  }

  public async deleteStorage(storageId: string) {
    const rootId = this.store.root._id;

    if (!rootId) return null;

    const serverDispatch = this.store.optimisticServerStateDispatch(
      addOrUpdateRoot,
      this.createFakeRootState(
        this.store.root.storages.filter((s) => s._id !== storageId)
      )
    );

    const response = await this.client.mutate<RemoveStorageFromRoot>({
      mutation: REMOVE_STORAGE_FROM_ROOT,
      variables: {
        rootId,
        storageId,
      },
    });

    if (!response.data) return null;

    serverDispatch(response.data?.removeStorageRoot);
  }

  public async updateStorage(storageId: string, input: StorageDTO) {
    const rootId = this.store.root._id;

    if (!rootId) return null;

    const serverDispatch = this.store.optimisticServerStateDispatch(
      updateStorage,
      this.createNewStorageWithOptimisticState(storageId, input)
    );

    const response = await this.client.mutate<UpdateStorageMutationResponse>({
      mutation: EDIT_STORAGE_MUTATION,
      variables: {
        id: storageId,
        input,
      },
    });

    if (!response.data) return null;

    serverDispatch(response.data?.updateStorage);
  }

  private createFakeRootState(storages: Storage[]) {
    return {
      ...this.store.root,
      storages: storages,
    };
  }

  private createNewStorageWithOptimisticState(id: string, input: StorageDTO) {
    const storage = this.store.storages.find((s) => s._id === id)!;

    return {
      ...storage,
      ...input,
    };
  }
}

export default StorageService;
