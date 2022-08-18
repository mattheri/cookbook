import { Button } from "@chakra-ui/react";
import AuthService from "auth/service/auth-service";
import useInjection from "common/hooks/UseInjection";
import useTranslate from "common/hooks/UseTranslate";

const SignoutButton = () => {
  const auth = useInjection(AuthService);
  const t = useTranslate("auth");

  const signOut = async () => {
    await auth.signout();
  };

  return (
    <Button onClick={signOut} variant="outline">
      {t("signout")}
    </Button>
  );
};

export default SignoutButton;
