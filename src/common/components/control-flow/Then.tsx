import { useContext, FC, PropsWithChildren } from "react";
import ControlFlowContext from "./ControlFlowContext";

interface Props extends PropsWithChildren {}

const Then: FC<Props> = ({ children }) => {
  const { condition } = useContext(ControlFlowContext);

  return condition ? <>{children}</> : null;
};

export default Then;
