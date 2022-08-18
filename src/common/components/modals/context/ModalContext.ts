import { createContext } from "react";

interface IModalContext {
  open: (id: string) => void;
  close: (id: string) => void;
  isCurrentlyOpen: string | null;
  currentContext: Record<string, any>;
  provideContext: (context: Record<string, any>) => void;
}

const noop = () => {};

const ModalContext = createContext<IModalContext>({
  open: noop,
  close: noop,
  isCurrentlyOpen: null,
  currentContext: {},
  provideContext: noop,
});

export default ModalContext;
