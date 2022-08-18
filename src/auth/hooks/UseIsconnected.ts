import AuthService from "auth/service/auth-service";
import useInjection from "common/hooks/UseInjection";

const useIsConnected = () => {
  const auth = useInjection(AuthService);

  return {
    isConnected: auth.isConnected,
    user: auth.currentUser,
  };
};

export default useIsConnected;
