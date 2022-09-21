import { AppEvents } from "app/service/app-service";
import AuthService from "auth/service/auth-service";
import useInjection from "common/hooks/UseInjection";
import { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import RootService from "root/service/root-service";
import routes from "routes/routes";

const useRedirectOnAuthStateChange = () => {
  const auth = useInjection(AuthService);
  const root = useInjection(RootService);
  const navigate = useNavigate();

  const createRoot = useCallback(
    async (userId: string) => await root.createRoot(userId),
    [root]
  );
  const queryRoot = useCallback(
    async (userId: string) => await root.queryRoot(userId),
    [root]
  );

  useEffect(() => {
    auth.pubsub.subscribe(AppEvents.NEW_SIGN_IN, createRoot);
    auth.pubsub.subscribe(AppEvents.SIGN_IN, queryRoot);

    auth.onAuthStateChange((user) => {
      if (user) {
        auth.pubsub.publish(AppEvents.SIGN_IN, user.uid);
        navigate(routes.storage.main);
      } else navigate(routes.login);
    });
  }, [auth, createRoot, queryRoot, navigate]);
};

export default useRedirectOnAuthStateChange;
