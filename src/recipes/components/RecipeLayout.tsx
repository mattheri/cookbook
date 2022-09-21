import useUpdateNav from "common/components/nav/hook/UpdateNav";
import { Outlet } from "react-router-dom";
import RecipeActions from "./RecipeActions";

const RecipeLayout = () => {
  useUpdateNav(<RecipeActions />);

  return <Outlet />;
};

export default RecipeLayout;
