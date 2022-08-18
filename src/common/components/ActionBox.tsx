import { Box } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";
import Hoverable from "./hoverable";

interface Props extends PropsWithChildren {}

const ActionBox: FC<Props> = ({ children }) => {
  return (
    <Hoverable>
      <Box>{children}</Box>
    </Hoverable>
  );
};

export default Object.assign(ActionBox, {
  Action: Hoverable.Action,
});
