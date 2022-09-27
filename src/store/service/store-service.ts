import { injectable } from "inversify";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
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

  public optimisticServerStateDispatch<
    T extends Function = any,
    K extends object = any
  >(action: T, optimisticState: K) {
    const subject = new BehaviorSubject(this.state as object);

    subject.subscribe({
      next: (v) => {
        this.dispatch(action(v));
      },
    });

    subject.next(optimisticState);

    return (newArgs?: K) => {
      if (!newArgs) return;

      subject.next(newArgs);
    };
  }
}

export default StoreService;
