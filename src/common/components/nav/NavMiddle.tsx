import { Box, DrawerBody } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";
import { Viewport } from "./context/NavContext";
import useViewport from "./hook/UseViewport";

interface Props extends PropsWithChildren {}

const NavMiddle: FC<Props> = ({ children }) => {
  const viewport = useViewport();

  return viewport === Viewport.IS_DESKTOP ? (
    <Box gridColumn={2} display="flex" justifyContent="center">
      {children}
    </Box>
  ) : (
    <DrawerBody>{children}</DrawerBody>
  );
};

export default NavMiddle;
