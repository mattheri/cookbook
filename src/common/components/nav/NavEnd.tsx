import { Box, DrawerFooter } from "@chakra-ui/react";
import { FC } from "react";
import useViewport from "./hook/UseViewport";
import { Props } from "./Nav";
import { Viewport } from "common/components/nav/context/NavContext";

const margin = "auto";
const column = "3";

const NavEnd: FC<Props> = ({ children }) => {
  const viewport = useViewport();

  if (viewport === Viewport.IS_DESKTOP) {
    return (
      <Box gridColumn={column} marginInlineStart={margin}>
        {children}
      </Box>
    );
  }

  return <DrawerFooter marginTop={margin}>{children}</DrawerFooter>;
};

export default NavEnd;
