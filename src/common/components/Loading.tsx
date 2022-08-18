import { Grid, Portal, Spinner, StyleProps } from "@chakra-ui/react";
import { forwardRef, RefObject } from "react";

const Loading = forwardRef(({ ...style }: StyleProps, ref) => {
  return (
    <Portal containerRef={ref as RefObject<HTMLElement | null> | undefined}>
      <Grid
        placeItems="center"
        height="100%"
        width="100%"
        position="absolute"
        backgroundColor="blackAlpha.400"
        {...style}
      >
        <Spinner />
      </Grid>
    </Portal>
  );
});

export default Loading;
