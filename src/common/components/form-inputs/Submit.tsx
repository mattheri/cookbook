import { Button, ButtonProps } from "@chakra-ui/react";
import { FC } from "react";

interface Props extends ButtonProps {}

const Submit: FC<Props> = ({ children, ...rest }) => {
  return (
    <Button type="submit" {...rest}>
      {children}
    </Button>
  );
};

export default Submit;
