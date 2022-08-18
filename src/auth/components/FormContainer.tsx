import { Container, VStack } from "@chakra-ui/react";
import React, { FC, PropsWithChildren } from "react";

interface Props extends PropsWithChildren {}

const FormContainer: FC<Props> = ({ children }) => {
  return (
    <Container
      borderColor="blackAlpha.100"
      borderWidth={{ base: "0", md: "0.1rem" }}
      borderRadius="0.2rem"
      paddingBlock="1rem"
      boxShadow={{ base: "none", lg: "2xl" }}
      backgroundColor="white"
    >
      <VStack>{children}</VStack>
    </Container>
  );
};

export default FormContainer;
