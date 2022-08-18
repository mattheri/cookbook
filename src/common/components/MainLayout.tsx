import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import useRedirectOnAuthStateChange from "auth/hooks/UseRedirectOnAuthStateChange";
import Nav from "./nav/Nav";
import useNav from "./nav/hook/UseNav";
import AddProduct from "product/components/AddProduct";

const minHeight = "100vh";
const width = "100%";
const d = "flex";
const dir = "column";

const MainLayout = () => {
  useRedirectOnAuthStateChange();
  const { Nav: NavAction } = useNav();

  return (
    <Box display={d} flexDirection={dir} minH={minHeight} w={width}>
      <Nav>{NavAction}</Nav>
      <Outlet />
    </Box>
  );
};

export default MainLayout;
