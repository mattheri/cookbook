import { IconButton } from "@chakra-ui/react";
import { FC } from "react";
import { Link, LinkProps } from "react-router-dom";
import Hoverable from "./hoverable";
import { MdInput } from "react-icons/md";

interface Props extends Pick<LinkProps, "to"> {
  label: string;
}

const GoToAction: FC<Props> = ({ label, ...linkProps }) => {
  return (
    <Hoverable.Action>
      <IconButton
        as={Link}
        icon={<MdInput />}
        aria-label={label}
        {...linkProps}
        variant="ghost"
      />
    </Hoverable.Action>
  );
};

export default GoToAction;
