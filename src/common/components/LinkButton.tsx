import { LinkProps, Link } from "react-router-dom";
import { Button, ButtonProps } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";

type Props = LinkProps & ButtonProps;

const LinkButton: FC<PropsWithChildren<Props>> = ({ children, ...rest }) => {
  return (
    <Button as={Link} {...rest}>
      {children}
    </Button>
  );
};

export default LinkButton;
