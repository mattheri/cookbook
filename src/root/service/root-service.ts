import Client, { IClient } from "client/client";
import { inject, injectable } from "inversify";
import CREATE_ROOT_MUTATION from "root/infra/CreateRootMutation";
import ROOT_QUERY from "root/infra/RootQuery";
import UPDATE_ROOT_MUTATION from "root/infra/UpdateRootMutation";
import {
  CreateRootMutationResponse,
  RootInput,
  RootQuery,
  RootRessourceKey,
  UpdateRootMutationResponse,
} from "root/root";
import { addOrUpdateRoot } from "root/store/rootSlice";
import StoreService from "store/service/store-service";
import RootAdapter from "./root-adapter";

@injectable()
class RootService {
  @inject(Client) private readonly client!: IClient;
  @inject(RootAdapter) private readonly rootAdapter!: RootAdapter;
  @inject(StoreService) private readonly store!: StoreService;

  async createRoot(user: string) {
    const response = await this.client.mutate<CreateRootMutationResponse>({
      mutation: CREATE_ROOT_MUTATION,
      variables: {
        user,
      },
      context: {
        useLoading: true,
      },
    });

    if (!response.data?.createRoot) return null;

    this.store.dispatch(addOrUpdateRoot(response.data?.createRoot));
  }

  async queryRoot(user: string) {
    const { data } = await this.client.query<RootQuery>({
      query: ROOT_QUERY,
      variables: {
        user,
      },
      context: {
        useLoading: true,
      },
    });

    this.store.dispatch(addOrUpdateRoot(data.rootByUser));
  }

  async updateRoot(input: RootInput): Promise<void | null | unknown> {
    const root = this.store.root;

    const rootInput = this.rootAdapter.toMergedServerRootInput(root, input);

    const response = await this.client.mutate<UpdateRootMutationResponse>({
      mutation: UPDATE_ROOT_MUTATION,
      variables: {
        _id: root._id,
        input: rootInput,
      },
    });

    if (!response.data?.updateRoot) return null;

    this.store.dispatch(addOrUpdateRoot(response.data.updateRoot));
  }

  async removeRootRessource(ressourceKey: RootRessourceKey, id: string) {
    const root = this.store.root;
    const rootInput = this.rootAdapter.removeRessourceFromRoot(
      root,
      ressourceKey,
      id
    );

    const response = await this.client.mutate<UpdateRootMutationResponse>({
      mutation: UPDATE_ROOT_MUTATION,
      variables: {
        _id: root._id,
        input: rootInput,
      },
    });

    if (!response.data?.updateRoot) return null;

    this.store.dispatch(addOrUpdateRoot(response.data.updateRoot));
  }
}

export default RootService;
