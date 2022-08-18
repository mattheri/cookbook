import { FC, useEffect } from "react";
import useNav from "./UseNav";

const useUpdateNav = (element: JSX.Element) => {
  const { setNavAction } = useNav();

  useEffect(() => {
    setNavAction(element);
  }, [setNavAction]);
};

export default useUpdateNav;
