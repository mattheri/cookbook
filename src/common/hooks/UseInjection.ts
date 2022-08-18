import container from "ioc-container/ioc-container";
import { useMemo } from "react";

const useInjection = <T extends NewableFunction>(injectable: T) => {
  return useMemo(() => container.get(injectable), []) as T["prototype"];
};

export default useInjection;
