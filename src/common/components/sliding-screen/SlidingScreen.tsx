import { FC, PropsWithChildren, useContext, useEffect, useState } from "react";
import ModalContext from "../modals/context/ModalContext";
import Screen from "./Screen";

interface Props {
  id: string;
}

const SlidingScreen: FC<PropsWithChildren<Props>> = ({ id, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isCurrentlyOpen, provideContext, close } = useContext(ModalContext);

  useEffect(() => {
    if (isCurrentlyOpen === id && !isOpen) setIsOpen(true);

    return () => {
      provideContext({});
    };
  }, [isCurrentlyOpen, id, isOpen, provideContext]);

  const closeHandler = () => {
    setIsOpen(false);
    close(id);
  };

  return (
    <Screen isOpen={isOpen} onClose={closeHandler}>
      {children}
    </Screen>
  );
};

export default SlidingScreen;
