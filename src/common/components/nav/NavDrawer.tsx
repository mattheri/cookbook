import {
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import useTranslate from "common/hooks/UseTranslate";
import { PropsWithChildren, FC, useRef } from "react";
import { MdMenu } from "react-icons/md";
import NavSkeleton from "./NavSkeleton";

interface Props extends PropsWithChildren {}

const NavDrawer: FC<Props> = ({ children }) => {
  const t = useTranslate();

  const ref = useRef<HTMLButtonElement>(null);
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
      <NavSkeleton>
        <IconButton
          icon={<MdMenu />}
          aria-label={t("aria.menuOpen")}
          onClick={onOpen}
          ref={ref}
        />
      </NavSkeleton>
      <Drawer isOpen={isOpen} onClose={onClose} finalFocusRef={ref}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          {children}
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default NavDrawer;
