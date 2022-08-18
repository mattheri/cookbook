import { Box, Flex, SlideFade, StyleProps, Slide } from "@chakra-ui/react";
import useComputePosition from "common/hooks/useComputePosition";
import { FC, PropsWithChildren, useState } from "react";

const actions = ["hello", "there", "I", "am", "legend"];

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

interface Props extends PropsWithChildren {
  actionsContainerStyles?: Omit<
    StyleProps,
    "top" | "bottom" | "left" | "right" | "position" | "transform"
  >;
  position?: Position;
}

const HoverAbleActions: FC<Props> = ({
  actionsContainerStyles,
  position,
  children,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const fadeOutActions = () => isHovered && setIsHovered(false);

  const fadeInActions = () => !isHovered && setIsHovered(true);

  const computedPosition = useComputePosition(position);

  return (
    <Box
      position="relative"
      onMouseEnter={fadeInActions}
      onMouseLeave={fadeOutActions}
      transform="translate(0, 0)"
    >
      <Flex
        position="absolute"
        {...(computedPosition || {})}
        {...actionsContainerStyles}
        bg="teal.500"
      >
        {actions.map((action, index) => (
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
      </Flex>
      {children}
    </Box>
  );
};

export default HoverAbleActions;
