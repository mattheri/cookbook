import {
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from "react";
import HoverableContext from "./context/HoverableContext";

interface Props extends PropsWithChildren {}

const Action: FC<Props> = ({ children }) => {
  const timesCalled = useRef(0);
  const { addNodes } = useContext(HoverableContext);

  const memoChildren = useMemo(() => children, []);

  useEffect(() => {
    if (!timesCalled.current) {
      addNodes(memoChildren);

      timesCalled.current++;
    }
  }, [addNodes, memoChildren]);

  return null;
};

export default Action;
