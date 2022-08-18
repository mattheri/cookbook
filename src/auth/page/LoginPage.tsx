import LoginForm from "auth/components/LoginForm";
import GoogleAuthForm from "auth/components/GoogleAuthForm";
import DividerWithText from "common/components/DividerWithText";
import useTranslate from "common/hooks/UseTranslate";
import FormContainer from "auth/components/FormContainer";

const LoginPage = () => {
  const t = useTranslate("auth");

  return (
    <FormContainer>
      <LoginForm />
      <DividerWithText text={t("labels.or")} />
      <GoogleAuthForm />
    </FormContainer>
  );
};

export default LoginPage;
