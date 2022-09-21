import { Box, Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import useRedirectOnAuthStateChange from "auth/hooks/UseRedirectOnAuthStateChange";
import Nav from "./nav/Nav";
import useNav from "./nav/hook/UseNav";
import SideNav from "./side-nav/SideNav";

const minHeight = "100vh";
const width = "100%";
const d = "flex";
const dir = "column";

const MainLayout = () => {
  useRedirectOnAuthStateChange();
  const { Nav: NavAction } = useNav();

  return (
    <Box display={d} flexDirection={dir} minH={minHeight} w={width}>
      <Flex>
        <SideNav />
        <Nav>{NavAction}</Nav>
      </Flex>
      <Outlet />
    </Box>
  );
};

export default MainLayout;
