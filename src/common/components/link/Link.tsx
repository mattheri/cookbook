import { LinkProps as RRLinkProps } from "react-router-dom";
import { LinkProps as CUiLinkProps } from "@chakra-ui/react";
import { FC } from "react";
import CustomLink from "./CustomLink";
import NativeLink from "./NativeLink";

type Props = RRLinkProps & CUiLinkProps;

const Link: FC<Props> = ({ ...props }) => {
  return props.onClick ? <CustomLink {...props} /> : <NativeLink {...props} />;
};

export default Link;
