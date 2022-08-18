import { FC, PropsWithChildren } from "react";
import useViewport from "./hook/UseViewport";
import { Viewport } from "./context/NavContext";
import NavDrawer from "./NavDrawer";
import NavSkeleton from "./NavSkeleton";
import { Grid } from "@chakra-ui/react";

interface Props extends PropsWithChildren {}

const NavBar: FC<Props> = ({ children }) => {
  const viewport = useViewport();

  return viewport === Viewport.IS_DESKTOP ? (
    <NavSkeleton>
      <Grid gridTemplateColumns="0.33fr 1fr 0.33fr" width="100%">
        {children}
      </Grid>
    </NavSkeleton>
  ) : (
    <NavDrawer>{children}</NavDrawer>
  );
};

export default NavBar;
