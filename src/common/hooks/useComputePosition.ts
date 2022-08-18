import { StyleProps } from "@chakra-ui/react";
import { PositionObject } from "common/components/HoverAbleActions";

enum YPosition {
  Top = "top",
  Center = "center",
  Bottom = "bottom",
}

enum XPosition {
  Left = "left",
  Right = "right",
  Center = "center",
}

const useComputePosition = <T extends string | PositionObject>(
  position?: T
): PositionObject | undefined => {
  const testForStaticPosition = () => {
    if (typeof position !== "string") return null;

    const [pos1, pos2] = position.split(" ");

    const hasValidPositionOne = Object.values(YPosition).some(
      (value) => pos1 === value
    );
    const hasValidPositionTwo = Object.values(XPosition).some(
      (value) => pos2 === value
    );

    if (!hasValidPositionOne || !hasValidPositionTwo) return null;

    return {
      y: pos1,
      x: pos2,
    };
  };

  const pos = testForStaticPosition();

  if (!pos) return position as PositionObject;

  const { y, x } = pos;

  const computedPosition: PositionObject = {};

  if (y === YPosition.Bottom) {
    computedPosition.bottom = "0";
  } else if (y === YPosition.Center) {
    computedPosition.top = "50%";
    computedPosition.transform = "translateY(-50%)";
  } else {
    computedPosition.top = "0";
  }

  if (x === XPosition.Center) {
    computedPosition.left = "50%";
    computedPosition.transform = "translateX(-50%)";
  } else if (x === XPosition.Left) {
    computedPosition.left = "0";
  } else {
    computedPosition.right = "0";
  }

  if (x === XPosition.Center && y === YPosition.Center) {
    computedPosition.transform = "translate(-50%, -50%)";
  }

  return computedPosition;
};

export default useComputePosition;
