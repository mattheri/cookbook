import { Portal } from "@chakra-ui/react";
import { MutableRefObject, useImperativeHandle, useRef, useState } from "react";
import Loading from "./Loading";

export interface LoadingControls {
  start: () => void;
  stop: () => void;
}

export let LoadingRef: MutableRefObject<any> = {
  current: {
    start: () => {},
    stop: () => {},
  },
};

const StatefulLoading = () => {
  const [shouldMount, setShouldMount] = useState(false);
  LoadingRef = useRef(LoadingRef);

  useImperativeHandle(LoadingRef, () => {
    return {
      start: () => setShouldMount(true),
      stop: () => setShouldMount(false),
    };
  });

  return shouldMount ? (
    <Portal appendToParentPortal={false}>
      <Loading top={0} zIndex="9999" />
    </Portal>
  ) : null;
};

export default StatefulLoading;
