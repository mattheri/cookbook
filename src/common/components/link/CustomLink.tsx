import {
  LinkProps as RRLinkProps,
  useHref,
  useLinkClickHandler,
} from "react-router-dom";
import { Link as CUiLink, LinkProps as CUiLinkProps } from "@chakra-ui/react";
import { FC, MouseEventHandler } from "react";

type Props = RRLinkProps & CUiLinkProps;

const CustomLink: FC<Props> = ({
  children,
  to,
  replace,
  state,
  target,
  onClick,
  ...props
}) => {
  const href = useHref(to);
  const handleRouteChange = useLinkClickHandler(to, {
    replace,
    state,
    target,
  });

  const onClickHandler: MouseEventHandler<HTMLAnchorElement> = async (
    event
  ) => {
    if (onClick) await onClick(event);

    if (!event.defaultPrevented) {
      handleRouteChange(event);
    }
  };

  return (
    <CUiLink href={href} {...props} onClick={onClickHandler}>
      {children}
    </CUiLink>
  );
};

export default CustomLink;
