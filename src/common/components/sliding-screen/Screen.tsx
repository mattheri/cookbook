import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  StyleProps,
} from "@chakra-ui/react";
import { FC, HTMLAttributes } from "react";

type Element = HTMLAttributes<HTMLDivElement> & StyleProps;

interface Props extends Element {
  isOpen: boolean;
  timeout?: number;
  slideInFrom?: "right" | "left" | "top" | "bottom";
  onClose: () => void;
}

const DEFAULT_TIMEOUT = 400;

const Screen: FC<Props> = ({
  isOpen,
  timeout = DEFAULT_TIMEOUT,
  slideInFrom = "right",
  onClose,
  children,
  ...props
}) => {
  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      size="full"
      placement={slideInFrom}
      {...props}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader>
          <Button onClick={onClose}>X</Button>
        </DrawerHeader>
        <DrawerBody>{children}</DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default Screen;
