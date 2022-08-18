import { Container } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";

interface Props extends PropsWithChildren {}

const PageContainer: FC<Props> = ({ children }) => {
  return <Container maxW="140rem">{children}</Container>;
};

export default PageContainer;
