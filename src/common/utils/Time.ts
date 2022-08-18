import { AnyArgs, AnyCallback, GenericCallback } from "common/common";
import { injectable } from "inversify";

type Callback<T extends AnyCallback = AnyCallback> = GenericCallback<T>;

const DEFAULT_TIMEOUT_DELAY = 5000;
const DEFAULT_INTERVAL_DELAY = 500;

interface TimeControls {
  pause: () => void;
  start: () => void;
  stop: () => void;
}

@injectable()
class Time {
  setTimeout<T extends AnyCallback = AnyCallback>(
    callback: Callback<T>,
    delay: number = DEFAULT_TIMEOUT_DELAY,
    ...args: AnyArgs
  ): TimeControls {
    let startDate = new Date().getTime();
    let timeout: NodeJS.Timeout | null = null;

    const pause = () => {
      if (!timeout) return;

      startDate = new Date().getTime() - startDate;
      clearTimeout(timeout);
    };

    const start = () => {
      timeout = setTimeout(callback, delay, args);
    };

    const stop = () => {
      if (!timeout) return;

      clearTimeout(timeout);
      startDate = -1;
    };

    return {
      pause,
      start,
      stop,
    };
  }

  setInterval<T extends AnyCallback = AnyCallback>(
    callback: Callback<T>,
    delay: number = DEFAULT_INTERVAL_DELAY,
    ...args: AnyArgs
  ): TimeControls {
    let startDate = new Date().getTime();
    let interval = setInterval(callback, delay, args);

    const pause = () => {
      startDate = new Date().getTime() - startDate;
      clearInterval(interval);
    };

    const start = () => {
      interval = setInterval(callback, startDate, args);
    };

    const stop = () => {
      clearInterval(interval);
      startDate = -1;
    };

    return {
      pause,
      start,
      stop,
    };
  }
}

export default Time;
