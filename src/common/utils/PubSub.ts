import "reflect-metadata";
import { injectable } from "inversify";

type Callback = (...args: any[]) => any | Promise<any>;
type Callbacks = Record<string, Set<Callback>>;
type Unsubscribe = () => void;
const ASYNC_FUNCTION_SYMBOL = "AsyncFunction";
type FunctionWithSymbol = { [x: symbol]: string };

@injectable()
class Pubsub<T> {
  private callbacks: Callbacks = {};

  subscribe(event: T, callback: Callback): Unsubscribe {
    const ev = event as unknown as string;

    if (!this.callbacks[ev]) {
      this.callbacks[ev] = new Set();
      this.callbacks[ev].add(callback);
    } else {
      this.callbacks[ev].add(callback);
    }

    return () => {
      this.unsubscribe(ev, callback);
    };
  }

  unsubscribe(event: string, callback: Callback) {
    this.callbacks[event].delete(callback);
  }

  publish(event: T, ...args: any[]) {
    const ev = event as unknown as string;
    this.callbacks[ev]?.forEach(async (cb) => {
      const tempCb = cb as unknown as FunctionWithSymbol;
      const functionType: string = tempCb[Symbol.toStringTag];

      if (functionType.includes(ASYNC_FUNCTION_SYMBOL))
        await cb.apply(cb, args);
      else cb.apply(cb, args);
    });
  }
}

export default Pubsub;
