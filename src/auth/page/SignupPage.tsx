import GoogleAuthForm from "auth/components/GoogleAuthForm";
import DividerWithText from "common/components/DividerWithText";
import useTranslate from "common/hooks/UseTranslate";
import SignUpForm from "auth/components/SignUpForm";
import FormContainer from "auth/components/FormContainer";

const SignupPage = () => {
  const t = useTranslate("auth");

  return (
    <FormContainer>
      <SignUpForm />
      <DividerWithText text={t("labels.or")} />
      <GoogleAuthForm />
    </FormContainer>
  );
};

export default SignupPage;
