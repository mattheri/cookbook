import { createContext, ReactNode } from "react";

interface IHoverableContext {
  nodes: ReactNode;
  addNodes: (nodes: ReactNode) => void;
}

const HoverableContext = createContext<IHoverableContext>({
  nodes: [],
  addNodes: () => {},
});

export default HoverableContext;
