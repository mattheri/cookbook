import AuthService from "auth/service/auth-service";
import useInjection from "common/hooks/UseInjection";

const useCurrentUser = () => {
  const auth = useInjection(AuthService);

  return auth.currentUser;
};

export default useCurrentUser;
