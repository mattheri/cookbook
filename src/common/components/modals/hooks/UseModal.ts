import { useContext } from "react";
import ModalContext from "../context/ModalContext";

const useModal = <T extends Record<string, any>>(id: string) => {
  const { open, close, currentContext, provideContext } =
    useContext(ModalContext);

  return {
    open: open.bind(open, id),
    close: close.bind(close, id),
    currentContext: currentContext as T,
    provideContext: provideContext,
  };
};

export default useModal;
