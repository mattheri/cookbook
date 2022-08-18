import { ApiObject } from "common/common";
import { injectable } from "inversify";
import {
  InitialRootState,
  Root,
  RootOutput,
  RootRessourceKey,
} from "root/root";

type Input = Partial<InitialRootState>;
type NewRefArray<T extends ApiObject[] = any[]> = T | null;

@injectable()
class RootAdapter {
  toNewReference(input: Input, ressourceKey?: RootRessourceKey): Input {
    let newRefArray: NewRefArray = null;

    const props: Input = {};

    if (ressourceKey) {
      newRefArray = [...(input[ressourceKey] || [])];
      props[ressourceKey] = newRefArray;
    }

    if (!newRefArray) {
      props.recipes = [...(input.recipes || [])];
      props.shared = [...(input.shared || [])];
      props.storages = [...(input.storages || [])];
      props.shoppingLists = [...(input.shoppingLists || [])];
    }

    return {
      ...input,
      ...props,
    };
  }

  removeRessourceFromRoot(
    input: Input,
    ressourceKey: RootRessourceKey,
    ressourceToRemoveId: string
  ): RootOutput {
    const newInput = this.toNewReference(input);
    const index = newInput[ressourceKey]?.findIndex(
      (apiObject) => apiObject._id === ressourceToRemoveId
    );
    if (!index || index < 0) return this.toServerRootInput(input);

    newInput[ressourceKey]?.splice(index, 1);

    return this.toServerRootInput(newInput);
  }

  toServerRootInput(input: Input): RootOutput {
    return {
      storages: this.mapIds(input.storages),
      recipes: this.mapIds(input.recipes),
      shared: this.mapIds(input.shared),
      shoppingLists: this.mapIds(input.shoppingLists),
    };
  }

  toMergedServerRootInput(
    oldInput: Input,
    newInput: Partial<Root>
  ): RootOutput {
    const newRecipes = this.mergeArrays(oldInput.recipes, newInput.recipes);
    const newStorages = this.mergeArrays(oldInput.storages, newInput.storages);
    const newShared = this.mergeArrays(oldInput.shared, newInput.shared);
    const newShoppingLists = this.mergeArrays(
      oldInput.shoppingLists,
      newInput.shoppingLists
    );

    const input: Input = {
      user: oldInput.user,
      shared: newShared,
      shoppingLists: newShoppingLists,
      storages: newStorages,
      recipes: newRecipes,
    };

    return this.toServerRootInput(input);
  }

  mergeArrays<T extends any[], K extends any[]>(
    oldArray?: T,
    newArray?: K
  ): (T[number] & K[number])[] {
    return [...(oldArray || []), ...(newArray || [])];
  }

  private mapIds<T extends ApiObject[] | undefined>(
    apiObjectArray: T
  ): string[] {
    if (!apiObjectArray) return [];

    return apiObjectArray.map((o) => o._id);
  }
}

export default RootAdapter;
