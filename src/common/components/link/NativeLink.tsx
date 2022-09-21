import { Link as RRLink, LinkProps as RRLinkProps } from "react-router-dom";
import { Link as CUiLink, LinkProps as CUiLinkProps } from "@chakra-ui/react";
import { FC } from "react";

type Props = RRLinkProps & CUiLinkProps;

const NativeLink: FC<Props> = ({
  children,
  to,
  replace,
  state,
  target,
  ...props
}) => {
  return (
    <CUiLink as={RRLink} {...props}>
      {children}
    </CUiLink>
  );
};

export default NativeLink;
