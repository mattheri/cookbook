import { Box, DrawerHeader } from "@chakra-ui/react";
import { PropsWithChildren, FC } from "react";
import { Viewport } from "./context/NavContext";
import useViewport from "./hook/UseViewport";

interface Props extends PropsWithChildren {}

const column = "1";

const NavStart: FC<Props> = ({ children }) => {
  const viewport = useViewport();

  return viewport === Viewport.IS_DESKTOP ? (
    <Box gridColumn={column}>{children}</Box>
  ) : (
    <DrawerHeader>{children}</DrawerHeader>
  );
};

export default NavStart;
