import { createContext } from "react";

export enum Viewport {
  IS_MOBILE = "IS_MOBILE",
  IS_DESKTOP = "IS_DESKTOP",
}

const NavContext = createContext({ viewport: Viewport.IS_MOBILE });

export default NavContext;
