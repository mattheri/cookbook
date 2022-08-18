import { Outlet } from "react-router-dom";
import { Grid } from "@chakra-ui/react";
import useUpdateNav from "common/components/nav/hook/UpdateNav";
import AuthActions from "./AuthActions";

const pItems = "center";

const AuthLayout = () => {
  useUpdateNav(<AuthActions />);

  return (
    <Grid flex={1} placeItems={pItems}>
      <Outlet />
    </Grid>
  );
};

export default AuthLayout;
