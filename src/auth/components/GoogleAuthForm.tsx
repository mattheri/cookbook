import { IconButton, useBreakpointValue, VStack } from "@chakra-ui/react";
import AuthService from "auth/service/auth-service";
import useInjection from "common/hooks/UseInjection";
import useTranslate from "common/hooks/UseTranslate";
import { useState } from "react";
import { FaGoogle } from "react-icons/fa";

const GoogleAuthForm = () => {
  const [isFetching, setIsFetching] = useState(false);
  const t = useTranslate("auth");
  const auth = useInjection(AuthService);
  const authenticate = useBreakpointValue({
    base: auth.GOOGLE.signIn.withRedirect,
    lg: auth.GOOGLE.signIn.withPopup,
  });

  const onClick = async () => {
    try {
      setIsFetching(true);
      if (authenticate) await authenticate();
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <VStack w="100%">
      <IconButton
        isLoading={isFetching}
        w="100%"
        colorScheme="red"
        onClick={onClick}
        icon={<FaGoogle />}
        aria-label={t("labels.google")}
      />
    </VStack>
  );
};

export default GoogleAuthForm;
