import {
  useState,
  FC,
  PropsWithChildren,
  useEffect,
  useLayoutEffect,
  useRef,
} from "react";
import {
  Box,
  IconButton,
  Portal,
  Flex,
  BoxProps,
  FlexProps,
} from "@chakra-ui/react";
import { TiArrowSortedUp } from "react-icons/ti";
import { motion } from "framer-motion";

interface Props extends PropsWithChildren {
  isOpen: boolean;
  onClose: () => void;
}

const Footer: FC<FlexProps> = ({ children, ...props }) => {
  return (
    <Flex as="footer" {...props}>
      {children}
    </Flex>
  );
};

const Body: FC<BoxProps> = ({ children, ...props }) => {
  return (
    <Box as="main" {...props}>
      {children}
    </Box>
  );
};

const TRANSFORM_VALUES = {
  OPEN: "translate3d(0, 0, 0)",
  CLOSED: "translate3d(0, calc(100% + 3rem), 0)",
  FOLDED: "translate3d(0, calc(100% - 1rem), 0)",
};

const FoldableDrawer: FC<Props> = ({ isOpen, children }) => {
  const [isFolded, setIsFolded] = useState(false);
  const [transformValue, setTransformValue] = useState(TRANSFORM_VALUES.CLOSED);

  const toggleFold = () => setIsFolded(!isFolded);

  useLayoutEffect(() => {
    if (isOpen && !isFolded) {
      setTransformValue(TRANSFORM_VALUES.OPEN);
    } else if (isOpen && isFolded) {
      setTransformValue(TRANSFORM_VALUES.FOLDED);
    }
  }, [isOpen, isFolded]);

  return isOpen ? (
    <Portal>
      <Box
        position="fixed"
        bottom="0"
        style={{
          transform: transformValue,
        }}
        zIndex="9999"
        backgroundColor="white"
        width="100%"
        transition="transform 0.3s ease-in-out"
        paddingInline="1rem"
        paddingBlockEnd="1rem"
      >
        <Box
          as="header"
          position="relative"
          borderTopColor="blackAlpha.100"
          borderTopWidth="thin"
          height="1rem"
        >
          <IconButton
            aria-label="fold-menu"
            icon={
              <TiArrowSortedUp
                style={{
                  transform: isFolded ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform ease-in-out 300ms",
                }}
              />
            }
            variant="ghost"
            position="absolute"
            top="-2.3rem"
            width="2.5rem"
            height="2.5rem"
            right="1rem"
            borderTopWidth="1px"
            borderTopColor="blackAlpha.100"
            borderRightColor="blackAlpha.100"
            borderRightWidth="1px"
            borderLeftColor="blackAlpha.100"
            borderLeftWidth="1px"
            zIndex="1"
            backgroundColor="white"
            onClick={toggleFold}
          />
        </Box>
        {children}
      </Box>
    </Portal>
  ) : null;
};

export default Object.assign(FoldableDrawer, {
  Footer: Footer,
  Body: Body,
});
