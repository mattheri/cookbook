import { useBreakpointValue } from "@chakra-ui/react";
import { Breakpoints } from "../Nav";
import { Viewport } from "common/components/nav/context/NavContext";

const useViewportBreakpointValue = (desktopBreakpoint: Breakpoints = "lg") => {
  const breakpointValueOptions = {
    base: Viewport.IS_MOBILE,
    [desktopBreakpoint]: Viewport.IS_DESKTOP,
  };

  const viewport = useBreakpointValue(breakpointValueOptions);

  return viewport;
};

export default useViewportBreakpointValue;
