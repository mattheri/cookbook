import { PropsWithChildren, FC } from "react";
import ControlFlowContext from "./ControlFlowContext";

interface Props extends PropsWithChildren {
  condition: boolean;
}

const If: FC<Props> = ({ condition, children }) => {
  return (
    <ControlFlowContext.Provider value={{ condition }}>
      {children}
    </ControlFlowContext.Provider>
  );
};

export default If;
