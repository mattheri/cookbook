import { FC, PropsWithChildren, useCallback, useState } from "react";
import ModalContext from "./ModalContext";

interface Props extends PropsWithChildren {}

const ModalContextProvider: FC<Props> = ({ children }) => {
  const [currentlyOpenModal, setCurrentlyOpenModal] = useState<string | null>(
    null
  );

  const [currentContext, setCurrentContext] = useState({});

  const open = (id: string) => {
    currentlyOpenModal !== id && setCurrentlyOpenModal(id);
  };

  const close = (id: string) => {
    currentlyOpenModal === id && setCurrentlyOpenModal(null);
  };

  const provideContext = useCallback(
    (context: Record<string, any>) => setCurrentContext(context),
    []
  );

  return (
    <ModalContext.Provider
      value={{
        open,
        close,
        isCurrentlyOpen: currentlyOpenModal,
        currentContext: currentContext,
        provideContext,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export default ModalContextProvider;
