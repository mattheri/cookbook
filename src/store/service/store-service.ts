import { injectable } from "inversify";
import store from "store/store";

@injectable()
class StoreService {
  private get state() {
    return store.getState();
  }
  public get root() {
    return this.state.root;
  }
  public get storages() {
    return this.state.root.storages;
  }

  public readonly dispatch = store.dispatch;
}

export default StoreService;
