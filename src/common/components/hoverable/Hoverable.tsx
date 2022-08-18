import { FC } from "react";
import Action from "./Action";
import HoverableContextProvider from "./HoverableContextProvider";
import HoverableParent, { Props } from "./HoverableParent";

const Hoverable: FC<Props> = ({
  position,
  actionsContainerStyles,
  children,
}) => {
  return (
    <HoverableContextProvider>
      <HoverableParent
        position={position}
        actionsContainerStyles={actionsContainerStyles}
      >
        {children}
      </HoverableParent>
    </HoverableContextProvider>
  );
};

export default Object.assign(Hoverable, {
  Action: Action,
});
