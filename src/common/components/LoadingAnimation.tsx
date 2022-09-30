import { Spinner, SpinnerProps } from "@chakra-ui/react";
import { PropsWithChildren, FC } from "react";

interface Props extends SpinnerProps {
  isLoading: boolean;
}

const LoadingAnimation: FC<Props> = ({ isLoading, children, ...rest }) => {
  return isLoading ? <Spinner {...rest} /> : <>{children}</>;
};

export default LoadingAnimation;
