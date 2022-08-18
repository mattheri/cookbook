import { FC, PropsWithChildren, ReactNode, useCallback, useState } from "react";
import HoverableContext from "./context/HoverableContext";

interface Props extends PropsWithChildren {}

const HoverableContextProvider: FC<Props> = ({ children }) => {
  const [nodes, setNodes] = useState<ReactNode[]>([]);

  const addNodes = useCallback((nodes: ReactNode) => {
    setNodes((existingNodes) => [...existingNodes, nodes]);
  }, []);

  return (
    <HoverableContext.Provider value={{ nodes, addNodes }}>
      {children}
    </HoverableContext.Provider>
  );
};

export default HoverableContextProvider;
