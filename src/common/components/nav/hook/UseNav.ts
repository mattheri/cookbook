import { useContext } from "react";
import HigherNavContext from "../context/HigherNavContext";

const useNav = () => useContext(HigherNavContext);

export default useNav;
