import {
  Modal as MODAL,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { PropsWithChildren, FC, useState, useContext, useEffect } from "react";
import ModalContext from "./context/ModalContext";

export interface ModalProps {
  id: string;
}

const Header: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ModalHeader>
      <ModalCloseButton />
      {children}
    </ModalHeader>
  );
};

interface Props extends PropsWithChildren<ModalProps> {}

const Modal: FC<Props> = ({ id, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isCurrentlyOpen, close, provideContext } = useContext(ModalContext);

  useEffect(() => {
    if (isCurrentlyOpen === id && !isOpen) setIsOpen(true);
    else isOpen && setIsOpen(false);
  }, [isCurrentlyOpen]);

  const onClose = () => close(id);

  useEffect(() => {
    return () => {
      provideContext({});
    };
  }, []);

  return (
    <MODAL isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>{children}</ModalContent>
    </MODAL>
  );
};

export default Object.assign(Modal, {
  Footer: ModalFooter,
  Header: Header,
  Body: ModalBody,
});
