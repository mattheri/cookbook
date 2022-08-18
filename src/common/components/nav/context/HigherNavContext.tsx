import { createContext } from "react";

interface IHigherNavContext {
  Nav: JSX.Element | null;
  setNavAction: (children: JSX.Element) => void;
}

const HigherNavContext = createContext<IHigherNavContext>({
  Nav: null,
  setNavAction: () => {},
});

export default HigherNavContext;
