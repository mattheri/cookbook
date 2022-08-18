import LinkButton from "common/components/LinkButton";
import useTranslate from "common/hooks/UseTranslate";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import routes from "routes/routes";

enum Key {
  SIGN_UP = "signup",
  SIGN_IN = "signin",
}

const SignUpSignInButton = () => {
  const [key, setKey] = useState(Key.SIGN_UP);
  const t = useTranslate("auth");
  const { pathname } = useLocation();

  const href = key === Key.SIGN_IN ? `/${routes.login}` : `/${routes.signup}`;

  useEffect(() => {
    if (pathname === `/${routes.signup}`) setKey(Key.SIGN_IN);
    else if (pathname === `/${routes.login}`) setKey(Key.SIGN_UP);
  }, [pathname]);

  return <LinkButton to={href}>{t(key)}</LinkButton>;
};

export default SignUpSignInButton;
