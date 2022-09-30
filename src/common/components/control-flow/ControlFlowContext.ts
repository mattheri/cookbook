import { createContext } from "react";

interface IControlFlowContext {
  condition: boolean;
}

const ControlFlowContext = createContext<IControlFlowContext>({
  condition: false,
});

export default ControlFlowContext;
