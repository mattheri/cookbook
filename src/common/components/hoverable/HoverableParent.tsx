import { FC, PropsWithChildren, useContext, useState, Children } from "react";
import HoverableContext from "./context/HoverableContext";

import { Box, ButtonGroup, SlideFade, StyleProps } from "@chakra-ui/react";
import useComputePosition from "common/hooks/useComputePosition";

export type PositionObject = {
  top?: StyleProps["top"];
  bottom?: StyleProps["bottom"];
  left?: StyleProps["left"];
  right?: StyleProps["right"];
  transform?: StyleProps["transform"];
};

type StaticPosition =
  | "top left"
  | "top right"
  | "top center"
  | "bottom left"
  | "bottom right"
  | "bottom center"
  | "center left"
  | "center right"
  | "center center";

type Position = StaticPosition | PositionObject;

export interface Props extends PropsWithChildren {
  actionsContainerStyles?: Omit<
    StyleProps,
    "top" | "bottom" | "left" | "right" | "position" | "transform"
  >;
  position?: Position;
}

const HoverableParent: FC<Props> = ({
  actionsContainerStyles,
  position,
  children,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const fadeOutActions = () => isHovered && setIsHovered(false);

  const fadeInActions = () => !isHovered && setIsHovered(true);

  const computedPosition = useComputePosition(position);

  const { nodes } = useContext(HoverableContext);

  return (
    <Box
      position="relative"
      onMouseEnter={fadeInActions}
      onMouseLeave={fadeOutActions}
      transform="translate(0, 0)"
    >
      <ButtonGroup
        isAttached
        position="absolute"
        {...(computedPosition || {})}
        {...actionsContainerStyles}
      >
        {Children.map(nodes, (action, index) => (
          <SlideFade
            in={isHovered}
            offsetY="0.1rem"
            transition={{
              enter: { delay: index / 10 },
              exit: { delay: index / 10 },
            }}
          >
            {action}
          </SlideFade>
        ))}
      </ButtonGroup>
      {children}
    </Box>
  );
};

export default HoverableParent;
