import { PropsWithChildren, FC } from "react";
import NavContextProvider from "./context/NavContextProvider";
import NavBar from "./NavBar";
import NavEnd from "./NavEnd";
import NavMiddle from "./NavMiddle";
import NavStart from "./NavStart";

export type Breakpoints = "sm" | "md" | "lg" | "xl" | "2xl";

export interface Props extends PropsWithChildren {
  desktopBreakpoint?: Breakpoints;
}

const Nav: FC<Props> = ({ desktopBreakpoint, children }) => {
  return (
    <NavContextProvider desktopBreakpoint={desktopBreakpoint}>
      <NavBar>{children}</NavBar>
    </NavContextProvider>
  );
};

export default Object.assign(Nav, {
  Start: NavStart,
  Middle: NavMiddle,
  End: NavEnd,
});
