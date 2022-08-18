import { useContext } from "react";
import NavContext from "../context/NavContext";

const useViewport = () => {
  const { viewport } = useContext(NavContext);

  return viewport;
};

export default useViewport;
