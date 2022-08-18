import React, {
  FC,
  PropsWithChildren,
  useCallback,
  useMemo,
  useState,
} from "react";
import HigherNavContext from "./HigherNavContext";

interface Props extends PropsWithChildren {}

const HigerNavContextProvider: FC<Props> = ({ children }) => {
  const [Nav, setNav] = useState<JSX.Element | null>(null);

  const setNavAction = useCallback((element: JSX.Element) => {
    return setNav(element);
  }, []);

  const NavMemo = useMemo(() => Nav, [Nav]);

  return (
    <HigherNavContext.Provider
      value={{ Nav: NavMemo, setNavAction: setNavAction }}
    >
      {children}
    </HigherNavContext.Provider>
  );
};

export default HigerNavContextProvider;
