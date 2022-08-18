import { FC } from "react";
import useViewportBreakpointValue from "../hook/UseViewportBreakpointValue";
import { Props } from "../Nav";
import NavContext, { Viewport } from "./NavContext";

const NavContextProvider: FC<Props> = ({
  desktopBreakpoint = "lg",
  children,
}) => {
  const viewport = useViewportBreakpointValue(desktopBreakpoint);

  return (
    <NavContext.Provider value={{ viewport: viewport || Viewport.IS_MOBILE }}>
      {children}
    </NavContext.Provider>
  );
};

export default NavContextProvider;
