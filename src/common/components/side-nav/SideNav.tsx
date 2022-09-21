import {
  Box,
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Heading,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef } from "react";
import routes from "routes/routes";
import Link from "../link/Link";

const SideNav = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef(null);

  return (
    <>
      <Button ref={btnRef} onClick={onOpen}>
        Open
      </Button>
      <Drawer placement="left" isOpen={isOpen} onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>
          <DrawerBody>
            <Divider />
            <Box paddingBlock="1rem">
              <Heading as="h2" size="md">
                Storage
              </Heading>
              <Link onClick={onClose} to={routes.storage.main}>
                Storages
              </Link>
            </Box>
            <Divider />
            <Box paddingBlock="1rem">
              <Heading as="h2" size="md">
                Recipes
              </Heading>
              <Link onClick={onClose} to={routes.recipes.main}>
                Recipes
              </Link>
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideNav;
