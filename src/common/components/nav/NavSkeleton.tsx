import { Box } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";

const bBottom = "solid 0.1rem gray.100";
const width = "100%";
const pBlock = "2rem";
const pInline = "1rem";
const d = "flex";
const jContent = "flex-end";

interface Props extends PropsWithChildren {}

const NavSkeleton: FC<Props> = ({ children }) => {
  return (
    <Box
      borderBottom={bBottom}
      width={width}
      paddingBlock={pBlock}
      paddingInline={pInline}
      display={d}
      justifyContent={jContent}
    >
      {children}
    </Box>
  );
};

export default NavSkeleton;
