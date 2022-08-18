import useTranslate from "common/hooks/UseTranslate";
import { VStack } from "@chakra-ui/react";
import Form from "common/components/form-inputs/Form";
import * as Yup from "yup";
import useInjection from "common/hooks/UseInjection";
import AuthService from "auth/service/auth-service";
import { useState } from "react";

const initialValues = {
  email: "",
  password: "",
};

const LoginForm = () => {
  const [isFetching, setIsFetching] = useState(false);
  const t = useTranslate("auth");
  const auth = useInjection(AuthService);

  const signIn = async (values: typeof initialValues) => {
    try {
      setIsFetching(true);
      await auth.LOCAL.signIn(values);
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <Form
      initialValues={initialValues}
      onSubmit={signIn}
      validateOnChange
      validation={{
        email: Yup.string()
          .email(t("errors.email"))
          .required(t("errors.required")),
        password: Yup.string()
          .matches(
            /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\W]{8,}$/,
            t("errors.password")
          )
          .required(t("errors.required")),
      }}
    >
      <VStack>
        <Form.Input
          id="email"
          label={t("labels.username")}
          type="email"
          autoComplete="username"
          isRequired
        />
        <Form.Input
          id="password"
          label={t("labels.password")}
          type="password"
          autoComplete="current-password"
          isRequired
        />
        <Form.Submit isLoading={isFetching} w="100%" colorScheme="green">
          {t("signin")}
        </Form.Submit>
      </VStack>
    </Form>
  );
};

export default LoginForm;
