import { Grid } from "@chakra-ui/react";
import useUpdateNav from "common/components/nav/hook/UpdateNav";
import { Outlet } from "react-router-dom";
import StorageActions from "./StorageActions";

const StorageLayout = () => {
  useUpdateNav(<StorageActions />);

  return (
    <Grid flex={1}>
      <Outlet />
    </Grid>
  );
};

export default StorageLayout;
